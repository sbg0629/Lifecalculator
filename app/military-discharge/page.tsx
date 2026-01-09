import type { Metadata } from 'next';
import MilitaryDischargeCalculator from '@/components/MilitaryDischargeCalculator';

export const metadata: Metadata = {
  title: '전역일 계산기 - 생활 계산기',
  description: '입대일과 군종을 입력하면 예상 전역일과 복무 진행률을 계산해드립니다. 육군, 해군, 공군, 해병대의 복무기간을 자동으로 계산합니다.',
};

export default function MilitaryDischargePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          전역일 계산기
        </h1>

        <MilitaryDischargeCalculator />

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">전역일 계산기 안내</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
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
          </div>
        </div>

        <div className="ad-placeholder bg-gray-200 rounded-lg p-8 text-center text-gray-500 mb-8">
          광고 영역
        </div>
      </div>
    </div>
  );
}


