'use client';

import { useState, Fragment } from 'react';

type SalaryType = 'annual' | 'monthly';

export default function SalaryCalculator() {
  const [salaryType, setSalaryType] = useState<SalaryType>('monthly');
  const [salaryAmount, setSalaryAmount] = useState<string>('');
  const [nonTaxableAmount, setNonTaxableAmount] = useState<string>('100000');
  const [dependents, setDependents] = useState<string>('1');
  const [childrenUnder20, setChildrenUnder20] = useState<string>('0');
  const [result, setResult] = useState<{
    monthlySalary: number;
    annualSalary: number;
    nonTaxableAmount: number;
    nationalPension: number;
    healthInsurance: number;
    employmentInsurance: number;
    industrialAccidentInsurance: number;
    incomeTax: number;
    localIncomeTax: number;
    totalDeduction: number;
    netMonthlySalary: number;
  } | null>(null);

  // 근로소득공제 계산 (2024년 기준)
  const calculateWorkIncomeDeduction = (annualIncome: number): number => {
    if (annualIncome <= 5000000) {
      return annualIncome * 0.7;
    } else if (annualIncome <= 15000000) {
      return annualIncome * 0.4 + 1500000;
    } else if (annualIncome <= 45000000) {
      return annualIncome * 0.15 + 5250000;
    } else if (annualIncome <= 100000000) {
      return annualIncome * 0.05 + 12000000;
    } else {
      return 17000000;
    }
  };

  // 소득세 계산 (간이세액표 기반)
  const calculateIncomeTax = (
    monthlySalary: number,
    nonTaxableAmount: number,
    dependents: number,
    childrenUnder20: number
  ): number => {
    const annualSalary = monthlySalary * 12;
    const annualNonTaxable = nonTaxableAmount * 12;
    
    // 근로소득 = 연봉 - 비과세액
    const workIncome = annualSalary - annualNonTaxable;
    
    // 근로소득공제
    const workIncomeDeduction = calculateWorkIncomeDeduction(workIncome);
    
    // 소득공제
    // 기본공제: 본인 150만원
    // 부양가족공제: 부양가족 1명당 150만원 (본인 제외)
    // 자녀공제: 20세 이하 자녀 1명당 150만원
    const basicDeduction = 1500000; // 본인
    const dependentDeduction = Math.max(0, (dependents - 1) * 1500000); // 부양가족 (본인 제외)
    const childDeduction = childrenUnder20 * 1500000; // 20세 이하 자녀
    
    const totalIncomeDeduction = basicDeduction + dependentDeduction + childDeduction;
    
    // 과세표준 = 근로소득 - 근로소득공제 - 소득공제
    const taxableStandard = Math.max(0, workIncome - workIncomeDeduction - totalIncomeDeduction);
    
    // 소득세 계산 (2024년 소득세율)
    let incomeTax = 0;
    if (taxableStandard <= 12000000) {
      incomeTax = taxableStandard * 0.06;
    } else if (taxableStandard <= 46000000) {
      incomeTax = 720000 + (taxableStandard - 12000000) * 0.15;
    } else if (taxableStandard <= 88000000) {
      incomeTax = 5820000 + (taxableStandard - 46000000) * 0.24;
    } else if (taxableStandard <= 150000000) {
      incomeTax = 15900000 + (taxableStandard - 88000000) * 0.35;
    } else if (taxableStandard <= 300000000) {
      incomeTax = 37600000 + (taxableStandard - 150000000) * 0.38;
    } else if (taxableStandard <= 500000000) {
      incomeTax = 94600000 + (taxableStandard - 300000000) * 0.40;
    } else {
      incomeTax = 174600000 + (taxableStandard - 500000000) * 0.42;
    }
    
    // 월 소득세
    return Math.max(0, incomeTax / 12);
  };

  const calculate = () => {
    try {
      const cleanSalary = salaryAmount.replace(/,/g, '').trim();
      const cleanNonTaxable = nonTaxableAmount.replace(/,/g, '').trim();
      const cleanDependents = dependents.replace(/[^0-9]/g, '').trim();
      const cleanChildren = childrenUnder20.replace(/[^0-9]/g, '').trim();

      if (!cleanSalary) {
        if (typeof window !== 'undefined') {
          alert('계산금액을 입력해주세요.');
        }
        return;
      }

      const salary = parseFloat(cleanSalary);
      const nonTaxable = cleanNonTaxable ? parseFloat(cleanNonTaxable) : 100000;
      const dependentsCount = cleanDependents ? parseInt(cleanDependents, 10) : 1;
      const childrenCount = cleanChildren ? parseInt(cleanChildren, 10) : 0;

      if (isNaN(salary) || salary <= 0) {
        if (typeof window !== 'undefined') {
          alert('올바른 금액을 입력해주세요.');
        }
        return;
      }

      // 연봉 또는 월급에 따라 계산
      const monthlySalary = salaryType === 'annual' ? salary / 12 : salary;
      const annualSalary = salaryType === 'annual' ? salary : salary * 12;

      // 4대보험 계산 (2024년 기준)
      // 보험료 산정 기준: 월급여액 - 비과세액
      const insuranceBase = monthlySalary - nonTaxable;

      // 국민연금: 산정기준액의 4.5% (본인 부담)
      const nationalPension = Math.max(0, insuranceBase * 0.045);
      
      // 건강보험: 산정기준액의 3.545% (본인 부담)
      const healthInsurance = Math.max(0, insuranceBase * 0.03545);
      
      // 장기요양보험: 건강보험료의 12.27%
      const longTermCare = healthInsurance * 0.1227;
      
      // 고용보험: 산정기준액의 0.9% (본인 부담)
      const employmentInsurance = Math.max(0, insuranceBase * 0.009);
      
      // 산재보험: 산정기준액의 0.6% (일반 업종 기준)
      const industrialAccidentInsurance = Math.max(0, insuranceBase * 0.006);

      // 소득세 계산 (간이세액표 기반)
      const incomeTax = calculateIncomeTax(
        monthlySalary,
        nonTaxable,
        dependentsCount,
        childrenCount
      );

      // 지방소득세: 소득세의 10%
      const localIncomeTax = incomeTax * 0.1;

      const totalDeduction = 
        nationalPension + 
        longTermCare +
        healthInsurance + 
        employmentInsurance + 
        industrialAccidentInsurance + 
        incomeTax + 
        localIncomeTax;

      const netMonthlySalary = monthlySalary - totalDeduction;

      setResult({
        monthlySalary,
        annualSalary,
        nonTaxableAmount: nonTaxable,
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
          <label className="block text-sm font-medium text-gray-700 mb-3">
            연봉/월급
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="salaryType"
                value="annual"
                checked={salaryType === 'annual'}
                onChange={(e) => setSalaryType(e.target.value as SalaryType)}
                className="mr-2"
              />
              <span className="text-gray-700">연봉(퇴직금 별도)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="salaryType"
                value="monthly"
                checked={salaryType === 'monthly'}
                onChange={(e) => setSalaryType(e.target.value as SalaryType)}
                className="mr-2"
              />
              <span className="text-gray-700">월급</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
            계산금액 (원)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              id="salary"
              value={salaryAmount}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setSalaryAmount(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
              }}
              placeholder="0"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
            <span className="text-gray-600">원</span>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="nonTaxable" className="block text-sm font-medium text-gray-700 mb-2">
            비과세액 (원)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              id="nonTaxable"
              value={nonTaxableAmount}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setNonTaxableAmount(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
              }}
              placeholder="100000"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
            <span className="text-gray-600">원 (기본10만원)</span>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="dependents" className="block text-sm font-medium text-gray-700 mb-2">
            부양가족 (명)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              id="dependents"
              value={dependents}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setDependents(value);
              }}
              placeholder="1"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
            <span className="text-gray-600">명(본인포함)</span>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-2">
            20세이하자녀 (명)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              id="children"
              value={childrenUnder20}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setChildrenUnder20(value);
              }}
              placeholder="0"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
            <span className="text-gray-600">명</span>
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium text-lg"
        >
          실수령액 계산하기
        </button>

        <p className="mt-4 text-sm text-gray-500 text-center">
          실수령액 계산은 국세청 간이세액표를 기준으로 계산됩니다.
        </p>
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
              <span className="text-gray-700">연봉</span>
              <span className="text-gray-900">{formatNumber(result.annualSalary)}원</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">비과세액</span>
              <span className="text-gray-900">{formatNumber(result.nonTaxableAmount)}원</span>
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
