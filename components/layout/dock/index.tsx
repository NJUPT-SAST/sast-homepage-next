import Image from "next/image";
import styles from "./dock.module.css";

const dockItems = [
  { href: "./", label: "首页" },
  { href: "./about", label: "关于" },
  { href: "./pictures", label: "画廊" },
  { href: "./friends", label: "友链" },
];

export default function Dock() {
  return (
    <header className={styles.dock}>
      <a href="./" className={styles.logoLink} aria-label="返回首页顶部">
        <Image src="/home/branding/logo.png" alt="SAST" width={135} height={55} className={styles.logo} priority />
      </a>

      <nav className={styles.nav} aria-label="页面导航">
        {dockItems.map((item) => (
          <a key={item.href} href={item.href} className={styles.link}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
