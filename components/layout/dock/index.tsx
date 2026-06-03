"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./dock.module.css";

const links = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于" },
  { href: "/activities", label: "活动" },
  { href: "/departments", label: "部门" },
];

export default function Dock() {
  const pathname = usePathname();

  return (
    <header className={styles.dockShell}>
      <Link href="/" className={styles.desktopLogoLink} aria-label="返回首页">
        <Image src="/share/logos/logo-color.png" alt="SAST" width={135} height={55} className={styles.logo} priority />
      </Link>

      <div className={styles.dock}>
        <Link href="/" className={styles.logoLink} aria-label="返回首页">
          <Image src="/share/logos/logo-color.png" alt="SAST" width={135} height={55} className={styles.logo} priority />
        </Link>

        <nav className={styles.nav} aria-label="主导航">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className={`${styles.link} ${pathname === item.href ? styles.activeLink : ""}`}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
