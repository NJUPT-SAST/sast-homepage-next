import RecruitmentTimeline from "@/components/departments/recruitment-timeline";
import departmentsContent from "@/content/departments.json";
import styles from "./recruitment-section.module.css";

export default function DepartmentsRecruitmentSection() {
  return (
    <section id="departments-recruitment" className={styles.recruitmentSection}>
      <div className={styles.recruitmentInner}>
        <header className={styles.recruitmentHeader}>
          <p className={styles.sectionLabel}>{departmentsContent.recruitment.eyebrow}</p>
          <h2 className={styles.sectionTitle}>{departmentsContent.recruitment.title}</h2>
          {departmentsContent.recruitment.paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.sectionLead}>
              {paragraph}
            </p>
          ))}
        </header>

        <RecruitmentTimeline tracks={departmentsContent.recruitment.tracks} />
      </div>
    </section>
  );
}
