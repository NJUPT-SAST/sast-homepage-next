import { DataSection, HeroSection, IntroduceSection } from "@/components/home";
import { Dock, SiteFooter } from "@/components/layout";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <Dock />
      <HeroSection />
      <IntroduceSection />
      <DataSection />
      <SiteFooter />
    </main>
  );
}
