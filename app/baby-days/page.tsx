import type { Metadata } from 'next';
import BabyDaysCalculator from '@/components/BabyDaysCalculator';

export const metadata: Metadata = {
  title: '아기 태어난지 계산기 - 생활 계산기',
  description: '아기의 출생일을 입력하면 태어난지 며칠째인지, 몇 주, 몇 개월, 몇 살인지 계산해드립니다. 100일과 다음 생일도 함께 확인할 수 있습니다.',
};

export default function BabyDaysPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          아기 태어난지 계산기
        </h1>

        <BabyDaysCalculator />

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">아기 태어난지 계산기 안내</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              아기 태어난지 계산기는 아기의 출생일을 입력하면 태어난지 며칠째인지, 몇 주, 몇 개월, 몇 살인지를
              계산해드리는 서비스입니다. 아기의 성장을 추적하고 기념일을 확인하는 데 도움이 됩니다.
            </p>
            <p>
              이 계산기는 다음과 같은 정보를 제공합니다:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>일수:</strong> 태어난지 며칠째인지 계산</li>
              <li><strong>주수:</strong> 태어난지 몇 주째인지 계산</li>
              <li><strong>개월수:</strong> 태어난지 몇 개월째인지 계산 (대략적)</li>
              <li><strong>년수:</strong> 태어난지 몇 살인지 계산</li>
              <li><strong>100일:</strong> 한국의 전통적인 기념일인 100일 날짜</li>
              <li><strong>다음 생일:</strong> 다음 생일이 언제인지 계산</li>
            </ul>
            <p>
              계산은 출생일을 기준으로 오늘까지의 기간을 계산하며, 일수, 주수, 개월수, 년수를 모두 표시합니다.
              아기의 성장 단계에 따라 가장 적합한 표현 방식으로 표시됩니다.
            </p>
            <p>
              개월수와 년수는 대략적인 값이며, 실제 나이는 생년월일을 기준으로 계산됩니다.
              정확한 나이는 생년월일을 기준으로 계산하시기 바랍니다.
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


