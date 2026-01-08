'use client';

import { useState } from 'react';

export default function GasCalculator() {
  const [usage, setUsage] = useState<string>('');
  const [result, setResult] = useState<{
    basicCharge: number;
    usageCharge: number;
    vat: number;
    total: number;
  } | null>(null);

  const calculate = () => {
    try {
      const cleanValue = usage.replace(/,/g, '').trim();
      if (!cleanValue) {
        if (typeof window !== 'undefined') {
          alert('올바른 사용량을 입력해주세요.');
        }
        return;
      }
      
      const m3 = parseFloat(cleanValue);

      if (isNaN(m3) || m3 <= 0) {
        if (typeof window !== 'undefined') {
          alert('올바른 사용량을 입력해주세요.');
        }
        return;
      }

      // 주택용 도시가스 요금 계산 (2024년 기준)
      let basicCharge = 0;
      if (m3 <= 20) {
        basicCharge = 1200;
      } else if (m3 <= 100) {
        basicCharge = 2400;
      } else if (m3 <= 500) {
        basicCharge = 4800;
      } else {
        basicCharge = 9600;
      }

      let usageCharge = 0;
      if (m3 <= 20) {
        usageCharge = m3 * 730.0;
      } else if (m3 <= 100) {
        usageCharge = 20 * 730.0 + (m3 - 20) * 850.0;
      } else if (m3 <= 500) {
        usageCharge = 20 * 730.0 + 80 * 850.0 + (m3 - 100) * 1020.0;
      } else {
        usageCharge = 20 * 730.0 + 80 * 850.0 + 400 * 1020.0 + (m3 - 500) * 1200.0;
      }

      // 부가가치세 (VAT): 기본료 + 사용료의 10%
      const vat = Math.floor((basicCharge + usageCharge) * 0.1);
      
      const total = basicCharge + usageCharge + vat;

      setResult({
        basicCharge,
        usageCharge,
        vat,
        total,
      });
    } catch (error) {
      console.error('계산 중 오류 발생:', error);
      if (typeof window !== 'undefined') {
        alert('계산 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  const formatNumber = (num: number) => {
    if (isNaN(num) || !isFinite(num)) {
      return '0';
    }
    try {
      return Math.round(num).toLocaleString('ko-KR');
    } catch {
      return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="mb-6">
          <label htmlFor="usage" className="block text-sm font-medium text-gray-700 mb-2">
            사용량 (m³)
          </label>
          <input
            type="text"
            id="usage"
            value={usage}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.]/g, '');
              setUsage(value);
            }}
            placeholder="예: 25"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
          <p className="mt-2 text-sm text-gray-500">
            가스 사용량을 m³ 단위로 입력하세요
          </p>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium text-lg"
        >
          계산하기
        </button>
      </div>

      {result !== null && (
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">계산 결과</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">기본료</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatNumber(result.basicCharge)}원
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">사용료</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatNumber(result.usageCharge)}원
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">부가가치세 (VAT)</span>
              <span className="text-gray-900">
                {formatNumber(result.vat)}원
              </span>
            </div>
            <div className="bg-blue-50 rounded-md p-6 mt-4">
              <div className="text-center">
                <p className="text-gray-700 mb-2">예상 가스요금</p>
                <p className="text-4xl font-bold text-blue-600">
                  {formatNumber(result.total)}원
                </p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600 mb-2">
                <strong>사용료 구간:</strong>
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>20m³ 이하: m³당 730원</li>
                <li>21~100m³: m³당 850원</li>
                <li>101~500m³: m³당 1,020원</li>
                <li>501m³ 이상: m³당 1,200원</li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">
                <strong>참고:</strong> 주택용 도시가스 기준으로 계산되었습니다. 실제 요금은 지역, 가스회사, 사용 패턴 등에 따라 달라질 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
