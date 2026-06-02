import Image from "next/image";
import { ActionLink } from "@/components/shared";
import homeContent from "@/content/home.json";
import styles from "./introduce-section.module.css";

export default function IntroduceSection() {
  const summaryMeta = [
    { icon: "/home/icons/summary/summary-1.png", color: "#53A0FD" },
    { icon: "/home/icons/summary/summary-2.png", color: "#27A29C" },
    { icon: "/home/icons/summary/summary-3.png", color: "#53A0FD" },
    { icon: "/home/icons/summary/summary-4.png", color: "#27A29C" },
  ];
  const introduceCards = homeContent.introduce.cards.map((item, index) => ({
    ...item,
    ...summaryMeta[index],
  }));

  return (
    <section className={styles.introduce}>
      <div className={styles.waveLayer} aria-hidden>
        <Image src="/share/backgrounds/waves/wave-1.png" alt="" width={2286} height={718} className={styles.wave1} />
        <Image src="/share/backgrounds/waves/wave-2.png" alt="" width={2488} height={977} className={styles.wave2} />
        <Image src="/share/backgrounds/waves/wave-3.png" alt="" width={2424} height={700} className={styles.wave3} />
      </div>

      <div className={styles.introduceInner}>
        <div className={styles.summaryColumn}>
          {introduceCards.map((item) => (
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
          <h2 className={styles.question}>{homeContent.introduce.title}</h2>
          <Image src="/home/illustrations/tree.png" alt="" width={535} height={463} className={styles.tree} aria-hidden />
          <p className={styles.answer}>
            {homeContent.introduce.paragraphs.map((paragraph, index) => (
              <span key={paragraph}>
                {paragraph}
                {index < homeContent.introduce.paragraphs.length - 1 ? (
                  <>
                    <br />
                    <br />
                  </>
                ) : null}
              </span>
            ))}
            <br />
            <br />
            <ActionLink href={homeContent.introduce.moreLink.href} className={styles.sectionLink}>
              {homeContent.introduce.moreLink.text}
            </ActionLink>
          </p>
        </div>
      </div>
    </section>
  );
}
