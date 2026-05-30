import Image from "next/image";
import { summaries } from "@/components/home/data/homepage-data";
import homeContent from "@/content/home.json";
import styles from "./introduce-section.module.css";

export default function IntroduceSection() {
  return (
    <section className={styles.introduce}>
      <div className={styles.waveLayer} aria-hidden>
        <Image src="/share/backgrounds/waves/wave-1.png" alt="" width={2286} height={718} className={styles.wave1} />
        <Image src="/share/backgrounds/waves/wave-2.png" alt="" width={2488} height={977} className={styles.wave2} />
        <Image src="/share/backgrounds/waves/wave-3.png" alt="" width={2424} height={700} className={styles.wave3} />
      </div>

      <div className={styles.introduceInner}>
        <div className={styles.summaryColumn}>
          {summaries.map((item) => (
            <article key={item.title} className={styles.summaryItem}>
              <Image src={item.icon} alt="" width={50} height={50} className={styles.summaryIcon} />
              <div>
                <h3 className={styles.summaryTitle} style={{ color: item.color }}>
                  {item.title}
                </h3>
                <p className={styles.summaryText}>{item.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.aboutColumn}>
          <h2 className={styles.question}>{homeContent.introduce.question}</h2>
          <Image src="/home/illustrations/tree.png" alt="" width={535} height={463} className={styles.tree} aria-hidden />
          <p className={styles.answer}>
            {homeContent.introduce.aboutText.map((paragraph, index) => (
              <span key={paragraph}>
                {paragraph}
                {index < homeContent.introduce.aboutText.length - 1 ? (
                  <>
                    <br />
                    <br />
                  </>
                ) : null}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
