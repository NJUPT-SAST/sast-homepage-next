"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./dock.module.css";
import { ActionLink } from "@/components/shared";

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
      <ActionLink href="/" className={styles.desktopLogoLink} aria-label="返回首页">
        <Image src="/share/logos/logo-color.png" alt="SAST" width={135} height={55} className={styles.logo} priority />
      </ActionLink>

      <div className={styles.dock}>
        <ActionLink href="/" className={styles.logoLink} aria-label="返回首页">
          <Image src="/share/logos/logo-color.png" alt="SAST" width={135} height={55} className={styles.logo} priority />
        </ActionLink>

        <nav className={styles.nav} aria-label="主导航">
          {links.map((item) => (
            <ActionLink key={item.href} href={item.href} className={`${styles.link} ${pathname === item.href ? styles.activeLink : ""}`}>
              {item.label}
            </ActionLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
