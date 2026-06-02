import { Dock, SiteFooter } from "@/components/layout";
import { NotFoundSection } from "@/components/not-found";
import styles from "@/app/page.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <Dock />
      <NotFoundSection />
      <SiteFooter />
    </main>
  );
}
