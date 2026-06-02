import Image from "next/image";
import { Backgroud2 } from "@/components/shared";
import homeContent from "@/content/home.json";
import styles from "./data-section.module.css";

export default function DataSection() {
  const statTones = ["sky", "mint", "sky", "mint", "sky", "mint"] as const;
  const stats = homeContent.data.stats.map((item, index) => ({
    ...item,
    tone: statTones[index] ?? "sky",
  }));

  return (
    <section className={styles.dataSection}>
      <Backgroud2 />

      <div className={styles.dataInner}>
        <Image
          src="/home/titles/data-title.png"
          alt="数据概览"
          width={201}
          height={60}
          className={styles.dataTitle}
        />
        <div className={styles.dataGrid}>
          {stats.map((item, index) => (
            <article key={`${item.value}-${index}`} className={styles.dataCard}>
              <div className={`${styles.dataNum} ${item.tone === "sky" ? styles.sky : styles.mint}`}>
                <span className={styles.dataValue}>{item.value}</span>
                <span className={styles.dataUnit}>{item.unit}</span>
              </div>
              <p className={styles.dataText}>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
