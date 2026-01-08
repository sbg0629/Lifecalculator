import type { Metadata } from 'next';
import ElectricCalculator from '@/components/ElectricCalculator';
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
      ? '전기요금 계산기 - 생활 계산기'
      : 'Electric Bill Calculator - Life Calculator',
    description: locale === 'ko'
      ? '전기 사용량을 입력하면 예상 전기요금을 계산해드립니다. 주택용 저압 기준으로 기본요금, 전력량요금, 부가가치세, 전력산업기반기금을 포함한 총 요금을 확인하세요.'
      : 'Calculate your expected electric bill by entering usage amount. Check the total bill including basic charge, energy charge, VAT, and power industry fund based on residential low voltage.',
  };
}

export default async function ElectricPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          {locale === 'ko' ? '전기요금 계산기' : 'Electric Bill Calculator'}
        </h1>

        <ElectricCalculator />

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {locale === 'ko' ? '전기요금 계산기 안내' : 'Electric Bill Calculator Guide'}
          </h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            {locale === 'ko' ? (
              <>
                <p>
                  전기요금 계산기는 주택용 전기 사용량을 입력하면 예상 전기요금을 계산해드리는 서비스입니다. 
                  이 계산기는 한국전력공사의 주택용 저압 전기요금제를 기준으로 계산되며, 기본요금과 전력량요금, 
                  부가가치세, 전력산업기반기금을 포함합니다.
                </p>
                <p>
                  전기요금은 기본요금과 전력량요금으로 구성됩니다. 기본요금은 사용량에 따라 구간별로 차등 적용되며, 
                  200kWh 이하는 910원, 200kWh 초과 400kWh 이하는 1,600원, 400kWh 초과는 7,300원입니다. 전력량요금은 
                  사용량에 따라 구간별로 차등 적용되며, 200kWh 이하는 kWh당 120.7원, 200kWh 초과 400kWh 이하는 
                  kWh당 214.6원, 400kWh 초과는 kWh당 307.3원입니다.
                </p>
                <p>
                  전기요금에는 부가가치세 10%와 전력산업기반기금 3.7%가 추가로 부과됩니다. 부가가치세는 기본요금과 
                  전력량요금 합계에 대해 부과되며, 전력산업기반기금도 동일하게 부과됩니다. 따라서 실제 전기요금은 
                  기본요금과 전력량요금의 합계에 13.7%를 추가한 금액입니다.
                </p>
                <p>
                  본 계산기는 주택용 저압 기준으로 계산되며, 실제 전기요금은 계약 전력, 사용 패턴, 계절별 요금제, 
                  시간대별 요금제 등에 따라 달라질 수 있습니다. 또한 전기요금제는 정기적으로 변경될 수 있으므로 
                  최신 요금제를 확인하시기 바랍니다. 정확한 전기요금은 한국전력공사에 문의하시거나 전기요금 고지서를 
                  확인하시기 바랍니다. 본 계산기는 참고용으로만 사용하시기 바랍니다.
                </p>
              </>
            ) : (
              <>
                <p>
                  The electric bill calculator calculates your expected electric bill by entering residential electricity 
                  usage. This calculator is based on Korea Electric Power Corporation's residential low voltage electricity 
                  rate system and includes basic charge, energy charge, VAT, and power industry fund.
                </p>
                <p>
                  Electric bills consist of basic charge and energy charge. Basic charge is applied differentially by section 
                  according to usage: 910 won for 200kWh or less, 1,600 won for over 200kWh to 400kWh, and 7,300 won for 
                  over 400kWh. Energy charge is applied differentially by section according to usage: 120.7 won per kWh for 
                  200kWh or less, 214.6 won per kWh for over 200kWh to 400kWh, and 307.3 won per kWh for over 400kWh.
                </p>
                <p>
                  Electric bills include an additional 10% VAT and 3.7% power industry fund. VAT is imposed on the sum of 
                  basic charge and energy charge, and the power industry fund is also imposed in the same way. Therefore, the 
                  actual electric bill is the sum of basic charge and energy charge plus 13.7%.
                </p>
                <p>
                  This calculator is calculated based on residential low voltage, and actual electric bills may vary depending 
                  on contract power, usage patterns, seasonal rate systems, time-based rate systems, etc. Also, electricity 
                  rate systems may change regularly, so please check the latest rate system. For accurate electric bills, please 
                  contact Korea Electric Power Corporation or check your electric bill statement. This calculator is for reference only.
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

