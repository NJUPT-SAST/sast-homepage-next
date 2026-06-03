import { Backgroud1 } from "@/components/shared";
import { ActionLink } from "@/components/shared";
import departmentsContent from "@/content/departments.json";
import styles from "./hero-section.module.css";

export default function DepartmentsHeroSection() {
  const departmentLinkMap = new Map(departmentsContent.details.tabs.map((item) => [item.name, `#department-${item.id}`]));

  return (
    <section className={styles.heroSection}>
      <Backgroud1 />

      <div className={styles.heroInner}>
        <div className={styles.copyBlock}>
          <p className={styles.eyebrow}>{departmentsContent.hero.eyebrow}</p>
          <h2 className={styles.title}>{departmentsContent.hero.title}</h2>
          {departmentsContent.hero.paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.lead}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className={styles.groupGrid}>
          {departmentsContent.hero.groups.map((group) => (
            <article key={group.id} id={group.id} className={styles.groupCard}>
              <p className={styles.groupTitle}>{group.title}</p>
              <p className={styles.groupSubtitle}>{group.subtitle}</p>
              <ul className={styles.departmentList}>
                {group.departments.map((department) => (
                  <li key={department}>
                    <ActionLink href={departmentLinkMap.get(department)!} className={styles.departmentItem}>
                      {department}
                    </ActionLink>
                  </li>
                ))}
              </ul>
              <p className={styles.groupNote}>{group.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
