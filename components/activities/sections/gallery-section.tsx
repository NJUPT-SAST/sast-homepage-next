import Image from "next/image";
import { Backgroud2 } from "@/components/shared";
import activitiesContent from "@/content/activities.json";
import styles from "./gallery-section.module.css";

export default function ActivitiesGallerySection() {
  return (
    <section className={styles.gallerySection} id="gallery">
      <Backgroud2 />

      <div className={styles.galleryInner}>
        <header className={styles.galleryHeader}>
          <p className={styles.sectionLabel}>{activitiesContent.gallerySection.eyebrow}</p>
          <h2 className={styles.sectionTitle}>{activitiesContent.gallerySection.title}</h2>
          <p className={styles.sectionLead}>{activitiesContent.gallerySection.intro}</p>
        </header>

        <div className={styles.galleryGrid}>
          {activitiesContent.gallerySection.shots.map((shot) => (
            <figure key={`${shot.title}-${shot.caption}`} className={styles.galleryTile}>
              <div className={styles.imageFrame}>
                <Image src={shot.image} alt={shot.title} width={1200} height={900} className={styles.galleryImage} />
                <figcaption className={styles.tileCaption}>
                  <span className={styles.tileTitle}>{shot.title}</span>
                  <span className={styles.tileNote}>{shot.caption}</span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
