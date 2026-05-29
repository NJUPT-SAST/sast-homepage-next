"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./carousel.module.css";

export type CarouselSlide = {
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  title: string;
  titleColor: string;
  text: string;
  more: string;
  moreColor: string;
};

const AUTO_PLAY_MS = 5000;
const CENTER_POSITION = 1;

export default function HomeCarousel({ slides }: { slides: CarouselSlide[] }) {
  const slideCount = slides.length;
  const hasMultipleSlides = slideCount > 1;
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackPosition, setTrackPosition] = useState(CENTER_POSITION);
  const [dragOffset, setDragOffset] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const dragBaseOffsetRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const isHorizontalDragRef = useRef<boolean | null>(null);
  const animationStepRef = useRef<1 | -1 | 0>(0);

  const wrapIndex = (index: number) => (index + slideCount) % slideCount;

  const windowSlides = hasMultipleSlides
    ? [wrapIndex(activeIndex - 1), activeIndex, wrapIndex(activeIndex + 1)].map((index) => ({
        ...slides[index],
        slideIndex: index,
      }))
    : slides.map((slide, index) => ({
        ...slide,
        slideIndex: index,
      }));

  const resetTrackToCenter = (nextIndex: number) => {
    setTransitionEnabled(false);
    setTrackPosition(CENTER_POSITION);
    setDragOffset(0);
    dragOffsetRef.current = 0;
    setActiveIndex(nextIndex);
  };

  const pauseCurrentAnimation = () => {
    const viewportWidth = viewportRef.current?.offsetWidth ?? 0;
    const track = trackRef.current;

    if (!track || viewportWidth === 0) {
      isAnimatingRef.current = false;
      animationStepRef.current = 0;
      return 0;
    }

    let currentTranslateX = -trackPosition * viewportWidth + dragOffsetRef.current;

    try {
      const transform = window.getComputedStyle(track).transform;

      if (transform && transform !== "none") {
        currentTranslateX = new DOMMatrixReadOnly(transform).m41;
      }
    } catch {
      // Fall back to the calculated value above when DOMMatrix is unavailable.
    }

    const frozenOffset = currentTranslateX + viewportWidth * CENTER_POSITION;

    setTransitionEnabled(false);
    setTrackPosition(CENTER_POSITION);
    setDragOffset(frozenOffset);
    dragOffsetRef.current = frozenOffset;
    isAnimatingRef.current = false;
    animationStepRef.current = 0;

    return frozenOffset;
  };

  const startStepTransition = (step: 1 | -1) => {
    if (!hasMultipleSlides) {
      return;
    }

    const begin = () => {
      animationStepRef.current = step;
      isAnimatingRef.current = true;
      dragBaseOffsetRef.current = 0;
      dragOffsetRef.current = 0;
      setTransitionEnabled(true);
      setDragOffset(0);
      setTrackPosition(step === 1 ? 2 : 0);
    };

    if (isAnimatingRef.current) {
      pauseCurrentAnimation();

      requestAnimationFrame(() => {
        requestAnimationFrame(begin);
      });
      return;
    }

    begin();
  };

  const reboundToCenter = () => {
    animationStepRef.current = 0;
    isAnimatingRef.current = true;
    dragOffsetRef.current = 0;
    setTransitionEnabled(true);
    setDragOffset(0);
    setTrackPosition(CENTER_POSITION);
  };

  const selectSlide = (index: number) => {
    if (!hasMultipleSlides || index === activeIndex) {
      return;
    }

    if (index === wrapIndex(activeIndex + 1)) {
      startStepTransition(1);
      return;
    }

    if (index === wrapIndex(activeIndex - 1)) {
      startStepTransition(-1);
      return;
    }

    if (isAnimatingRef.current) {
      pauseCurrentAnimation();
    }

    animationStepRef.current = 0;
    isAnimatingRef.current = false;
    resetTrackToCenter(index);
  };

  useEffect(() => {
    setActiveIndex(0);
    setTrackPosition(CENTER_POSITION);
    setDragOffset(0);
    dragOffsetRef.current = 0;
    isAnimatingRef.current = false;
    animationStepRef.current = 0;
  }, [slideCount]);

  useEffect(() => {
    if (!hasMultipleSlides) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      if (isDraggingRef.current || isAnimatingRef.current) {
        return;
      }

      startStepTransition(1);
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(intervalId);
  }, [activeIndex, hasMultipleSlides]);

  useEffect(() => {
    if (transitionEnabled) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [transitionEnabled]);

  const handleTransitionEnd = () => {
    if (!hasMultipleSlides) {
      return;
    }

    if (animationStepRef.current === 1) {
      isAnimatingRef.current = false;
      animationStepRef.current = 0;
      resetTrackToCenter(wrapIndex(activeIndex + 1));
      return;
    }

    if (animationStepRef.current === -1) {
      isAnimatingRef.current = false;
      animationStepRef.current = 0;
      resetTrackToCenter(wrapIndex(activeIndex - 1));
      return;
    }

    isAnimatingRef.current = false;
  };

  const clearDragState = () => {
    isDraggingRef.current = false;
    isHorizontalDragRef.current = null;
    dragBaseOffsetRef.current = 0;
    setIsDragging(false);
  };

  const startDrag = (clientX: number, clientY: number) => {
    if (!hasMultipleSlides) {
      return;
    }

    dragBaseOffsetRef.current = isAnimatingRef.current ? pauseCurrentAnimation() : 0;
    startXRef.current = clientX;
    startYRef.current = clientY;
    isDraggingRef.current = true;
    isHorizontalDragRef.current = null;
    setIsDragging(true);
    setTransitionEnabled(true);
  };

  const moveDrag = (clientX: number, clientY: number) => {
    if (!isDraggingRef.current) {
      return false;
    }

    const deltaX = clientX - startXRef.current;
    const deltaY = clientY - startYRef.current;

    if (isHorizontalDragRef.current === null) {
      isHorizontalDragRef.current = Math.abs(deltaX) > Math.abs(deltaY);
    }

    if (!isHorizontalDragRef.current) {
      return false;
    }

    const nextOffset = dragBaseOffsetRef.current + deltaX;

    dragOffsetRef.current = nextOffset;
    setDragOffset(nextOffset);
    return true;
  };

  const endDrag = () => {
    if (!isDraggingRef.current) {
      return;
    }

    const wasHorizontal = isHorizontalDragRef.current;
    const dragDistance = dragOffsetRef.current - dragBaseOffsetRef.current;
    const viewportWidth = viewportRef.current?.offsetWidth ?? 0;
    const threshold = Math.max(48, viewportWidth * 0.12);

    clearDragState();

    if (!wasHorizontal) {
      if (dragOffsetRef.current !== 0) {
        reboundToCenter();
      }
      return;
    }

    if (dragDistance <= -threshold) {
      startStepTransition(1);
    } else if (dragDistance >= threshold) {
      startStepTransition(-1);
    } else {
      reboundToCenter();
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];

    if (!touch) {
      return;
    }

    startDrag(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];

    if (!touch) {
      return;
    }

    if (moveDrag(touch.clientX, touch.clientY)) {
      event.preventDefault();
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) {
      return;
    }

    startDrag(event.clientX, event.clientY);
  };

  return (
    <div className={styles.carousel}>
      <div
        ref={viewportRef}
        className={styles.viewport}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={endDrag}
        onTouchCancel={endDrag}
        onMouseDown={handleMouseDown}
        onMouseMove={(event) => {
          moveDrag(event.clientX, event.clientY);
        }}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}>
        <div
          ref={trackRef}
          className={styles.track}
          style={{
            transform: `translateX(calc(-${trackPosition * 100}% + ${dragOffset}px))`,
            transition: isDragging ? "none" : transitionEnabled ? "transform 560ms ease" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}>
          {windowSlides.map((slide, index) => (
            <div key={`${slide.title}-${slide.slideIndex}-${index}`} className={styles.slide} data-slide={slide.slideIndex}>
              <div className={styles.card}>
                <Image src={slide.image} alt={slide.imageAlt} width={slide.imageWidth} height={slide.imageHeight} className={styles.slideImage} priority={slide.slideIndex === 0} />
                <div className={styles.textPanel}>
                  <h2 className={styles.title} style={{ color: slide.titleColor }}>
                    {slide.title}
                  </h2>
                  <div className={styles.line} />
                  <p className={styles.text}>{slide.text}</p>
                  <p className={styles.more} style={{ color: slide.moreColor }}>
                    {slide.more}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.indicators} aria-label="首页轮播图切换">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            className={`${styles.indicator} ${index === activeIndex ? styles.active : ""}`}
            onClick={() => selectSlide(index)}
            aria-label={`切换到第 ${index + 1} 张`}
            aria-pressed={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}
