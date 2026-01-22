import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'ko' 
      ? "생활 계산기 - 연봉, 퇴직금, 실업급여, 전기요금, 가스요금 계산"
      : "Life Calculator - Salary, Severance, Unemployment, Electric, Gas Calculator",
    description: locale === 'ko'
      ? "일상생활에 필요한 다양한 계산기를 제공합니다. 연봉 실수령액, 퇴직금, 실업급여, 전기요금, 가스요금을 간편하게 계산해보세요."
      : "Various calculators for daily life. Calculate salary, severance pay, unemployment benefits, electric and gas bills easily.",
    verification: {
      google: "nVJ0KNugUqS7bVCDM1PL7b59PLleTyAO7snrjJG4nSg",
    },
    other: {
      "google-adsense-account": "ca-pub-8454472618579434",
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </NextIntlClientProvider>
  );
}

