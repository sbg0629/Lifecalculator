'use client';

import { useState } from 'react';

export default function UnemploymentCalculator() {
  const [averageWage, setAverageWage] = useState<string>('');
  const [yearsOfService, setYearsOfService] = useState<string>('');
  const [result, setResult] = useState<{
    dailyBenefit: number;
    monthlyBenefit: number;
    paymentDays: number;
    totalBenefit: number;
  } | null>(null);

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
          alert('올바른 근속기간을 입력해주세요.');
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
          alert('올바른 근속기간을 입력해주세요.');
        }
        return;
      }

    // 일평균임금 계산 (월평균임금을 30일로 나눔)
    const dailyWage = wage / 30;

    // 일일 실업급여액 계산 (일평균임금의 60%, 최소 60,120원, 최대 66,000원)
    const dailyBenefit = Math.min(Math.max(dailyWage * 0.6, 60120), 66000);

    // 수급기간 계산 (근속기간에 따라)
    let paymentDays = 90;
    if (years >= 10) {
      paymentDays = 240;
    } else if (years >= 5) {
      paymentDays = 180;
    } else if (years >= 3) {
      paymentDays = 150;
    } else if (years >= 1) {
      paymentDays = 120;
    }

    const monthlyBenefit = dailyBenefit * 30;
    const totalBenefit = dailyBenefit * paymentDays;

    setResult({
      dailyBenefit,
      monthlyBenefit,
      paymentDays,
      totalBenefit,
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
            근속기간 (년)
          </label>
          <input
            type="number"
            id="years"
            value={yearsOfService}
            onChange={(e) => setYearsOfService(e.target.value)}
            placeholder="예: 3"
            step="0.1"
            min="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
          <p className="mt-2 text-sm text-gray-500">
            소수점 첫째 자리까지 입력 가능 (예: 2.5년)
          </p>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium text-lg"
        >
          계산하기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">계산 결과</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">일일 실업급여액</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatNumber(result.dailyBenefit)}원
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">월 예상 실업급여</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatNumber(result.monthlyBenefit)}원
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">수급기간</span>
              <span className="text-lg font-semibold text-gray-900">
                {result.paymentDays}일
              </span>
            </div>
            <div className="flex justify-between items-center py-3 bg-blue-50 rounded-md px-4 mt-4">
              <span className="text-xl font-semibold text-gray-900">총 예상 실업급여</span>
              <span className="text-2xl font-bold text-blue-600">
                {formatNumber(result.totalBenefit)}원
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

