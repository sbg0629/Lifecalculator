'use client';

import { useState, Fragment } from 'react';

export default function SalaryCalculator() {
  const [annualSalary, setAnnualSalary] = useState<string>('');
  const [result, setResult] = useState<{
    monthlySalary: number;
    nationalPension: number;
    healthInsurance: number;
    employmentInsurance: number;
    industrialAccidentInsurance: number;
    incomeTax: number;
    localIncomeTax: number;
    totalDeduction: number;
    netMonthlySalary: number;
  } | null>(null);

  const calculate = () => {
    try {
      const cleanValue = annualSalary.replace(/,/g, '').trim();
      if (!cleanValue) {
        if (typeof window !== 'undefined') {
          alert('올바른 연봉을 입력해주세요.');
        }
        return;
      }
      
      const salary = parseFloat(cleanValue);
      if (isNaN(salary) || salary <= 0) {
        if (typeof window !== 'undefined') {
          alert('올바른 연봉을 입력해주세요.');
        }
        return;
      }

    const monthlySalary = salary / 12;

    // 4대보험 계산 (2024년 기준)
    // 국민연금: 월소득의 4.5% (본인 부담)
    const nationalPension = monthlySalary * 0.045;
    
    // 건강보험: 월소득의 3.545% (본인 부담)
    const healthInsurance = monthlySalary * 0.03545;
    
    // 장기요양보험: 건강보험료의 12.27%
    const longTermCare = healthInsurance * 0.1227;
    
    // 고용보험: 월소득의 0.9% (본인 부담)
    const employmentInsurance = monthlySalary * 0.009;
    
    // 산재보험: 업종별 차등 (일반적으로 0.6~1.7%, 여기서는 0.6%로 가정)
    const industrialAccidentInsurance = monthlySalary * 0.006;

    // 소득세 계산 (간소화된 계산)
    // 근로소득공제 후 과세표준 계산
    const workIncomeDeduction = monthlySalary * 0.5; // 근로소득공제 50%
    const taxableIncome = Math.max(0, monthlySalary - workIncomeDeduction);
    
    // 소득세율 (간소화: 6% 가정)
    const incomeTax = taxableIncome * 0.06;
    
    // 지방소득세: 소득세의 10%
    const localIncomeTax = incomeTax * 0.1;

    const totalDeduction = 
      nationalPension + 
      healthInsurance + 
      longTermCare + 
      employmentInsurance + 
      industrialAccidentInsurance + 
      incomeTax + 
      localIncomeTax;

    const netMonthlySalary = monthlySalary - totalDeduction;

    setResult({
      monthlySalary,
      nationalPension: nationalPension + longTermCare,
      healthInsurance,
      employmentInsurance,
      industrialAccidentInsurance,
      incomeTax,
      localIncomeTax,
      totalDeduction,
      netMonthlySalary,
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
    <Fragment>
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="mb-6">
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
            연봉 (원)
          </label>
          <input
            type="text"
            id="salary"
            value={annualSalary}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setAnnualSalary(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            }}
            placeholder="예: 50,000,000"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
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
              <span className="text-gray-700">월 급여액</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatNumber(result.monthlySalary)}원
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">국민연금 (4.5%)</span>
              <span className="text-gray-900">{formatNumber(result.nationalPension)}원</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">건강보험 (3.545%)</span>
              <span className="text-gray-900">{formatNumber(result.healthInsurance)}원</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">고용보험 (0.9%)</span>
              <span className="text-gray-900">{formatNumber(result.employmentInsurance)}원</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">산재보험 (0.6%)</span>
              <span className="text-gray-900">{formatNumber(result.industrialAccidentInsurance)}원</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">소득세</span>
              <span className="text-gray-900">{formatNumber(result.incomeTax)}원</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">지방소득세</span>
              <span className="text-gray-900">{formatNumber(result.localIncomeTax)}원</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">총 공제액</span>
              <span className="text-lg font-semibold text-red-600">
                -{formatNumber(result.totalDeduction)}원
              </span>
            </div>
            <div className="flex justify-between items-center py-3 bg-blue-50 rounded-md px-4 mt-4">
              <span className="text-xl font-semibold text-gray-900">월 실수령액</span>
              <span className="text-2xl font-bold text-blue-600">
                {formatNumber(result.netMonthlySalary)}원
              </span>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

