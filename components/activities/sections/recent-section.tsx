import { ActionLink, Backgroud1 } from "@/components/shared";
import activitiesContent from "@/content/activities.json";
import styles from "./recent-section.module.css";
import { Activity } from "@/app/activities/page";

export default function ActivitiesRecentSection({ LarkActivities }: { LarkActivities: Activity[] }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const LocalActivities: Activity[] = activitiesContent.recentSection.activities.filter((activity) => {
    const startDate = new Date(activity.date);
    const endDate = new Date(activity.time);

    if (Number.isNaN(startDate.getTime())) {
      return true;
    }

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    return isNaN(endDate.getTime()) ? startDate > today : startDate > today;
  });
  const AllActivities = [...LocalActivities, ...LarkActivities];

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
          {AllActivities.map((activity) => {
            return (
              <article key={`${activity.title}-${activity.time}`} className={styles.activityCard}>
                <span className={styles.cardTag}>{activity.organizer}</span>
                {activity.link ? (
                  <ActionLink href={activity.link} className={styles.cardTitle}>
                    {activity.title.length > 8 ? activity.title.slice(0, 6) + "..." : activity.title}
                  </ActionLink>
                ) : (
                  <h2 className={styles.cardTitle}>{activity.title.length > 8 ? activity.title.slice(0, 6) + "..." : activity.title}</h2>
                )}
                <div className={styles.cardMeta}>
                  <div className={styles.metaRow}>
                    <p className={styles.metaValue}>{activity.date}</p>
                    <p className={styles.metaValue}>{activity.time}</p>
                  </div>
                  <p className={styles.metaValue}>{activity.location}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
