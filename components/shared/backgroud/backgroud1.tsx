import Image from "next/image";
import styles from "./backgroud1.module.css";

export default function Backgroud1() {
  return (
    <div className={styles.background} aria-hidden>
      <div className={styles.scene}>
        <Image src="/home/backgrounds/hero/rectangle-1.png" alt="" width={510} height={638} className={`${styles.shape} ${styles.rectangle1}`} />
        <Image src="/home/backgrounds/hero/rectangle-2.png" alt="" width={275} height={275} className={`${styles.shape} ${styles.rectangle2}`} />
        <Image src="/home/backgrounds/hero/rectangle-3.png" alt="" width={485} height={362} className={`${styles.shape} ${styles.rectangle3}`} />
        <Image src="/home/backgrounds/hero/rectangle-4.png" alt="" width={180} height={80} className={`${styles.shape} ${styles.rectangle4}`} />
        <Image src="/home/backgrounds/hero/rectangle-5.png" alt="" width={264} height={120} className={`${styles.shape} ${styles.rectangle5}`} />
        <Image src="/home/backgrounds/hero/rectangle-6.png" alt="" width={542} height={442} className={`${styles.shape} ${styles.rectangle6}`} />
      </div>
    </div>
  );
}
