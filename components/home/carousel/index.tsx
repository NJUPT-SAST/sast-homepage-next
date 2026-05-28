"use client";

import { useEffect, useState } from "react";
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

  const activeIndex = slides.length > 1 ? (currentIndex - 1 + slides.length) % slides.length : 0;

  useEffect(() => {
    if (slides.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
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
    } else if (currentIndex === 0) {
      setTransitionEnabled(false);
      setCurrentIndex(loopSlides.length - 2);
    }
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: transitionEnabled ? "transform 560ms ease" : "none",
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

      <div className={styles.indicators} aria-label="首页轮播图切换">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            className={`${styles.indicator} ${index === activeIndex ? styles.active : ""}`}
            onClick={() => {
              setTransitionEnabled(true);
              setCurrentIndex(slides.length > 1 ? index + 1 : index);
            }}
            aria-label={`切换到第 ${index + 1} 张`}
            aria-pressed={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}
