"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
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

const TIMELINE_MARKER_GAP_REM = 8;
const EVENT_LABEL_EDGE_GUTTER_PX = 18;
const MIN_RAIL_WIDTH_REM = 52;

function toDayValue(dateText: string) {
  const [monthText, dayText] = dateText.split("/");
  const month = Number(monthText);
  const day = Number(dayText);

  return month * 31 + day;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getTimelineOffset(dateText: string, dates: string[]) {
  const dateValue = toDayValue(dateText);
  const firstDateValue = toDayValue(dates[0]);
  const lastDateValue = toDayValue(dates[dates.length - 1]);

  if (dateValue < firstDateValue || dateValue > lastDateValue) {
    return null;
  }

  const exactDateIndex = dates.findIndex((item) => item === dateText);
  if (exactDateIndex >= 0) {
    return exactDateIndex * TIMELINE_MARKER_GAP_REM;
  }

  const nextDateIndex = dates.findIndex((item) => toDayValue(item) > dateValue);
  if (nextDateIndex <= 0) {
    return null;
  }

  const previousDate = dates[nextDateIndex - 1];
  const nextDate = dates[nextDateIndex];
  const previousDateValue = toDayValue(previousDate);
  const nextDateValue = toDayValue(nextDate);
  const segmentProgress = (dateValue - previousDateValue) / (nextDateValue - previousDateValue);

  return (nextDateIndex - 1 + segmentProgress) * TIMELINE_MARKER_GAP_REM;
}

function getCurrentDateText() {
  const today = new Date();

  return `${today.getMonth() + 1}/${today.getDate()}`;
}

function getVisibleLabelOffset({
  eventRect,
  labelWidth,
  viewportRect,
}: {
  eventRect: DOMRect;
  labelWidth: number;
  viewportRect: DOMRect;
}) {
  const eventCenter = eventRect.left + eventRect.width / 2;
  const labelHalfWidth = labelWidth / 2;
  const naturalLabelLeft = eventCenter - labelHalfWidth;
  const naturalLabelRight = eventCenter + labelHalfWidth;
  const eventMinCenter = eventRect.left + EVENT_LABEL_EDGE_GUTTER_PX + labelHalfWidth;
  const eventMaxCenter = eventRect.right - EVENT_LABEL_EDGE_GUTTER_PX - labelHalfWidth;
  let targetCenter = eventCenter;

  if (naturalLabelLeft < viewportRect.left) {
    targetCenter = viewportRect.left + labelHalfWidth;
  } else if (naturalLabelRight > viewportRect.right) {
    targetCenter = viewportRect.right - labelHalfWidth;
  }

  return clamp(targetCenter, eventMinCenter, eventMaxCenter) - eventCenter;
}

export default function RecruitmentTimeline({ tracks }: RecruitmentTimelineProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const eventLabelRefs = useRef(new Map<string, HTMLSpanElement>());
  const activeLabelKeysRef = useRef(new Set<string>());
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const allDates = tracks.flatMap((track) => track.events.flatMap((event) => [event.startDate, event.endDate]));
  const uniqueDates = [...new Set(allDates)].sort((a, b) => toDayValue(a) - toDayValue(b));
  const markerOffsetByDate = new Map(uniqueDates.map((dateText, index) => [dateText, index * TIMELINE_MARKER_GAP_REM]));
  const dateSpan = Math.max((uniqueDates.length - 1) * TIMELINE_MARKER_GAP_REM, 1);
  const railWidthRem = Math.max(dateSpan, MIN_RAIL_WIDTH_REM);
  const todayOffsetRem = getTimelineOffset(getCurrentDateText(), uniqueDates);
  const [isDragging, setIsDragging] = useState(false);
  const getMarkerOffset = (dateText: string) => markerOffsetByDate.get(dateText) ?? 0;
  const getPosition = (dateText: string) => (getMarkerOffset(dateText) / dateSpan) * 100;

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) {
      return;
    }

    const updateLabelPositions = () => {
      const viewportRect = scrollElement.getBoundingClientRect();

      eventLabelRefs.current.forEach((labelElement, labelKey) => {
        const eventElement = labelElement.parentElement;
        if (!eventElement) {
          return;
        }

        const eventRect = eventElement.getBoundingClientRect();
        const eventTouchesViewport = eventRect.right > viewportRect.left && eventRect.left < viewportRect.right;

        if (eventTouchesViewport) {
          activeLabelKeysRef.current.add(labelKey);
        }

        if (!activeLabelKeysRef.current.has(labelKey)) {
          labelElement.style.setProperty("--event-label-offset", "0px");
          return;
        }

        const labelWidth = labelElement.getBoundingClientRect().width;
        const labelOffset = getVisibleLabelOffset({ eventRect, labelWidth, viewportRect });
        labelElement.style.setProperty("--event-label-offset", `${labelOffset}px`);
      });
    };

    updateLabelPositions();
    scrollElement.addEventListener("scroll", updateLabelPositions, { passive: true });
    const resizeObserver = new ResizeObserver(updateLabelPositions);
    resizeObserver.observe(scrollElement);

    return () => {
      scrollElement.removeEventListener("scroll", updateLabelPositions);
      resizeObserver.disconnect();
    };
  }, [tracks]);
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

                    const eventKey = `${track.id}-${event.startDate}-${event.endDate}-${event.label}`;

                    return (
                      <div key={eventKey} className={styles.eventBlock} style={{ left: `${left+0.1}%`, width: `${width-0.2}%` }}>
                        <span
                          ref={(element) => {
                            if (element) {
                              eventLabelRefs.current.set(eventKey, element);
                            } else {
                              eventLabelRefs.current.delete(eventKey);
                            }
                          }}
                          className={styles.eventLabel}>
                          {event.label}
                        </span>
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
