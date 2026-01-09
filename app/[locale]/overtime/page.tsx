import type { Metadata } from 'next';
import OvertimeCalculator from '@/components/OvertimeCalculator';
import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'overtime' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function OvertimePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'overtime' });
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          {t('title')}
        </h1>

        <OvertimeCalculator />

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 transition-colors">
            {locale === 'ko' ? '야근수당 계산기 안내' : 'Overtime Pay Calculator Guide'}
          </h2>
          <div className="prose max-w-none text-gray-700 dark:text-gray-300 space-y-4 transition-colors">
            {locale === 'ko' ? (
              <p>
                야근수당 계산기는 야근수당을 계산해드리는 서비스입니다. (2026년 기준, 근로기준법)
              </p>
            ) : (
              <p>
                The overtime pay calculator calculates overtime pay. (2026 standard, Labor Standards Act)
              </p>
            )}
          </div>
        </div>

        <div className="ad-placeholder bg-gray-200 dark:bg-gray-700 rounded-lg p-8 text-center text-gray-500 dark:text-gray-400 mb-8 transition-colors">
          {locale === 'ko' ? '광고 영역' : 'Advertisement'}
        </div>
      </div>
    </div>
  );
}

