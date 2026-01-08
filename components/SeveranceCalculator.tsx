'use client';

import { useState } from 'react';

export default function SeveranceCalculator() {
  const [averageWage, setAverageWage] = useState<string>('');
  const [yearsOfService, setYearsOfService] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    try {
      const cleanWage = averageWage.replace(/,/g, '').trim();
      const cleanYears = yearsOfService.trim();
      
      if (!cleanWage) {
        if (typeof window !== 'undefined') {
          alert('올바른 평균임금을 입력해주세요.');
        }
        return;
      }
      
      if (!cleanYears) {
        if (typeof window !== 'undefined') {
          alert('올바른 근속연수를 입력해주세요.');
        }
        return;
      }

      const wage = parseFloat(cleanWage);
      const years = parseFloat(cleanYears);

      if (isNaN(wage) || wage <= 0) {
        if (typeof window !== 'undefined') {
          alert('올바른 평균임금을 입력해주세요.');
        }
        return;
      }

      if (isNaN(years) || years <= 0) {
        if (typeof window !== 'undefined') {
          alert('올바른 근속연수를 입력해주세요.');
        }
        return;
      }

      // 퇴직금 계산 공식: 평균임금 × 30일 × 근속연수
      // 근로기준법 제34조에 따른 계산
      const severancePay = wage * 30 * years;
      setResult(severancePay);
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
          <label htmlFor="wage" className="block text-sm font-medium text-gray-700 mb-2">
            평균임금 (원)
          </label>
          <input
            type="text"
            id="wage"
            value={averageWage}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setAverageWage(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            }}
            placeholder="예: 3,000,000"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
          <p className="mt-2 text-sm text-gray-500">
            최근 3개월간의 평균 임금을 입력하세요
          </p>
        </div>

        <div className="mb-6">
          <label htmlFor="years" className="block text-sm font-medium text-gray-700 mb-2">
            근속연수 (년)
          </label>
          <input
            type="number"
            id="years"
            value={yearsOfService}
            onChange={(e) => setYearsOfService(e.target.value)}
            placeholder="예: 5"
            step="0.1"
            min="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
          <p className="mt-2 text-sm text-gray-500">
            소수점 첫째 자리까지 입력 가능 (예: 3.5년)
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">계산 결과</h2>
          <div className="bg-blue-50 rounded-md p-6">
            <div className="text-center">
              <p className="text-gray-700 mb-2">예상 퇴직금</p>
              <p className="text-4xl font-bold text-blue-600">
                {formatNumber(result)}원
              </p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">
              <strong>계산 공식:</strong> 평균임금 × 30일 × 근속연수
              <br />
              (근로기준법 제34조)
            </p>
          </div>
        </div>
      )}
    </>
  );
}

