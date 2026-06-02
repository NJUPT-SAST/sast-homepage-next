import { ActivitiesGallerySection, ActivitiesRecentSection } from "@/components/activities";
import styles from "./page.module.css";

export default function Activities() {
  return (
    <main className={styles.page}>
      <ActivitiesRecentSection />
      <ActivitiesGallerySection />
    </main>
  );
}
