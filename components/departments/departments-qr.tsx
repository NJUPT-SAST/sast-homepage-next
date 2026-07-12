import Image, { type ImageProps } from "next/image";
import { type CSSProperties } from "react";
import styles from "./departments-qr.module.css";

type DepartmentsQrProps = {
  src?: ImageProps["src"];
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export default function DepartmentsQr({ src, alt, width, height, className }: DepartmentsQrProps) {
  const frameClassName = [styles.frame, className].filter(Boolean).join(" ");
  const frameStyle = {
    "--departments-qr-aspect-ratio": `${width} / ${height}`,
  } as CSSProperties;

  if (src) {
    return (
      <div className={[frameClassName, styles.imageFrame].join(" ")} style={frameStyle}>
        <Image src={src} alt={alt} width={width} height={height} className={styles.image} />
      </div>
    );
  }

  return (
    <div className={[frameClassName, styles.placeholder].join(" ")} style={frameStyle} aria-hidden>
      <span className={styles.placeholderText}>QR</span>
    </div>
  );
}
