import type { Metadata } from 'next';
import MilitaryDischargeCalculator from '@/components/MilitaryDischargeCalculator';
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
  const t = await getTranslations({ locale, namespace: 'militaryDischarge' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function MilitaryDischargePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'militaryDischarge' });
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          {t('title')}
        </h1>

        <MilitaryDischargeCalculator />

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 transition-colors">
            {locale === 'ko' ? '전역일 계산기 안내' : 'Military Discharge Date Calculator Guide'}
          </h2>
          <div className="prose max-w-none text-gray-700 dark:text-gray-300 space-y-4 transition-colors">
            {locale === 'ko' ? (
              <>
                <p>
                  전역일 계산기는 입대일과 군종을 입력하면 예상 전역일과 복무 진행률을 계산해드리는 서비스입니다.
                  각 군종별 복무기간에 따라 정확한 전역일을 계산합니다.
                </p>
                <p>
                  <strong>군종별 복무기간:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>육군: 18개월</li>
                  <li>해군: 20개월</li>
                  <li>공군: 21개월</li>
                  <li>해병대: 18개월</li>
                </ul>
                <p>
                  전역일 계산은 입대일로부터 각 군종의 복무기간을 더하여 계산됩니다. 복무한 일수와 남은 일수도 함께 표시되며,
                  복무 진행률을 시각적으로 확인할 수 있습니다.
                </p>
                <p>
                  실제 전역일은 휴가, 병가, 특별휴가 등에 따라 달라질 수 있으므로 참고용으로만 사용하시기 바랍니다.
                  정확한 전역일은 부대에 문의하시기 바랍니다.
                </p>
              </>
            ) : (
              <>
                <p>
                  The military discharge date calculator calculates your expected discharge date and service progress 
                  by entering your enlistment date and branch. It calculates the exact discharge date according to 
                  each branch's service period.
                </p>
                <p>
                  <strong>Service Period by Branch:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Army: 18 months</li>
                  <li>Navy: 20 months</li>
                  <li>Air Force: 21 months</li>
                  <li>Marines: 18 months</li>
                </ul>
                <p>
                  The discharge date is calculated by adding each branch's service period from the enlistment date. 
                  Days served and remaining days are also displayed, and you can visually check the service progress.
                </p>
                <p>
                  The actual discharge date may vary depending on leave, sick leave, special leave, etc., so please 
                  use it as a reference only. For accurate discharge date, please contact your unit.
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


