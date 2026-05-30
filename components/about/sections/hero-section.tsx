import { Backgroud1 } from "@/components/shared";
import aboutContent from "@/content/about.json";
import styles from "./hero-section.module.css";

export default function AboutHeroSection() {
  return (
    <section className={styles.heroSection}>
      <Backgroud1 />

      <div className={styles.heroInner}>
        <div className={styles.heroRow}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{aboutContent.hero.top.eyebrow}</p>
            <h1 className={styles.heroTitle}>{aboutContent.hero.top.title}</h1>
            {aboutContent.hero.top.text.filter(Boolean).map((paragraph) => (
              <p key={paragraph} className={styles.heroText}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className={styles.highlightColumn}>
            {aboutContent.hero.highlights.top.map((item) => (
              <article key={item.value} className={styles.highlightCard}>
                <p className={styles.highlightValue}>{item.value}</p>
                <p className={styles.highlightNote}>{item.note}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={`${styles.heroRow} ${styles.heroRowReverse}`}>
          <div className={styles.highlightColumn}>
            {aboutContent.hero.highlights.bottom.map((item) => (
              <article key={item.value} className={styles.highlightCard}>
                <p className={styles.highlightValue}>{item.value}</p>
                <p className={styles.highlightNote}>{item.note}</p>
              </article>
            ))}
          </div>

          <div className={`${styles.heroCopy}`}>
            <p className={styles.eyebrow}>{aboutContent.hero.bottom.eyebrow}</p>
            <h2 className={styles.heroTitle}>{aboutContent.hero.bottom.title}</h2>
            {aboutContent.hero.bottom.text.filter(Boolean).map((paragraph) => (
              <p key={paragraph} className={styles.heroText}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
