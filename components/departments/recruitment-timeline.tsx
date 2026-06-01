"use client";

import { useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import styles from "./recruitment-timeline.module.css";

type RecruitmentEvent = {
  startDate: string;
  endDate: string;
  label: string;
};

type RecruitmentTrack = {
  id: string;
  title: string;
  events: RecruitmentEvent[];
};

type RecruitmentTimelineProps = {
  tracks: RecruitmentTrack[];
};

function toDayValue(dateText: string) {
  const [monthText, dayText] = dateText.split("/");
  const month = Number(monthText);
  const day = Number(dayText);

  return month * 31 + day;
}

export default function RecruitmentTimeline({ tracks }: RecruitmentTimelineProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const allDates = tracks.flatMap((track) => track.events.flatMap((event) => [event.startDate, event.endDate]));
  const uniqueDates = [...new Set(allDates)].sort((a, b) => toDayValue(a) - toDayValue(b));
  const minDateValue = Math.min(...uniqueDates.map(toDayValue));
  const maxDateValue = Math.max(...uniqueDates.map(toDayValue));
  const dateSpan = Math.max(maxDateValue - minDateValue, 1);
  const railWidthRem = Math.max(dateSpan * 8, 52);
  const [isDragging, setIsDragging] = useState(false);
  const todayOffsetRem = useMemo(() => {
    const today = new Date();
    const todayValue = (today.getMonth() + 1) * 31 + today.getDate();
    if (todayValue < minDateValue || todayValue > maxDateValue) {
      return null;
    }

    return (((todayValue - minDateValue) / dateSpan) * railWidthRem);
  }, [dateSpan, maxDateValue, minDateValue, railWidthRem]);

  const getPosition = (dateText: string) => ((toDayValue(dateText) - minDateValue) / dateSpan) * 100;
  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || event.button !== 0) {
      return;
    }

    const scrollElement = scrollRef.current;
    if (!scrollElement) {
      return;
    }

    dragStartXRef.current = event.clientX;
    dragStartScrollLeftRef.current = scrollElement.scrollLeft;
    scrollElement.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };
  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging || event.pointerType === "touch") {
      return;
    }

    const scrollElement = scrollRef.current;
    if (!scrollElement) {
      return;
    }

    const offsetX = event.clientX - dragStartXRef.current;
    scrollElement.scrollLeft = dragStartScrollLeftRef.current - offsetX;
  };
  const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }

    const scrollElement = scrollRef.current;
    if (scrollElement?.hasPointerCapture(event.pointerId)) {
      scrollElement.releasePointerCapture(event.pointerId);
    }

    setIsDragging(false);
  };

  return (
    <div className={styles.timelineBoard}>
      <div className={styles.leftMask} aria-hidden />

      <div
        ref={scrollRef}
        className={`${styles.timelineScroll} ${isDragging ? styles.timelineScrollDragging : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}>
        <div className={styles.timelineCanvas} style={{ "--timeline-rail-width": `${railWidthRem}rem` } as CSSProperties}>
          {todayOffsetRem !== null ? (
            <div
              className={styles.todayGuide}
              style={{ left: `calc(var(--timeline-name-width) + var(--timeline-row-gap) + ${todayOffsetRem}rem)` }}>
              <span className={styles.todayGuideLabel}>今天</span>
            </div>
          ) : null}

          <div className={styles.axisRow}>
            <div className={styles.axisCorner} aria-hidden />

            <div className={styles.axisBand}>
              <div className={styles.axisRail}>
                <span className={styles.axisLine} />

                {uniqueDates.map((dateText) => (
                  <span key={dateText} className={styles.axisMark} style={{ left: `${getPosition(dateText)}%` }}>
                    <span className={styles.axisTick} aria-hidden />
                    <span className={styles.axisLabel}>{dateText}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.timelineTable}>
            {tracks.map((track) => (
              <article key={track.id} className={styles.timelineRow}>
                <h3 className={styles.trackTitle}>{track.title}</h3>

                <div className={styles.eventRail}>
                  <span className={styles.rowLine} aria-hidden />

                  {track.events.map((event) => {
                    const left = getPosition(event.startDate);
                    const right = getPosition(event.endDate);
                    const width = Math.max(right - left, (1 / dateSpan) * 100);

                    return (
                      <div key={`${event.startDate}-${event.endDate}-${event.label}`} className={styles.eventBlock} style={{ left: `${left+0.1}%`, width: `${width-0.2}%` }}>
                        <span className={styles.eventLabel}>{event.label}</span>
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
