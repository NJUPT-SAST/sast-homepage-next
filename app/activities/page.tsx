import { ActivitiesGallerySection, ActivitiesRecentSection } from "@/components/activities";
import { Dock, SiteFooter } from "@/components/layout";
import styles from "./page.module.css";

export default function Activities() {
  return (
    <main className={styles.page}>
      <Dock />
      <ActivitiesRecentSection />
      <ActivitiesGallerySection />
      <SiteFooter />
    </main>
  );
}
