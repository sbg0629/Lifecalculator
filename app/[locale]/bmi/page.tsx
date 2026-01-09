import type { Metadata } from 'next';
import BMICalculator from '@/components/BMICalculator';
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
  const t = await getTranslations({ locale, namespace: 'bmi' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function BMIPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'bmi' });
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          {t('title')}
        </h1>

        <BMICalculator />

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 transition-colors">
            {locale === 'ko' ? 'BMI 계산기 안내' : 'BMI Calculator Guide'}
          </h2>
          <div className="prose max-w-none text-gray-700 dark:text-gray-300 space-y-4 transition-colors">
            {locale === 'ko' ? (
              <>
                <p>
                  BMI (Body Mass Index)는 체중과 키를 이용하여 계산하는 체질량지수입니다. 비만도를 간단하게 판단할 수 있는 지표입니다.
                </p>
                <p>
                  BMI = 체중(kg) ÷ 키(m)²
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>저체중:</strong> BMI &lt; 18.5</li>
                  <li><strong>정상:</strong> 18.5 ≤ BMI &lt; 23</li>
                  <li><strong>과체중:</strong> 23 ≤ BMI &lt; 25</li>
                  <li><strong>비만:</strong> BMI ≥ 25</li>
                </ul>
              </>
            ) : (
              <>
                <p>
                  BMI (Body Mass Index) is a body mass index calculated using weight and height. It is an indicator to simply judge obesity.
                </p>
                <p>
                  BMI = Weight(kg) ÷ Height(m)²
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Underweight:</strong> BMI &lt; 18.5</li>
                  <li><strong>Normal:</strong> 18.5 ≤ BMI &lt; 23</li>
                  <li><strong>Overweight:</strong> 23 ≤ BMI &lt; 25</li>
                  <li><strong>Obese:</strong> BMI ≥ 25</li>
                </ul>
              </>
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

