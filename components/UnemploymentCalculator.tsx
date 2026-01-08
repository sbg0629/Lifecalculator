'use client';

import { useState } from 'react';

export default function UnemploymentCalculator() {
  const [averageWage, setAverageWage] = useState<string>('');
  const [yearsOfService, setYearsOfService] = useState<string>('');
  const [monthsOfService, setMonthsOfService] = useState<string>('');
  const [result, setResult] = useState<{
    dailyWage: number;
    dailyBenefit: number;
    monthlyBenefit: number;
    paymentDays: number;
    totalBenefit: number;
  } | null>(null);

  const calculate = () => {
    try {
      const cleanWage = averageWage.replace(/,/g, '').trim();
      const cleanYears = yearsOfService.replace(/[^0-9.]/g, '').trim();
      const cleanMonths = monthsOfService.replace(/[^0-9]/g, '').trim();
      
      if (!cleanWage) {
        if (typeof window !== 'undefined') {
          alert('평균임금을 입력해주세요.');
        }
        return;
      }

      const wage = parseFloat(cleanWage);
      const years = cleanYears ? parseFloat(cleanYears) : 0;
      const months = cleanMonths ? parseInt(cleanMonths, 10) : 0;

      if (isNaN(wage) || wage <= 0) {
        if (typeof window !== 'undefined') {
          alert('올바른 평균임금을 입력해주세요.');
        }
        return;
      }

      // 근속기간 계산 (년 + 월)
      const totalYears = years + (months / 12);

      if (totalYears <= 0) {
        if (typeof window !== 'undefined') {
          alert('근속기간을 입력해주세요.');
        }
        return;
      }

      // 일평균임금 계산 (월평균임금을 30일로 나눔)
      // 실제로는 최근 3개월 평균임금을 근거일수로 나누지만, 여기서는 간소화
      const dailyWage = wage / 30;

      // 일일 실업급여액 계산
      // 일평균임금의 60%, 최소 60,120원, 최대 66,000원 (2024년 기준)
      const calculatedBenefit = dailyWage * 0.6;
      const dailyBenefit = Math.min(Math.max(calculatedBenefit, 60120), 66000);

      // 수급기간 계산 (근속기간에 따라)
      let paymentDays = 90; // 1년 미만
      if (totalYears >= 10) {
        paymentDays = 240; // 10년 이상
      } else if (totalYears >= 5) {
        paymentDays = 180; // 5년 이상 10년 미만
      } else if (totalYears >= 3) {
        paymentDays = 150; // 3년 이상 5년 미만
      } else if (totalYears >= 1) {
        paymentDays = 120; // 1년 이상 3년 미만
      }

      const monthlyBenefit = dailyBenefit * 30;
      const totalBenefit = dailyBenefit * paymentDays;

      setResult({
        dailyWage,
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            근속기간
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="years" className="block text-xs text-gray-600 mb-1">
                년
              </label>
              <input
                type="text"
                id="years"
                value={yearsOfService}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9.]/g, '');
                  setYearsOfService(value);
                }}
                placeholder="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
            </div>
            <div>
              <label htmlFor="months" className="block text-xs text-gray-600 mb-1">
                개월
              </label>
              <input
                type="text"
                id="months"
                value={monthsOfService}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setMonthsOfService(value);
                }}
                placeholder="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            소수점 입력 가능 (예: 3.5년 또는 3년 6개월)
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
              <span className="text-gray-700">일평균임금</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatNumber(result.dailyWage)}원
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">일일 실업급여액</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatNumber(result.dailyBenefit)}원
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">급여율</span>
              <span className="text-sm text-gray-600">
                일평균임금의 60% (최소 60,120원, 최대 66,000원)
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
            <div className="bg-blue-50 rounded-md p-6 mt-4">
              <div className="text-center">
                <p className="text-gray-700 mb-2">총 예상 실업급여</p>
                <p className="text-4xl font-bold text-blue-600">
                  {formatNumber(result.totalBenefit)}원
                </p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600 mb-2">
                <strong>수급기간 안내:</strong>
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>1년 미만: 90일</li>
                <li>1년 이상 3년 미만: 120일</li>
                <li>3년 이상 5년 미만: 150일</li>
                <li>5년 이상 10년 미만: 180일</li>
                <li>10년 이상: 240일</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
