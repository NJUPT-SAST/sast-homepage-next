import Image from "next/image";
import styles from "./site-footer.module.css";

const footerQrItems = [
  {
    src: "/share/qr/qq-qrcode.png",
    alt: "SAST 官方QQ",
    remark: "SAST 官方QQ",
  },
  {
    src: "/share/qr/sast-26-qrcode.png",
    alt: "SAST 2026招新群",
    remark: "SAST 2026招新群",
  },
];

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <Image src="/share/logos/logo-white.png" alt="SAST" width={135} height={78} className={styles.footerLogo} style={{ height: "auto" }} />
        <div className={styles.footerDetail}>
          <p>
            <Image src="/share/icons/contact/mail.png" alt="" width={15} height={15} className={styles.footerIcon} />
            <a href="mailto:njuptsast@163.com">njuptsast@163.com</a>
          </p>
          <p>
            <Image src="/share/icons/contact/bilibili.png" alt="" width={15} height={15} className={styles.footerIcon} />
            <a href="https://space.bilibili.com/385170291" target="_blank" rel="noopener noreferrer">
              SAST B站官方账号
            </a>
          </p>
          <p>
            <Image src="/share/icons/contact/address.png" alt="" width={15} height={15} className={styles.footerIcon} />
            南京邮电大学仙林校区大学生活动中心 青柚创新汇101
          </p>
        </div>
        <div className={styles.footerDivider} />
        <div className={styles.footerQr}>
          <div className={styles.footerQrList}>
            {footerQrItems.map((item, index) => (
              <div key={`${item.src}-${index}`} className={styles.qrItem}>
                <Image src={item.src} alt={item.alt} width={104} height={104} className={styles.qrImage} />
                <p className={styles.qrRemark}>{item.remark}</p>
              </div>
            ))}
          </div>
        </div>
        <p className={styles.copyright}>Copyright © NJUPT.SAST 1992-2026</p>
      </div>
    </footer>
  );
}
