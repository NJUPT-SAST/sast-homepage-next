import Image from "next/image";
import HomeCarousel from "@/components/home/carousel";
import { slides } from "@/components/home/data/homepage-data";
import { Backgroud1 } from "@/components/shared";
import styles from "./hero-section.module.css";

export default function HeroSection() {
    return (
        <section className={styles.hero}>
            <Backgroud1 />

            <div className={styles.heroInner}>
                <a href="./" className={styles.logoLink} aria-label="返回首页顶部">
                    <Image src="/share/logos/logo-color.png" alt="SAST" width={135} height={55} className={styles.logo} priority />
                </a>

                <HomeCarousel slides={slides} />

                <div className={styles.heroForegroundScene} aria-hidden>
                    <Image src="/home/branding/cube.png" alt="" width={131} height={131} className={styles.cube} />
                    <Image src="/home/branding/word-1.png" alt="" width={423} height={120} className={styles.word1} />
                </div>
            </div>
        </section>
    );
}
