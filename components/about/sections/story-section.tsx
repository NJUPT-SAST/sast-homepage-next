import Image from "next/image";
import { aboutPrinciples } from "@/components/about/data/aboutpage-data";
import styles from "./story-section.module.css";

export default function AboutStorySection() {
  return (
    <section className={styles.storySection}>
      <div className={styles.storyInner}>
        <div className={styles.storyHeader}>
          <div className={styles.titleBlock}>
            <p className={styles.sectionLabel}>WHO WE ARE</p>
            <h2 className={styles.sectionTitle}>关于我们，更像是一组持续发生的状态</h2>
          </div>
          <p className={styles.sectionLead}>我们希望技术不只是技能表上的一项，而是能连接人、项目、表达和长期兴趣的媒介。于是，关于页也不做成传统介绍栏，而是用更接近现在气质的方式去呈现。</p>
        </div>

        <div className={styles.storyBody}>
          <article className={styles.featurePanel}>
            <div className={styles.featureIntro}>
              <Image src="/share/logos/logo-color.png" alt="SAST" width={135} height={55} className={styles.featureLogo} />
              <p className={styles.featureText}>我们关心的不只是“会不会”，也包括“为什么这样做”和“怎样一起把它做得更好”。这种节奏，决定了 SAST 看起来既有技术感，也总带着一点温度。</p>
            </div>
          </article>

          <div className={styles.principlesGrid}>
            {aboutPrinciples.map((item) => (
              <article key={item.title} className={styles.principleCard}>
                <h3 className={styles.principleTitle}>{item.title}</h3>
                <p className={styles.principleText}>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
