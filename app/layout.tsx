import type { Metadata } from "next";
import { Dock, SiteFooter } from "@/components/layout";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAST-南京邮电大学大学生科学技术协会",
  description: "南京邮电大学大学生科学技术协会",
  icons: [
    { url: "/logo-black-square.ico", media: "(prefers-color-scheme: light)" },
    { url: "/logo-white-square.ico", media: "(prefers-color-scheme: dark)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full scroll-smooth antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">
        <Dock />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
