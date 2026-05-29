import { Backgroud1 } from "@/components/shared";
import { aboutHighlights } from "@/components/about/data/aboutpage-data";
import styles from "./hero-section.module.css";

export default function AboutHeroSection() {
  return (
    <section className={styles.heroSection}>
      <Backgroud1 />

      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>ABOUT SAST</p>
          <h1 className={styles.heroTitle}>在技术、协作与表达之间，持续生长。</h1>
          <p className={styles.heroText}>
            SAST 对我们来说不只是一个技术社团，也是一种一起做事的方式。有人从这里开始接触项目，有人把兴趣慢慢做成作品，也有人在一次次合作里找到更适合自己的方向。
          </p>
          <p className={styles.heroText}>这页没有试图把一切说满，而是想保留一种更接近真实的感觉：好奇、认真、愿意反复修改，也愿意把好的东西继续传下去。</p>
        </div>

        <div className={styles.highlightColumn}>
          {aboutHighlights.map((item) => (
            <article key={item.value} className={styles.highlightCard}>
              <p className={styles.highlightValue}>{item.value}</p>
              <p className={styles.highlightNote}>{item.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
