'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function LoanCalculator() {
  const t = useTranslations('loan');
  const commonT = useTranslations('common');
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanPeriod, setLoanPeriod] = useState<string>('');
  const [periodUnit, setPeriodUnit] = useState<'months' | 'years'>('years');
  const [repaymentType, setRepaymentType] = useState<'equalPrincipal' | 'equalPayment'>('equalPrincipal');
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    firstPayment?: number;
    lastPayment?: number;
  } | null>(null);

  const calculate = () => {
    try {
      const cleanLoan = loanAmount.replace(/,/g, '').trim();
      const cleanRate = interestRate.replace(/[^0-9.]/g, '').trim();
      const cleanPeriod = loanPeriod.replace(/[^0-9.]/g, '').trim();

      if (!cleanLoan) {
        if (typeof window !== 'undefined') {
          alert(t('enterLoanAmount'));
        }
        return;
      }

      if (!cleanRate) {
        if (typeof window !== 'undefined') {
          alert(t('enterRate'));
        }
        return;
      }

      if (!cleanPeriod) {
        if (typeof window !== 'undefined') {
          alert(t('enterPeriod'));
        }
        return;
      }

      const principal = parseFloat(cleanLoan);
      const rate = parseFloat(cleanRate) / 100 / 12; // 월 이자율
      const periodValue = parseFloat(cleanPeriod);
      const periodInMonths = periodUnit === 'years' ? periodValue * 12 : periodValue;

      if (isNaN(principal) || principal <= 0 || isNaN(rate) || rate <= 0 || isNaN(periodValue) || periodValue <= 0) {
        if (typeof window !== 'undefined') {
          alert(t('error'));
        }
        return;
      }

      let monthlyPayment = 0;
      let totalPayment = 0;
      let totalInterest = 0;
      let firstPayment = 0;
      let lastPayment = 0;

      if (repaymentType === 'equalPrincipal') {
        // 원리금 균등상환
        // 월 상환액 = 원금 × [월이자율 × (1 + 월이자율)^상환개월수] / [(1 + 월이자율)^상환개월수 - 1]
        if (rate === 0) {
          monthlyPayment = principal / periodInMonths;
        } else {
          const monthlyRate = rate;
          const numerator = monthlyRate * Math.pow(1 + monthlyRate, periodInMonths);
          const denominator = Math.pow(1 + monthlyRate, periodInMonths) - 1;
          monthlyPayment = principal * (numerator / denominator);
        }
        totalPayment = monthlyPayment * periodInMonths;
        totalInterest = totalPayment - principal;
        firstPayment = monthlyPayment;
        lastPayment = monthlyPayment;
      } else {
        // 원금 균등상환
        const monthlyPrincipal = principal / periodInMonths;
        let remainingPrincipal = principal;
        let totalMonthlyPayment = 0;
        
        for (let i = 0; i < periodInMonths; i++) {
          const monthlyInterest = remainingPrincipal * rate;
          const monthlyTotal = monthlyPrincipal + monthlyInterest;
          totalMonthlyPayment += monthlyTotal;
          remainingPrincipal -= monthlyPrincipal;
          
          if (i === 0) firstPayment = monthlyTotal;
          if (i === periodInMonths - 1) lastPayment = monthlyTotal;
        }
        
        monthlyPayment = totalMonthlyPayment / periodInMonths; // 평균 월 상환액
        totalPayment = totalMonthlyPayment;
        totalInterest = totalPayment - principal;
      }

      setResult({
        monthlyPayment: Math.round(monthlyPayment),
        totalPayment: Math.round(totalPayment),
        totalInterest: Math.round(totalInterest),
        firstPayment: Math.round(firstPayment),
        lastPayment: Math.round(lastPayment),
      });
    } catch (error) {
      console.error('계산 중 오류 발생:', error);
      if (typeof window !== 'undefined') {
        alert(t('error'));
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
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors">
        <div className="mb-6">
          <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-2">
            {t('loanAmount')} ({getCurrency()})
          </label>
          <input
            type="text"
            id="loanAmount"
            value={loanAmount}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setLoanAmount(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            }}
            placeholder="예: 100000000"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-2">
            {t('interestRate')}
          </label>
          <input
            type="text"
            id="interestRate"
            value={interestRate}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.]/g, '');
              setInterestRate(value);
            }}
            placeholder="예: 3.5"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t('repaymentType')}
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="repaymentType"
                value="equalPrincipal"
                checked={repaymentType === 'equalPrincipal'}
                onChange={(e) => setRepaymentType(e.target.value as 'equalPrincipal' | 'equalPayment')}
                className="mr-2"
              />
              <span className="text-gray-700">{t('equalPrincipal')}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="repaymentType"
                value="equalPayment"
                checked={repaymentType === 'equalPayment'}
                onChange={(e) => setRepaymentType(e.target.value as 'equalPrincipal' | 'equalPayment')}
                className="mr-2"
              />
              <span className="text-gray-700">{t('equalPayment')}</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('loanPeriod')}
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              value={loanPeriod}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, '');
                setLoanPeriod(value);
              }}
              placeholder="예: 30"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
            <select
              value={periodUnit}
              onChange={(e) => setPeriodUnit(e.target.value as 'months' | 'years')}
              className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            >
              <option value="years">{t('periodYears')}</option>
              <option value="months">{t('periodMonths')}</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium text-lg"
        >
          {t('calculateButton')}
        </button>
      </div>

      {result && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{commonT('result')}</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-md p-6">
              <div className="text-center">
                <p className="text-gray-700 mb-2">{t('result.monthlyPayment')}</p>
                <p className="text-4xl font-bold text-blue-600">
                  {formatNumber(result.monthlyPayment)}{getCurrency()}
                </p>
              </div>
            </div>
            {result.firstPayment && result.lastPayment && repaymentType === 'equalPayment' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-md p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">{t('result.firstPayment')}</p>
                  <p className="text-xl font-bold text-gray-900">
                    {formatNumber(result.firstPayment)}{getCurrency()}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-md p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">{t('result.lastPayment')}</p>
                  <p className="text-xl font-bold text-gray-900">
                    {formatNumber(result.lastPayment)}{getCurrency()}
                  </p>
                </div>
              </div>
            )}
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('loanAmount')}</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatNumber(parseFloat(loanAmount.replace(/,/g, '')))}{getCurrency()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.totalInterest')}</span>
              <span className="text-lg font-semibold text-red-600">
                +{formatNumber(result.totalInterest)}{getCurrency()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.totalPayment')}</span>
              <span className="text-2xl font-bold text-blue-600">
                {formatNumber(result.totalPayment)}{getCurrency()}
              </span>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">
                <strong>{t('result.note')}</strong> {t('result.noteText')}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

