import {
  DepartmentsContactSection,
  DepartmentsDetailSection,
  DepartmentsHeroSection,
  DepartmentsRecruitmentSection,
} from "@/components/departments";
import { Dock, SiteFooter } from "@/components/layout";
import { Backgroud2 } from "@/components/shared";
import styles from "./page.module.css";

export default function Departments() {
  return (
    <main className={styles.page}>
      <Dock />
      <DepartmentsHeroSection />
      <DepartmentsDetailSection />
      <div className={styles.recruitmentFlow}>
        <Backgroud2 />

        <div className={styles.recruitmentFlowContent}>
          <DepartmentsRecruitmentSection />
          <DepartmentsContactSection />
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
