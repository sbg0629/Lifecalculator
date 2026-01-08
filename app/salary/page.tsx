import type { Metadata } from 'next';
import SalaryCalculator from '@/components/SalaryCalculator';

export const metadata: Metadata = {
  title: '연봉 실수령액 계산기 - 생활 계산기',
  description: '연봉을 입력하면 4대보험과 소득세를 제외한 실제 받게 되는 월 실수령액을 계산해드립니다. 국민연금, 건강보험, 고용보험, 산재보험, 소득세, 지방소득세를 자동으로 계산하여 정확한 실수령액을 확인하세요.',
};

export default function SalaryPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          연봉 실수령액 계산기
        </h1>

        <SalaryCalculator />

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">연봉 실수령액 계산기 안내</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
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
          </div>
        </div>

        <div className="ad-placeholder bg-gray-200 rounded-lg p-8 text-center text-gray-500 mb-8">
          광고 영역
        </div>
      </div>
    </div>
  );
}

