import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAST Homepage",
  description: "A modern SAST homepage inspired by the original SAST-HomePage project.",
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
