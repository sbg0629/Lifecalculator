import type { Metadata } from 'next';
import BabyDaysCalculator from '@/components/BabyDaysCalculator';
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
  const t = await getTranslations({ locale, namespace: 'babyDays' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function BabyDaysPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'babyDays' });
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          {t('title')}
        </h1>

        <BabyDaysCalculator />

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 transition-colors">
            {locale === 'ko' ? '아기 태어난지 계산기 안내' : 'Baby Age Calculator Guide'}
          </h2>
          <div className="prose max-w-none text-gray-700 dark:text-gray-300 space-y-4 transition-colors">
            {locale === 'ko' ? (
              <>
                <p>
                  아기 태어난지 계산기는 아기의 출생일을 입력하면 태어난지 며칠째인지, 몇 주, 몇 개월, 몇 살인지를
                  계산해드리는 서비스입니다. 아기의 성장을 추적하고 기념일을 확인하는 데 도움이 됩니다.
                </p>
                <p>
                  이 계산기는 다음과 같은 정보를 제공합니다:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>일수:</strong> 태어난지 며칠째인지 계산</li>
                  <li><strong>주수:</strong> 태어난지 몇 주째인지 계산</li>
                  <li><strong>개월수:</strong> 태어난지 몇 개월째인지 계산 (대략적)</li>
                  <li><strong>년수:</strong> 태어난지 몇 살인지 계산</li>
                  <li><strong>100일:</strong> 한국의 전통적인 기념일인 100일 날짜</li>
                  <li><strong>다음 생일:</strong> 다음 생일이 언제인지 계산</li>
                </ul>
                <p>
                  계산은 출생일을 기준으로 오늘까지의 기간을 계산하며, 일수, 주수, 개월수, 년수를 모두 표시합니다.
                  아기의 성장 단계에 따라 가장 적합한 표현 방식으로 표시됩니다.
                </p>
                <p>
                  개월수와 년수는 대략적인 값이며, 실제 나이는 생년월일을 기준으로 계산됩니다.
                  정확한 나이는 생년월일을 기준으로 계산하시기 바랍니다.
                </p>
              </>
            ) : (
              <>
                <p>
                  The baby age calculator calculates how many days, weeks, months, and years old your baby is by 
                  entering the birth date. It helps track your baby's growth and check milestones.
                </p>
                <p>
                  This calculator provides the following information:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Days:</strong> Calculate how many days old</li>
                  <li><strong>Weeks:</strong> Calculate how many weeks old</li>
                  <li><strong>Months:</strong> Calculate how many months old (approximate)</li>
                  <li><strong>Years:</strong> Calculate how old in years</li>
                  <li><strong>100 Days:</strong> Traditional Korean milestone date</li>
                  <li><strong>Next Birthday:</strong> Calculate when the next birthday is</li>
                </ul>
                <p>
                  The calculation calculates the period from the birth date to today and displays days, weeks, 
                  months, and years. It displays in the most appropriate format according to the baby's growth stage.
                </p>
                <p>
                  Months and years are approximate values, and the actual age is calculated based on the birth date.
                  Please calculate the exact age based on the birth date.
                </p>
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


