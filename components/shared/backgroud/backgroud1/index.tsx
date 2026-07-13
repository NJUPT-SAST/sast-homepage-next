import Image from "next/image";
import styles from "./backgroud1.module.css";

export default function Backgroud1() {
  return (
    <div className={styles.background} aria-hidden>
      <div className={styles.scene}>
        <Image src="/share/backgrounds/hero/rectangle-1.png" alt="" width={510} height={638} className={`${styles.shape} ${styles.rectangle1}`} loading="eager" style={{ height: "auto" }} />
        <Image src="/share/backgrounds/hero/rectangle-2.png" alt="" width={275} height={275} className={`${styles.shape} ${styles.rectangle2}`} loading="eager" />
        <Image src="/share/backgrounds/hero/rectangle-3.png" alt="" width={485} height={362} className={`${styles.shape} ${styles.rectangle3}`} loading="eager" style={{ height: "auto" }} />
        <Image src="/share/backgrounds/hero/rectangle-4.png" alt="" width={176} height={79} className={`${styles.shape} ${styles.rectangle4}`} style={{ height: "auto" }} />
        <Image src="/share/backgrounds/hero/rectangle-5.png" alt="" width={258} height={116} className={`${styles.shape} ${styles.rectangle5}`} style={{ height: "auto" }} />
        <Image src="/share/backgrounds/hero/rectangle-6.png" alt="" width={529} height={432} className={`${styles.shape} ${styles.rectangle6}`} style={{ height: "auto" }} />
      </div>
    </div>
  );
}
