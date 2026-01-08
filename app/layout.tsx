import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "생활 계산기 - 연봉, 퇴직금, 실업급여, 전기요금, 가스요금 계산",
  description: "일상생활에 필요한 다양한 계산기를 제공합니다. 연봉 실수령액, 퇴직금, 실업급여, 전기요금, 가스요금을 간편하게 계산해보세요.",
  verification: {
    google: "nVJ0KNugUqS7bVCDM1PL7b59PLleTyAO7snrjJG4nSg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
