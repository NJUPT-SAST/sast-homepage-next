import Image from "next/image";
import styles from "./backgroud2.module.css";

export default function Backgroud2() {
  return (
    <div className={styles.background} aria-hidden>
      <div className={styles.scene}>
        <Image src="/share/backgrounds/data/rectangle-11.png" alt="" width={116} height={116} className={`${styles.shape} ${styles.rectangle11}`} />
        <Image src="/share/backgrounds/data/rectangle-12.png" alt="" width={164} height={164} className={`${styles.shape} ${styles.rectangle12}`} />
        <Image src="/share/backgrounds/data/rectangle-13.png" alt="" width={350} height={350} className={`${styles.shape} ${styles.rectangle13}`} />
        <Image src="/share/backgrounds/data/rectangle-14.png" alt="" width={128} height={128} className={`${styles.shape} ${styles.rectangle14}`} />
        <Image src="/share/backgrounds/data/rectangle-15.png" alt="" width={128} height={128} className={`${styles.shape} ${styles.rectangle15}`} />
        <Image src="/share/backgrounds/data/rectangle-16.png" alt="" width={336} height={336} className={`${styles.shape} ${styles.rectangle16}`} />
        <Image src="/share/backgrounds/data/rectangle-17.png" alt="" width={219} height={219} className={`${styles.shape} ${styles.rectangle17}`} />
        <Image src="/share/backgrounds/data/rectangle-18.png" alt="" width={164} height={164} className={`${styles.shape} ${styles.rectangle18}`} />
        <Image src="/share/backgrounds/data/rectangle-19.png" alt="" width={117} height={116} className={`${styles.shape} ${styles.rectangle19}`} />
      </div>
    </div>
  );
}
