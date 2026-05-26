import Image from "next/image";
import HomeCarousel from "@/components/home-carousel";
import { slides } from "@/components/home/homepage-data";
import styles from "./hero-section.module.css";

export default function HeroSection() {
    return (
        <section className={styles.hero}>
            <div className={styles.heroBackground} aria-hidden>
                <div className={styles.heroBackgroundScene}>
                    <Image src="/home/backgrounds/hero/rectangle-1.png" alt="" width={510} height={638} className={`${styles.shape} ${styles.rectangle1}`} />
                    <Image src="/home/backgrounds/hero/rectangle-2.png" alt="" width={275} height={275} className={`${styles.shape} ${styles.rectangle2}`} />
                    <Image src="/home/backgrounds/hero/rectangle-3.png" alt="" width={485} height={362} className={`${styles.shape} ${styles.rectangle3}`} />
                    <Image src="/home/backgrounds/hero/rectangle-4.png" alt="" width={180} height={80} className={`${styles.shape} ${styles.rectangle4}`} />
                    <Image src="/home/backgrounds/hero/rectangle-5.png" alt="" width={264} height={120} className={`${styles.shape} ${styles.rectangle5}`} />
                    <Image src="/home/backgrounds/hero/rectangle-6.png" alt="" width={542} height={442} className={`${styles.shape} ${styles.rectangle6}`} />
                </div>
            </div>

            <div className={styles.heroInner}>
                <HomeCarousel slides={slides} />

                <div className={styles.heroForegroundScene} aria-hidden>
                    <Image src="/home/branding/logo.png" alt="SAST" width={135} height={55} className={styles.logo} priority />
                    <Image src="/home/branding/cube.png" alt="" width={131} height={131} className={styles.cube} />
                    <Image src="/home/branding/word-1.png" alt="" width={423} height={120} className={styles.word1} />
                </div>
            </div>
        </section>
    );
}
