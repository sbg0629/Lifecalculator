import type { Metadata } from 'next';
import SalaryCalculator from '@/components/SalaryCalculator';
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
  const t = await getTranslations({ locale, namespace: 'salary' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function SalaryPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'salary' });
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          {t('title')}
        </h1>

        <SalaryCalculator />

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {locale === 'ko' ? '연봉 실수령액 계산기 안내' : 'Salary Calculator Guide'}
          </h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            {locale === 'ko' ? (
              <>
                <p>
                  연봉 실수령액 계산기는 연봉을 입력하면 4대보험과 소득세를 제외한 실제 받게 되는 월 실수령액을 
                  계산해드리는 서비스입니다. 이 계산기는 한국의 국민연금, 건강보험, 고용보험, 산재보험 등 4대보험과 
                  소득세, 지방소득세를 기준으로 계산됩니다.
                </p>
                <p>
                  국민연금은 월소득의 4.5%를 본인이 부담하며, 건강보험은 월소득의 3.545%를 본인이 부담합니다. 
                  장기요양보험은 건강보험료의 12.27%가 추가로 부과됩니다. 고용보험은 월소득의 0.9%를 본인이 부담하며, 
                  산재보험은 업종에 따라 차등 적용되지만 일반적으로 0.6%에서 1.7% 사이입니다.
                </p>
                <p>
                  소득세는 근로소득공제를 적용한 후 과세표준에 소득세율을 적용하여 계산됩니다. 근로소득공제는 
                  월소득의 50%를 공제하며, 소득세율은 과세표준에 따라 차등 적용됩니다. 지방소득세는 소득세의 10%를 
                  추가로 부과합니다. 이 계산기는 간소화된 계산 방식으로 실제와 다를 수 있으므로 참고용으로만 
                  사용하시기 바랍니다.
                </p>
                <p>
                  실제 급여에서 공제되는 금액은 각종 세액공제, 추가 공제 항목, 보험료 상한선 등에 따라 달라질 수 
                  있습니다. 정확한 실수령액은 급여명세서를 확인하시거나 회사 인사팀에 문의하시기 바랍니다. 본 계산기는 
                  일반적인 경우를 기준으로 계산되며, 특수한 경우나 최신 법령 변경사항이 반영되지 않을 수 있습니다.
                </p>
              </>
            ) : (
              <>
                <p>
                  The salary calculator calculates your monthly take-home pay after deducting 4 major insurances 
                  and income tax. This calculator is based on Korea's National Pension, Health Insurance, 
                  Employment Insurance, Industrial Accident Insurance, Income Tax, and Local Income Tax.
                </p>
                <p>
                  National Pension is 4.5% of monthly income, Health Insurance is 3.545% of monthly income. 
                  Long-term Care Insurance is an additional 12.27% of health insurance premium. Employment Insurance 
                  is 0.9% of monthly income, and Industrial Accident Insurance varies by industry but is generally 
                  between 0.6% and 1.7%.
                </p>
                <p>
                  Income tax is calculated by applying the income tax rate to the taxable standard after applying 
                  earned income deduction. Earned income deduction is 50% of monthly income, and the income tax rate 
                  varies according to the taxable standard. Local income tax is an additional 10% of income tax. 
                  This calculator uses a simplified calculation method and may differ from actual amounts, so please 
                  use it as a reference only.
                </p>
                <p>
                  The actual amount deducted from your salary may vary depending on various tax deductions, additional 
                  deduction items, and insurance premium caps. For accurate take-home pay, please check your pay stub 
                  or contact your company's HR department. This calculator is based on general cases and may not reflect 
                  special cases or the latest legal changes.
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

