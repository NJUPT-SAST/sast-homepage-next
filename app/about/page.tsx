import { AboutHeroSection, AboutSnapshotSection, AboutStorySection } from "@/components/about";
import { Dock, SiteFooter } from "@/components/layout";
import styles from "./page.module.css";

export default function About() {
  return (
    <main className={styles.page}>
      <Dock />
      <AboutHeroSection />
      <AboutStorySection />
      <AboutSnapshotSection />
      <SiteFooter />
    </main>
  );
}
