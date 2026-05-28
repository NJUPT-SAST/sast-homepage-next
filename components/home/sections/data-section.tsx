import Image from "next/image";
import { stats } from "@/components/home/data/homepage-data";
import styles from "./data-section.module.css";

export default function DataSection() {
  return (
    <section className={styles.dataSection}>
      <div className={styles.dataBackground} aria-hidden>
        <div className={styles.dataBackgroundScene}>
          <Image src="/home/backgrounds/data/rectangle-11.png" alt="" width={116} height={116} className={`${styles.shape} ${styles.rectangle11}`} />
          <Image src="/home/backgrounds/data/rectangle-12.png" alt="" width={164} height={164} className={`${styles.shape} ${styles.rectangle12}`} />
          <Image src="/home/backgrounds/data/rectangle-13.png" alt="" width={350} height={350} className={`${styles.shape} ${styles.rectangle13}`} />
          <Image src="/home/backgrounds/data/rectangle-14.png" alt="" width={128} height={128} className={`${styles.shape} ${styles.rectangle14}`} />
          <Image src="/home/backgrounds/data/rectangle-15.png" alt="" width={128} height={128} className={`${styles.shape} ${styles.rectangle15}`} />
          <Image src="/home/backgrounds/data/rectangle-16.png" alt="" width={336} height={336} className={`${styles.shape} ${styles.rectangle16}`} />
          <Image src="/home/backgrounds/data/rectangle-17.png" alt="" width={219} height={219} className={`${styles.shape} ${styles.rectangle17}`} />
          <Image src="/home/backgrounds/data/rectangle-18.png" alt="" width={164} height={164} className={`${styles.shape} ${styles.rectangle18}`} />
          <Image src="/home/backgrounds/data/rectangle-19.png" alt="" width={117} height={116} className={`${styles.shape} ${styles.rectangle19}`} />
        </div>
      </div>

      <div className={styles.dataInner}>
        <Image
          src="/home/titles/data-title.png"
          alt="数据"
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
              <p className={styles.dataText}>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
