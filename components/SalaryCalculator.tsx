'use client';

import { useState, Fragment } from 'react';
import { useTranslations } from 'next-intl';

type SalaryType = 'annual' | 'monthly';

export default function SalaryCalculator() {
  const t = useTranslations('salary');
  const commonT = useTranslations('common');
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
          alert(t('enterAmount') || '계산금액을 입력해주세요.');
        }
        return;
      }

      const salary = parseFloat(cleanSalary);
      const nonTaxable = cleanNonTaxable ? parseFloat(cleanNonTaxable) : 100000;
      const dependentsCount = cleanDependents ? parseInt(cleanDependents, 10) : 1;
      const childrenCount = cleanChildren ? parseInt(cleanChildren, 10) : 0;

      if (isNaN(salary) || salary <= 0) {
        if (typeof window !== 'undefined') {
          alert(t('enterValidAmount') || '올바른 금액을 입력해주세요.');
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
        alert(t('error') || '계산 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  const formatNumber = (num: number) => {
    if (isNaN(num) || !isFinite(num)) {
      return '0';
    }
    try {
      return Math.round(num).toLocaleString();
    } catch {
      return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  };
  
  const getCurrency = () => {
    return commonT('currency');
  };

  return (
    <Fragment>
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t('salaryType')}
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
              <span className="text-gray-700">{t('annualSalary')}</span>
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
              <span className="text-gray-700">{t('monthlySalary')}</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
            {t('amount')} ({getCurrency()})
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
            <span className="text-gray-600">{getCurrency()}</span>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="nonTaxable" className="block text-sm font-medium text-gray-700 mb-2">
            {t('nonTaxable')} ({getCurrency()})
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
            <span className="text-gray-600">{t('nonTaxableHint')}</span>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="dependents" className="block text-sm font-medium text-gray-700 mb-2">
            {t('dependents')}
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
            <span className="text-gray-600">{t('dependentsHint')}</span>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-2">
            {t('children')}
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
            <span className="text-gray-600">{t('childrenHint')}</span>
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium text-lg"
        >
          {t('calculateButton')}
        </button>

        <p className="mt-4 text-sm text-gray-500 text-center">
          {t('note')}
        </p>
      </div>

      {result && (
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{commonT('result')}</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.monthlySalary')}</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatNumber(result.monthlySalary)}{getCurrency()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.annualSalary')}</span>
              <span className="text-gray-900">{formatNumber(result.annualSalary)}{getCurrency()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.nonTaxableAmount')}</span>
              <span className="text-gray-900">{formatNumber(result.nonTaxableAmount)}{getCurrency()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.nationalPension')}</span>
              <span className="text-gray-900">{formatNumber(result.nationalPension)}{getCurrency()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.healthInsurance')}</span>
              <span className="text-gray-900">{formatNumber(result.healthInsurance)}{getCurrency()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.employmentInsurance')}</span>
              <span className="text-gray-900">{formatNumber(result.employmentInsurance)}{getCurrency()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.industrialAccidentInsurance')}</span>
              <span className="text-gray-900">{formatNumber(result.industrialAccidentInsurance)}{getCurrency()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.incomeTax')}</span>
              <span className="text-gray-900">{formatNumber(result.incomeTax)}{getCurrency()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.localIncomeTax')}</span>
              <span className="text-gray-900">{formatNumber(result.localIncomeTax)}{getCurrency()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.totalDeduction')}</span>
              <span className="text-lg font-semibold text-red-600">
                -{formatNumber(result.totalDeduction)}{getCurrency()}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 bg-blue-50 rounded-md px-4 mt-4">
              <span className="text-xl font-semibold text-gray-900">{t('result.netMonthlySalary')}</span>
              <span className="text-2xl font-bold text-blue-600">
                {formatNumber(result.netMonthlySalary)}{getCurrency()}
              </span>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
