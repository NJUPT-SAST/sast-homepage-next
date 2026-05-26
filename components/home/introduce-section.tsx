import Image from "next/image";
import { summaries } from "@/components/home/homepage-data";
import styles from "./introduce-section.module.css";

export default function IntroduceSection() {
  return (
    <section className={styles.introduce}>
      <div className={styles.waveLayer} aria-hidden>
        <Image src="/home/backgrounds/waves/wave-1.png" alt="" width={2286} height={718} className={styles.wave1} />
        <Image src="/home/backgrounds/waves/wave-2.png" alt="" width={2488} height={977} className={styles.wave2} />
        <Image src="/home/backgrounds/waves/wave-3.png" alt="" width={2424} height={700} className={styles.wave3} />
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
          <h2 className={styles.question}>南邮校科协，我们是谁?</h2>
          <p className={styles.answer}>
            南京邮电大学大学生科学技术协会（Students&apos; Association for Science and
            Technology），简称 SAST，中文简称南邮校科协，成立于 1992 年。
            它是在校团委指导下，依照国家法规和大学生规章制度，独立开展活动的学生科技文化及学术研究组织。
            <br />
            <br />
            南邮校科协现分为技术中心、办公中心、创新中心三大中心，其中创新中心下还设有多个直属社团，
            组织管理有序，机构设置严谨。校科协本着学以致用的务实原则，广泛开展各项具有学术性、知识性、
            实践性的科技创新活动。
            <br />
            <br />
            历届校科协成员中，有很多凭借优异的成绩被知名公司聘用、顶尖高校录取。
            南邮校科协始终以“增强科技意识，活跃学术气氛，提高创新能力，培养科技人才”为目标，
            努力让更多的南邮学子在这里点燃梦想，成功启航。
          </p>
          <Image
            src="/home/illustrations/tree.png"
            alt=""
            width={535}
            height={463}
            className={styles.tree}
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
