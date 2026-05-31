import Image from "next/image";
import { stats } from "@/components/home/data/homepage-data";
import { Backgroud2 } from "@/components/shared";
import styles from "./data-section.module.css";

export default function DataSection() {
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
