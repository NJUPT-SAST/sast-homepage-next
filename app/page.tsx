import { DataSection, HeroSection, IntroduceSection } from "@/components/home";
import { SiteFooter } from "@/components/layout";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <HeroSection />
      <IntroduceSection />
      <DataSection />
      <SiteFooter />
    </main>
  );
}
