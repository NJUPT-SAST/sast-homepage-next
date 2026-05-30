import Image from "next/image";
import styles from "./dock.module.css";

const links = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于" },
  { href: "/1", label: "项目" },
  { href: "/2", label: "博客" },
];

export default function Dock() {
  return (
    <header className={styles.dockShell}>
      <a href="./" className={styles.desktopLogoLink} aria-label="返回首页">
        <Image src="/share/logos/logo-color.png" alt="SAST" width={135} height={55} className={styles.logo} priority />
      </a>

      <div className={styles.dock}>
        <a href="./" className={styles.logoLink} aria-label="返回首页">
          <Image src="/share/logos/logo-color.png" alt="SAST" width={135} height={55} className={styles.logo} priority />
        </a>

        <nav className={styles.nav} aria-label="主导航">
          {links.map((item) => (
            <a key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
