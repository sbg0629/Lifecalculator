'use client';

import { useState } from 'react';

type WageType = 'average' | 'monthly';

export default function SeveranceCalculator() {
  const [wageType, setWageType] = useState<WageType>('monthly');
  const [wageAmount, setWageAmount] = useState<string>('');
  const [yearsOfService, setYearsOfService] = useState<string>('');
  const [monthsOfService, setMonthsOfService] = useState<string>('');
  const [result, setResult] = useState<{
    averageWage: number;
    yearsOfService: number;
    severancePay: number;
  } | null>(null);

  const calculate = () => {
    try {
      const cleanWage = wageAmount.replace(/,/g, '').trim();
      const cleanYears = yearsOfService.replace(/[^0-9.]/g, '').trim();
      const cleanMonths = monthsOfService.replace(/[^0-9]/g, '').trim();
      
      if (!cleanWage) {
        if (typeof window !== 'undefined') {
          alert('임금을 입력해주세요.');
        }
        return;
      }

      const wage = parseFloat(cleanWage);
      const years = cleanYears ? parseFloat(cleanYears) : 0;
      const months = cleanMonths ? parseInt(cleanMonths, 10) : 0;

      if (isNaN(wage) || wage <= 0) {
        if (typeof window !== 'undefined') {
          alert('올바른 임금을 입력해주세요.');
        }
        return;
      }

      // 평균임금 계산
      let averageWage = wage;
      if (wageType === 'monthly') {
        // 월급여액을 평균임금으로 사용 (실제로는 최근 3개월 평균이지만 간소화)
        averageWage = wage;
      }

      // 근속연수 계산 (년 + 월)
      const totalYears = years + (months / 12);

      if (totalYears <= 0) {
        if (typeof window !== 'undefined') {
          alert('근속연수를 입력해주세요.');
        }
        return;
      }

      // 퇴직금 계산 공식: 평균임금 × 30일 × 근속연수
      // 근로기준법 제34조에 따른 계산
      const severancePay = averageWage * 30 * totalYears;

      setResult({
        averageWage,
        yearsOfService: totalYears,
        severancePay,
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
          <label className="block text-sm font-medium text-gray-700 mb-3">
            임금 종류
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="wageType"
                value="average"
                checked={wageType === 'average'}
                onChange={(e) => setWageType(e.target.value as WageType)}
                className="mr-2"
              />
              <span className="text-gray-700">평균임금</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="wageType"
                value="monthly"
                checked={wageType === 'monthly'}
                onChange={(e) => setWageType(e.target.value as WageType)}
                className="mr-2"
              />
              <span className="text-gray-700">월급여액</span>
            </label>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            {wageType === 'average' 
              ? '평균임금: 퇴직일 이전 3개월간의 임금 총액을 그 기간의 총 일수로 나눈 금액'
              : '월급여액: 최근 월급여액 (평균임금 계산의 근사치로 사용)'}
          </p>
        </div>

        <div className="mb-6">
          <label htmlFor="wage" className="block text-sm font-medium text-gray-700 mb-2">
            {wageType === 'average' ? '평균임금 (원)' : '월급여액 (원)'}
          </label>
          <input
            type="text"
            id="wage"
            value={wageAmount}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setWageAmount(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            }}
            placeholder="예: 3,000,000"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            근속연수
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

      {result !== null && (
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">계산 결과</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">평균임금</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatNumber(result.averageWage)}원
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">근속연수</span>
              <span className="text-lg font-semibold text-gray-900">
                {result.yearsOfService.toFixed(2)}년
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">계산식</span>
              <span className="text-sm text-gray-600">
                평균임금 × 30일 × 근속연수
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">상세 계산</span>
              <span className="text-sm text-gray-600">
                {formatNumber(result.averageWage)} × 30 × {result.yearsOfService.toFixed(2)}
              </span>
            </div>
            <div className="bg-blue-50 rounded-md p-6 mt-4">
              <div className="text-center">
                <p className="text-gray-700 mb-2">예상 퇴직금</p>
                <p className="text-4xl font-bold text-blue-600">
                  {formatNumber(result.severancePay)}원
                </p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">
                <strong>참고:</strong> 근로기준법 제34조에 따른 계산입니다.
                <br />
                실제 퇴직금은 평균임금 산정 방식, 각종 수당 포함 여부 등에 따라 달라질 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
