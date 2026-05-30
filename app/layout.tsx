import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAST",
  description: "南京邮电大学大学生科学技术协会",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
