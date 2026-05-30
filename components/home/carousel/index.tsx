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

export default function HomeCarousel({ slides }: { slides: CarouselSlide[] }) {
  const loopSlides = slides.length > 1 ? [slides[slides.length - 1], ...slides, slides[0]] : slides;
  const [currentIndex, setCurrentIndex] = useState(slides.length > 1 ? 1 : 0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const isHorizontalDragRef = useRef<boolean | null>(null);

  const activeIndex = slides.length > 1 ? (currentIndex - 1 + slides.length) % slides.length : 0;

  useEffect(() => {
    if (slides.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      if (isDraggingRef.current || isAnimatingRef.current) {
        return;
      }

      isAnimatingRef.current = true;
      setCurrentIndex((current) => current + 1);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [slides.length]);

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
    if (slides.length <= 1) {
      return;
    }

    if (currentIndex === loopSlides.length - 1) {
      setTransitionEnabled(false);
      setCurrentIndex(1);
      isAnimatingRef.current = false;
    } else if (currentIndex === 0) {
      setTransitionEnabled(false);
      setCurrentIndex(loopSlides.length - 2);
      isAnimatingRef.current = false;
    } else {
      isAnimatingRef.current = false;
    }
  };

  const resetDrag = () => {
    isDraggingRef.current = false;
    isHorizontalDragRef.current = null;
    dragOffsetRef.current = 0;
    setIsDragging(false);
    setDragOffset(0);
  };

  const startDrag = (clientX: number, clientY: number) => {
    if (slides.length <= 1 || isAnimatingRef.current) {
      return;
    }

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

    dragOffsetRef.current = deltaX;
    setDragOffset(deltaX);
    return true;
  };

  const endDrag = () => {
    if (!isDraggingRef.current) {
      return;
    }

    if (!isHorizontalDragRef.current) {
      resetDrag();
      return;
    }

    const viewportWidth = viewportRef.current?.offsetWidth ?? 0;
    const threshold = Math.max(48, viewportWidth * 0.12);

    if (dragOffsetRef.current <= -threshold) {
      isAnimatingRef.current = true;
      setCurrentIndex((current) => current + 1);
    } else if (dragOffsetRef.current >= threshold) {
      isAnimatingRef.current = true;
      setCurrentIndex((current) => current - 1);
    }

    resetDrag();
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
        onTouchCancel={resetDrag}
        onMouseDown={handleMouseDown}
        onMouseMove={(event) => {
          moveDrag(event.clientX, event.clientY);
        }}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}>
        <div
          className={styles.track}
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
            transition: isDragging ? "none" : transitionEnabled ? "transform 560ms ease" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}>
          {loopSlides.map((slide, index) => {
            const slideIndex = slides.length > 1 ? (index === 0 ? slides.length - 1 : index === loopSlides.length - 1 ? 0 : index - 1) : index;
            const isPrioritySlide = slides.length > 1 ? index === 1 : index === 0;

            return (
              <div key={`${slide.title}-${index}`} className={styles.slide} data-slide={slideIndex}>
                <div className={styles.card}>
                  <Image src={slide.image} alt={slide.imageAlt} width={slide.imageWidth} height={slide.imageHeight} className={styles.slideImage} priority={isPrioritySlide} />
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
            );
          })}
        </div>
      </div>

      <div className={styles.indicators} aria-label="轮播切换">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            className={`${styles.indicator} ${index === activeIndex ? styles.active : ""}`}
            onClick={() => {
              const targetIndex = slides.length > 1 ? index + 1 : index;

              if (isAnimatingRef.current) {
                return;
              }

              if (targetIndex === currentIndex) {
                return;
              }

              setTransitionEnabled(true);
              isAnimatingRef.current = true;
              setCurrentIndex(targetIndex);
            }}
            aria-label={`切换到第 ${index + 1} 张`}
            aria-pressed={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}
