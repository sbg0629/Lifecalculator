import type { Metadata } from 'next';
import GasCalculator from '@/components/GasCalculator';

export const metadata: Metadata = {
  title: '가스요금 계산기 - 생활 계산기',
  description: '가스 사용량을 입력하면 예상 가스요금을 계산해드립니다. 주택용 도시가스 기준으로 기본요금, 사용량요금, 부가가치세를 포함한 총 요금을 확인하세요.',
};

export default function GasPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          가스요금 계산기
        </h1>

        <GasCalculator />

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">가스요금 계산기 안내</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
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
          </div>
        </div>

        <div className="ad-placeholder bg-gray-200 rounded-lg p-8 text-center text-gray-500 mb-8">
          광고 영역
        </div>
      </div>
    </div>
  );
}

