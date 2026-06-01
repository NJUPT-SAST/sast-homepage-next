import departmentsContent from "@/content/departments.json";
import styles from "./contact-section.module.css";

export default function DepartmentsContactSection() {
  return (
    <section className={styles.contactSection}>
      <div className={styles.contactInner}>
        <header className={styles.contactHeader}>
          <p className={styles.sectionLabel}>{departmentsContent.contact.eyebrow}</p>
          <h2 className={styles.sectionTitle}>{departmentsContent.contact.title}</h2>
          {departmentsContent.contact.paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.sectionLead}>
              {paragraph}
            </p>
          ))}
        </header>

        <div className={styles.placeholderCard}>
          <div className={styles.qrPlaceholder} aria-hidden>
            <span className={styles.placeholderText}>QR</span>
          </div>

          <div className={styles.placeholderCopy}>
            <h3 className={styles.placeholderTitle}>{departmentsContent.contact.placeholder.title}</h3>
            {departmentsContent.contact.placeholder.text.map((text) => (
              <p key={text} className={styles.placeholderBody}>
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
