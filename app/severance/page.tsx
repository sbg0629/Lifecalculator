import type { Metadata } from 'next';
import SeveranceCalculator from '@/components/SeveranceCalculator';

export const metadata: Metadata = {
  title: '퇴직금 계산기 - 생활 계산기',
  description: '평균임금과 근속연수를 입력하면 예상 퇴직금을 계산해드립니다. 근로기준법에 따른 퇴직금 계산 공식을 사용하여 정확한 퇴직금을 확인하세요.',
};

export default function SeverancePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          퇴직금 계산기
        </h1>

        <SeveranceCalculator />

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">퇴직금 계산기 안내</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              퇴직금 계산기는 근로기준법에 따라 평균임금과 근속연수를 기반으로 예상 퇴직금을 산출하는 서비스입니다. 
              퇴직금은 1년 이상 근무한 근로자가 퇴직할 때 받을 수 있는 금전적 보상으로, 근로자의 권익을 보호하기 
              위한 제도입니다.
            </p>
            <p>
              퇴직금 계산 공식은 '평균임금 × 30일 × 근속연수'입니다. 평균임금은 퇴직일 이전 3개월간의 임금 총액을 
              그 기간의 총 일수로 나눈 금액을 의미합니다. 여기에는 기본급, 각종 수당, 상여금 등이 포함되며, 퇴직금 
              자체는 평균임금 계산에서 제외됩니다. 근속연수는 입사일부터 퇴직일까지의 기간을 계산하며, 1년 미만의 
              기간도 소수점으로 계산할 수 있습니다.
            </p>
            <p>
              퇴직금을 받을 수 있는 자격 요건은 1년 이상 계속 근무한 근로자입니다. 다만, 사용자의 귀책사유로 인한 
              퇴직의 경우 1년 미만이라도 퇴직금을 받을 수 있습니다. 퇴직금은 퇴직일로부터 14일 이내에 지급되어야 
              하며, 지연 시 가산금이 발생할 수 있습니다.
            </p>
            <p>
              본 계산기는 일반적인 경우를 기준으로 계산되며, 실제 퇴직금은 각종 수당 포함 여부, 평균임금 산정 방식, 
              근속연수 계산 방법 등에 따라 달라질 수 있습니다. 정확한 퇴직금은 회사 인사팀이나 고용노동부에 문의하시기 
              바랍니다. 또한 최신 법령 변경사항이 반영되지 않을 수 있으므로 참고용으로만 사용하시기 바랍니다.
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

