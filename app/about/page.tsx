import { AboutActivitiesSection, AboutHeroSection, AboutStructureSection } from "@/components/about";
import styles from "./page.module.css";

export default function About() {
  return (
    <main className={styles.page}>
      <AboutHeroSection />
      <AboutActivitiesSection />
      <AboutStructureSection />
    </main>
  );
}
