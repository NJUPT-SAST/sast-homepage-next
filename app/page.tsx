import HeroSection from "@/components/home/hero-section";
import IntroduceSection from "@/components/home/introduce-section";
import DataSection from "@/components/home/data-section";
import PeopleSection from "@/components/home/people-section";
import SiteFooter from "@/components/home/site-footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <HeroSection />
      <IntroduceSection />
      <DataSection />
      <PeopleSection />
      <SiteFooter />
    </main>
  );
}
