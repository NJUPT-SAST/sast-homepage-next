import { ActionLink, Backgroud1 } from "@/components/shared";
import activitiesContent from "@/content/activities.json";
import styles from "./recent-section.module.css";

export default function ActivitiesRecentSection() {
  return (
    <section className={styles.recentSection}>
      <Backgroud1 />

      <div className={styles.recentInner}>
        <header className={styles.recentHeader}>
          <p className={styles.sectionLabel}>{activitiesContent.recentSection.eyebrow}</p>
          <div className={styles.sectionTitleRow}>
            <h2 className={styles.sectionTitle}>{activitiesContent.recentSection.title}</h2>
            <ActionLink href={activitiesContent.recentSection.moreLink.href} className={styles.sectionLink} openInNewTab>
              {activitiesContent.recentSection.moreLink.text}
            </ActionLink>
          </div>
          {activitiesContent.recentSection.intro.map((paragraph, index) => (
            <p key={index} className={styles.sectionIntro}>
              {paragraph}
            </p>
          ))}
        </header>

        <div className={styles.activityGrid}>
          {activitiesContent.recentSection.activities.map((activity) => {
            return (
              <article key={`${activity.title}-${activity.time}`} className={styles.activityCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardMain}>
                    <span className={styles.cardTag}>{activity.organizer}</span>
                    <h2 className={styles.cardTitle}>{activity.title}</h2>
                  </div>

                  <div className={styles.cardMeta}>
                    <p className={styles.metaValue}>{activity.date}</p>
                    <p className={styles.metaValue}>{activity.time}</p>
                    <p className={styles.metaValue}>{activity.location}</p>
                  </div>
                </div>
                <p className={styles.cardText}>{activity.details}</p>
                <ActionLink href={activity.link} className={styles.cardLink} openInNewTab>
                  查看详情
                </ActionLink>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
