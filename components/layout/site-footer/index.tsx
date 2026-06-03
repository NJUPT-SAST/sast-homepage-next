import Image from "next/image";
import { ActionLink } from "@/components/shared";
import styles from "./site-footer.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <Image src="/share/logos/logo-white.png" alt="SAST" width={135} height={55} className={styles.footerLogo} />
        <div className={styles.footerDetail}>
          <p>
            <Image src="/share/icons/contact/mail.png" alt="" width={15} height={15} className={styles.footerIcon} />
            <ActionLink href="mailto:njuptsast@163.com" openInNewTab>
              njuptsast@163.com
            </ActionLink>
          </p>
          <p>
            <Image src="/share/icons/contact/address.png" alt="" width={15} height={15} className={styles.footerIcon} />
            南京邮电大学仙林校区大学生活动中心 青柚创新汇101
          </p>
        </div>
        <div className={styles.footerDivider} />
        <div className={styles.footerQr}>
          <Image src="/share/qr/qq-qrcode.png" alt="QQ 群二维码" width={104} height={104} className={styles.qrImage} />
          <p className={styles.qrRemark}>SAST 官方QQ</p>
        </div>
        <p className={styles.copyright}>Copyright © NJUPT.SAST 1992-2026</p>
      </div>
    </footer>
  );
}
