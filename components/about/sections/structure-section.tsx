import { ActionLink, Backgroud2 } from "@/components/shared";
import aboutContent from "@/content/about.json";
import { renderRichText } from "@/components/shared/render-rich-text";
import styles from "./structure-section.module.css";

export default function AboutStructureSection() {
  return (
    <section className={styles.snapshotSection}>
      <Backgroud2 />

      <div className={styles.snapshotInner}>
        <div className={styles.snapshotHeader}>
          <p className={styles.sectionLabel}>{aboutContent.structure.eyebrow}</p>

          <div className={styles.titleRow}>
            <h2 className={styles.sectionTitle}>{aboutContent.structure.title}</h2>
            <ActionLink href={aboutContent.structure.moreLink.href} className={styles.sectionLink}>
              {aboutContent.structure.moreLink.text}
            </ActionLink>
          </div>

          <div className={styles.headerBody}>
            {aboutContent.structure.paragraphs.filter(Boolean).map((paragraph) => (
              <p key={paragraph} className={styles.sectionLead}>
                {renderRichText(paragraph)}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.momentGrid}>
          {aboutContent.structure.cards.map((item, index) => (
            <article key={item.title} className={styles.momentCard}>
              <p className={styles.momentIndex}>0{index + 1}</p>
              <h3 className={styles.momentTitle}>{renderRichText(item.title)}</h3>
              <p className={styles.momentText}>{renderRichText(item.text)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
