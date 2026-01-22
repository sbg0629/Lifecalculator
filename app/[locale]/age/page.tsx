import type { Metadata } from 'next';
import AgeCalculator from '@/components/AgeCalculator';
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
  const t = await getTranslations({ locale, namespace: 'age' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function AgePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'age' });
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          {t('title')}
        </h1>

        <AgeCalculator />

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 transition-colors">
            {locale === 'ko' ? '만나이 계산기 안내' : 'Age Calculator Guide'}
          </h2>
          <div className="prose max-w-none text-gray-700 dark:text-gray-300 space-y-4 transition-colors">
            {locale === 'ko' ? (
              <p>
                만나이 계산기는 생년월일을 기준으로 만나이를 계산해드리는 서비스입니다. 생일이 지나야 한 살씩 추가되는 만나이를 정확히 계산합니다.
              </p>
            ) : (
              <p>
                The age calculator calculates your age based on your birth date. It accurately calculates your age, which increases by one year after each birthday.
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

