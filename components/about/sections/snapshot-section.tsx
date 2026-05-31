import { Backgroud2 } from "@/components/shared";
import aboutContent from "@/content/about.json";
import { renderRichText } from "@/components/about/utils/render-rich-text";
import styles from "./snapshot-section.module.css";

export default function AboutSnapshotSection() {
  return (
    <section className={styles.snapshotSection}>
      <Backgroud2 />

      <div className={styles.snapshotInner}>
        <div className={styles.snapshotHeader}>
          <p className={styles.sectionLabel}>{aboutContent.snapshot.label}</p>

          <div className={styles.titleRow}>
            <h2 className={styles.sectionTitle}>{aboutContent.snapshot.title}</h2>
            <a href={aboutContent.snapshot.link.href} className={styles.sectionLink}>
              {aboutContent.snapshot.link.text}
            </a>
          </div>

          <div className={styles.headerBody}>
            {aboutContent.snapshot.lead.filter(Boolean).map((paragraph) => (
              <p key={paragraph} className={styles.sectionLead}>
                {renderRichText(paragraph)}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.momentGrid}>
          {aboutContent.snapshot.moments.map((item, index) => (
            <article key={item.title} className={styles.momentCard}>
              <p className={styles.momentIndex}>0{index + 1}</p>
              <h3 className={styles.momentTitle}>{renderRichText(item.title)}</h3>
              <p className={styles.momentText}>{renderRichText(item.text)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
