import { Backgroud2 } from "@/components/shared";
import { aboutMoments } from "@/components/about/data/aboutpage-data";
import styles from "./snapshot-section.module.css";

export default function AboutSnapshotSection() {
  return (
    <section className={styles.snapshotSection}>
      <Backgroud2 />

      <div className={styles.snapshotInner}>
        <div className={styles.snapshotHeader}>
          <p className={styles.sectionLabel}>WHAT HAPPENS HERE</p>
          <h2 className={styles.sectionTitle}>把学习、制作和社群连接成同一种现场</h2>
          <p className={styles.sectionLead}>如果把首页看作是对外展示的第一眼，那么 about 更像是靠近一点之后看到的内部纹理。它既有秩序，也保留实验感。</p>
        </div>

        <div className={styles.momentGrid}>
          {aboutMoments.map((item, index) => (
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
