import { Backgroud2 } from "@/components/shared";
import aboutContent from "@/content/about.json";
import styles from "./snapshot-section.module.css";

export default function AboutSnapshotSection() {
  return (
    <section className={styles.snapshotSection}>
      <Backgroud2 />

      <div className={styles.snapshotInner}>
        <div className={styles.snapshotHeader}>
          <p className={styles.sectionLabel}>{aboutContent.snapshot.label}</p>
          <h2 className={styles.sectionTitle}>{aboutContent.snapshot.title}</h2>
          {aboutContent.snapshot.lead.filter(Boolean).map((paragraph) => (
            <p key={paragraph} className={styles.sectionLead}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className={styles.momentGrid}>
          {aboutContent.snapshot.moments.map((item, index) => (
            <article key={item.title} className={styles.momentCard}>
              <p className={styles.momentIndex}>0{index + 1}</p>
              <h3 className={styles.momentTitle}>{item.title}</h3>
              <p className={styles.momentText}>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
