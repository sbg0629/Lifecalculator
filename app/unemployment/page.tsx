import type { Metadata } from 'next';
import UnemploymentCalculator from '@/components/UnemploymentCalculator';

export const metadata: Metadata = {
  title: '실업급여 계산기 - 생활 계산기',
  description: '평균임금과 근속기간을 입력하면 예상 실업급여를 계산해드립니다. 고용보험법에 따른 실업급여 수급액과 수급기간을 확인하세요.',
};

export default function UnemploymentPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          실업급여 계산기
        </h1>

        <UnemploymentCalculator />

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">실업급여 계산기 안내</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
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
          </div>
        </div>

        <div className="ad-placeholder bg-gray-200 rounded-lg p-8 text-center text-gray-500 mb-8">
          광고 영역
        </div>
      </div>
    </div>
  );
}

