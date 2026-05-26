"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./home-carousel.module.css";

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
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [slides.length]);

  const activeSlide = slides[activeIndex];

  return (
    <div className={styles.carousel}>
      <div className={styles.card} data-slide={activeIndex}>
        <Image
          src={activeSlide.image}
          alt={activeSlide.imageAlt}
          width={activeSlide.imageWidth}
          height={activeSlide.imageHeight}
          className={styles.slideImage}
          priority
        />
        <div className={styles.textPanel}>
          <h2 className={styles.title} style={{ color: activeSlide.titleColor }}>
            {activeSlide.title}
          </h2>
          <div className={styles.line} />
          <p className={styles.text}>{activeSlide.text}</p>
          <p className={styles.more} style={{ color: activeSlide.moreColor }}>
            {activeSlide.more}
          </p>
        </div>
      </div>

      <div className={styles.indicators} aria-label="首页轮播图切换">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            className={`${styles.indicator} ${index === activeIndex ? styles.active : ""}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`切换到第 ${index + 1} 张`}
            aria-pressed={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}
