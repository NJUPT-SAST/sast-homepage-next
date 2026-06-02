import Image from "next/image";
import HomeCarousel from "@/components/home/carousel";
import { Backgroud1 } from "@/components/shared";
import homeContent from "@/content/home.json";
import styles from "./hero-section.module.css";

export default function HeroSection() {
    const slideMeta = [
        {
            image: "/home/carousel/slide-1.png",
            imageAlt: "SAST 技术部门",
            imageWidth: 527,
            imageHeight: 433,
            titleColor: "#53A0FD",
            moreColor: "#53A0FD",
        },
        {
            image: "/home/carousel/slide-2.png",
            imageAlt: "SAST 办公部门",
            imageWidth: 566,
            imageHeight: 434,
            titleColor: "#03E5BF",
            moreColor: "#03E5BF",
        },
        {
            image: "/home/carousel/slide-3.png",
            imageAlt: "SAST 管理部门",
            imageWidth: 650,
            imageHeight: 440,
            titleColor: "#27A29C",
            moreColor: "#27A29C",
        },
    ];
    const slides = homeContent.hero.slides.map((slide, index) => ({
        ...slide,
        ...slideMeta[index],
    }));

    return (
        <section className={styles.hero}>
            <Backgroud1 />

            <div className={styles.heroInner}>
                <HomeCarousel slides={slides} />

                <div className={styles.heroForegroundScene} aria-hidden>
                    <Image src="/home/branding/cube.png" alt="" width={131} height={131} className={styles.cube} />
                    <Image src="/home/branding/word-1.png" alt="" width={423} height={120} className={styles.word1} />
                </div>
            </div>
        </section>
    );
}
