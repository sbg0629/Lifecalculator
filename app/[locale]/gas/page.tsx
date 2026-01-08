import type { Metadata } from 'next';
import GasCalculator from '@/components/GasCalculator';
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
      ? '가스요금 계산기 - 생활 계산기'
      : 'Gas Bill Calculator - Life Calculator',
    description: locale === 'ko'
      ? '가스 사용량을 입력하면 예상 가스요금을 계산해드립니다. 주택용 도시가스 기준으로 기본요금, 사용량요금, 부가가치세를 포함한 총 요금을 확인하세요.'
      : 'Calculate your expected gas bill by entering usage amount. Check the total bill including basic charge, usage charge, and VAT based on residential city gas.',
  };
}

export default async function GasPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          {locale === 'ko' ? '가스요금 계산기' : 'Gas Bill Calculator'}
        </h1>

        <GasCalculator />

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {locale === 'ko' ? '가스요금 계산기 안내' : 'Gas Bill Calculator Guide'}
          </h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            {locale === 'ko' ? (
              <>
                <p>
                  가스요금 계산기는 주택용 가스 사용량을 입력하면 예상 가스요금을 계산해드리는 서비스입니다. 
                  이 계산기는 주택용 도시가스 요금제를 기준으로 계산되며, 기본요금과 사용량요금, 부가가치세를 포함합니다.
                </p>
                <p>
                  가스요금은 기본요금과 사용량요금으로 구성됩니다. 기본요금은 사용량에 따라 구간별로 차등 적용되며, 
                  20m³ 이하는 1,200원, 20m³ 초과 100m³ 이하는 2,400원, 100m³ 초과 500m³ 이하는 4,800원, 
                  500m³ 초과는 9,600원입니다. 사용량요금은 사용량에 따라 구간별로 차등 적용되며, 20m³ 이하는 
                  m³당 730.0원, 20m³ 초과 100m³ 이하는 m³당 850.0원, 100m³ 초과 500m³ 이하는 m³당 1,020.0원, 
                  500m³ 초과는 m³당 1,200.0원입니다.
                </p>
                <p>
                  가스요금에는 부가가치세 10%가 추가로 부과됩니다. 부가가치세는 기본요금과 사용량요금 합계에 대해 
                  부과됩니다. 따라서 실제 가스요금은 기본요금과 사용량요금의 합계에 10%를 추가한 금액입니다.
                </p>
                <p>
                  본 계산기는 주택용 도시가스 기준으로 계산되며, 실제 가스요금은 지역, 가스회사, 사용 패턴, 계절별 
                  요금제 등에 따라 달라질 수 있습니다. 또한 가스요금제는 정기적으로 변경될 수 있으므로 최신 요금제를 
                  확인하시기 바랍니다. 정확한 가스요금은 해당 지역 가스회사에 문의하시거나 가스요금 고지서를 확인하시기 
                  바랍니다. 본 계산기는 참고용으로만 사용하시기 바랍니다.
                </p>
              </>
            ) : (
              <>
                <p>
                  The gas bill calculator calculates your expected gas bill by entering residential gas usage. 
                  This calculator is based on residential city gas rate system and includes basic charge, usage charge, and VAT.
                </p>
                <p>
                  Gas bills consist of basic charge and usage charge. Basic charge is applied differentially by section 
                  according to usage: 1,200 won for 20m³ or less, 2,400 won for over 20m³ to 100m³, 4,800 won for over 
                  100m³ to 500m³, and 9,600 won for over 500m³. Usage charge is applied differentially by section according 
                  to usage: 730.0 won per m³ for 20m³ or less, 850.0 won per m³ for over 20m³ to 100m³, 1,020.0 won per m³ 
                  for over 100m³ to 500m³, and 1,200.0 won per m³ for over 500m³.
                </p>
                <p>
                  Gas bills include an additional 10% VAT. VAT is imposed on the sum of basic charge and usage charge. 
                  Therefore, the actual gas bill is the sum of basic charge and usage charge plus 10%.
                </p>
                <p>
                  This calculator is calculated based on residential city gas, and actual gas bills may vary depending on 
                  region, gas company, usage patterns, seasonal rate systems, etc. Also, gas rate systems may change regularly, 
                  so please check the latest rate system. For accurate gas bills, please contact the local gas company or check 
                  your gas bill statement. This calculator is for reference only.
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

