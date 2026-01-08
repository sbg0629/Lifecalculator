import type { Metadata } from 'next';
import UnemploymentCalculator from '@/components/UnemploymentCalculator';
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
  
  return {
    title: locale === 'ko' 
      ? '실업급여 계산기 - 생활 계산기'
      : 'Unemployment Benefits Calculator - Life Calculator',
    description: locale === 'ko'
      ? '평균임금과 근속기간을 입력하면 예상 실업급여를 계산해드립니다. 고용보험법에 따른 실업급여 수급액과 수급기간을 확인하세요.'
      : 'Calculate your expected unemployment benefits by entering average wage and service period. Check the unemployment benefit amount and payment period according to the Employment Insurance Act.',
  };
}

export default async function UnemploymentPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          {locale === 'ko' ? '실업급여 계산기' : 'Unemployment Benefits Calculator'}
        </h1>

        <UnemploymentCalculator />

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {locale === 'ko' ? '실업급여 계산기 안내' : 'Unemployment Benefits Calculator Guide'}
          </h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            {locale === 'ko' ? (
              <>
                <p>
                  실업급여 계산기는 고용보험법에 따라 평균임금과 근속기간을 기반으로 예상 실업급여를 계산해드리는 서비스입니다. 
                  실업급여는 실직한 근로자가 재취업할 때까지 생활을 유지할 수 있도록 지원하는 제도로, 고용보험에 가입되어 
                  있고 일정 기간 이상 근무한 근로자가 실직할 때 받을 수 있습니다.
                </p>
                <p>
                  실업급여를 받기 위한 자격 요건은 다음과 같습니다. 첫째, 고용보험에 가입되어 있어야 하며, 둘째, 실직 전 
                  18개월 동안 고용보험에 가입되어 있으면서 180일 이상 근무해야 합니다. 셋째, 자발적 퇴직이 아닌 비자발적 
                  실직이어야 하며, 넷째, 재취업 의사와 능력이 있어야 합니다. 마지막으로 실업인정 신청을 해야 합니다.
                </p>
                <p>
                  일일 실업급여액은 일평균임금의 60%로 계산되며, 최소 60,120원에서 최대 66,000원까지 지급됩니다. 일평균임금은 
                  실직 전 3개월간의 평균임금을 30일로 나눈 금액입니다. 수급기간은 근속기간에 따라 달라지며, 180일 이상 1년 미만은 
                  90일, 1년 이상 3년 미만은 120일, 3년 이상 5년 미만은 150일, 5년 이상 10년 미만은 180일, 10년 이상은 240일입니다.
                </p>
                <p>
                  실업급여는 주 1회 이상 고용센터에 출석하여 실업인정을 받아야 지급되며, 재취업 활동을 하지 않거나 거짓 신고를 
                  하면 지급이 중단될 수 있습니다. 본 계산기는 일반적인 경우를 기준으로 계산되며, 실제 실업급여는 각종 수당 포함 
                  여부, 평균임금 산정 방식, 근속기간 계산 방법 등에 따라 달라질 수 있습니다. 정확한 실업급여는 고용센터나 고용노동부에 
                  문의하시기 바랍니다. 또한 최신 법령 변경사항이 반영되지 않을 수 있으므로 참고용으로만 사용하시기 바랍니다.
                </p>
              </>
            ) : (
              <>
                <p>
                  The unemployment benefits calculator calculates expected unemployment benefits based on average wage and 
                  service period according to the Employment Insurance Act. Unemployment benefits are a system to support 
                  unemployed workers to maintain their livelihood until they are reemployed, and workers who are enrolled 
                  in employment insurance and have worked for a certain period can receive it when they become unemployed.
                </p>
                <p>
                  The qualification requirements to receive unemployment benefits are as follows. First, you must be enrolled 
                  in employment insurance. Second, you must have been enrolled in employment insurance for 18 months before 
                  unemployment and worked for more than 180 days. Third, it must be involuntary unemployment, not voluntary 
                  resignation. Fourth, you must have the intention and ability to be reemployed. Finally, you must apply for 
                  unemployment recognition.
                </p>
                <p>
                  The daily unemployment benefit amount is calculated as 60% of the daily average wage, and is paid from a 
                  minimum of 60,120 won to a maximum of 66,000 won. The daily average wage is the average wage for the 3 
                  months before unemployment divided by 30 days. The payment period varies according to the service period: 
                  90 days for 180 days or more but less than 1 year, 120 days for 1 year or more but less than 3 years, 
                  150 days for 3 years or more but less than 5 years, 180 days for 5 years or more but less than 10 years, 
                  and 240 days for 10 years or more.
                </p>
                <p>
                  Unemployment benefits are paid only when you attend the employment center at least once a week to receive 
                  unemployment recognition, and payment may be suspended if you do not engage in reemployment activities or 
                  make false reports. This calculator is calculated based on general cases, and actual unemployment benefits 
                  may vary depending on whether various allowances are included, how average wage is calculated, and how service 
                  period is calculated. For accurate unemployment benefits, please contact the employment center or the Ministry 
                  of Employment and Labor. Also, the latest legal changes may not be reflected, so please use it as a reference only.
                </p>
              </>
            )}
          </div>
        </div>

        <div className="ad-placeholder bg-gray-200 rounded-lg p-8 text-center text-gray-500 mb-8">
          {locale === 'ko' ? '광고 영역' : 'Advertisement'}
        </div>
      </div>
    </div>
  );
}

