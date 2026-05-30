"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import aboutContent from "@/content/about.json";
import { renderRichText } from "@/components/about/utils/render-rich-text";
import styles from "./story-section.module.css";

export default function AboutStorySection() {
  const gridRef = useRef<HTMLDivElement | null>(null);

  const storyCards = [
    {
      key: "story-text",
      index: "01",
      type: "text" as const,
      texts: aboutContent.story.texts.filter(Boolean),
    },
    ...aboutContent.story.principles.map((item, index) => ({
      key: item.title,
      index: `0${index + 2}`,
      type: "principle" as const,
      ...item,
    })),
  ];

  useEffect(() => {
    const grid = gridRef.current;

    if (!grid || window.innerWidth <= 767) {
      return;
    }

    const layoutCards = () => {
      const rowSize = parseFloat(getComputedStyle(grid).getPropertyValue("grid-auto-rows"));
      const gapSize = parseFloat(getComputedStyle(grid).getPropertyValue("gap"));

      if (!rowSize) {
        return;
      }

      grid.querySelectorAll<HTMLElement>(`[data-story-card="true"]`).forEach((card) => {
        const content = card.firstElementChild as HTMLElement | null;

        if (!content) {
          return;
        }

        const span = Math.ceil((content.getBoundingClientRect().height + gapSize) / (rowSize + gapSize));
        card.style.gridRowEnd = `span ${span}`;
      });
    };

    const resizeObserver = new ResizeObserver(() => {
      layoutCards();
    });

    grid.querySelectorAll<HTMLElement>(`[data-story-card="true"]`).forEach((card) => {
      const content = card.firstElementChild as HTMLElement | null;

      if (content) {
        resizeObserver.observe(content);
      }
    });

    layoutCards();
    window.addEventListener("resize", layoutCards);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", layoutCards);
    };
  }, []);

  return (
    <section className={styles.storySection}>
      <div className={styles.storyInner}>
        <div className={styles.storyHeader}>
          <div className={styles.titleBlock}>
            <p className={styles.sectionLabel}>{aboutContent.story.label}</p>
            <h2 className={styles.sectionTitle}>{aboutContent.story.title}</h2>
          </div>
          <p className={styles.sectionLead}>{aboutContent.story.lead}</p>
        </div>

        <div ref={gridRef} className={styles.storyMasonry}>
          {storyCards.map((item) => (
            <article
              key={item.key}
              data-story-card="true"
              className={`${styles.storyCard} ${item.type === "text" ? styles.textCard : styles.principleCard}`}>
              <div className={styles.storyCardInner}>
                <p className={styles.cardIndex}>{item.index}</p>

                {item.type === "text" ? (
                  <>
                    {item.texts.map((paragraph) => (
                      <p key={paragraph} className={styles.featureText}>
                        {renderRichText(paragraph)}
                      </p>
                    ))}
                    <p className={styles.featureText}>
                      <a href="https://www.feishu.cn/calendar/share/calendar?token=PDr9ALcjL-ljBbZBRNjit8keiLGQQR_exfxEAhng0wxQ2UmtlnwI62w4vFurID1OytdHJfDT1g==" className={styles.moreLink}>
                        订阅 SAST 公开活动日历
                      </a>
                    </p>
                  </>
                ) : (
                  <>
                    {item.image ? <Image src={item.image} alt="" width={640} height={360} className={styles.principleImage} /> : null}
                    <h3 className={styles.principleTitle}>{renderRichText(item.title)}</h3>
                    <p className={styles.principleText}>{renderRichText(item.text)}</p>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
