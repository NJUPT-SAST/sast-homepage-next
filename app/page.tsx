import { DataSection, HeroSection, IntroduceSection } from "@/components/home";
import styles from "@/app/page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <HeroSection />
      <IntroduceSection />
      <DataSection />
    </main>
  );
}
