'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function IncomeTaxCalculator() {
  const t = useTranslations('incomeTax');
  const commonT = useTranslations('common');
  const [annualIncome, setAnnualIncome] = useState<string>('');
  const [deductions, setDeductions] = useState<string>('0');
  const [result, setResult] = useState<{
    taxableIncome: number;
    incomeTax: number;
    localTax: number;
    totalTax: number;
  } | null>(null);

  const calculate = () => {
    try {
      const cleanIncome = annualIncome.replace(/,/g, '').trim();
      const cleanDeductions = deductions.replace(/,/g, '').trim() || '0';

      if (!cleanIncome) {
        if (typeof window !== 'undefined') {
          alert(t('enterIncome'));
        }
        return;
      }

      const income = parseFloat(cleanIncome);
      const deductionAmount = parseFloat(cleanDeductions) || 0;

      if (isNaN(income) || income <= 0) {
        if (typeof window !== 'undefined') {
          alert(t('error'));
        }
        return;
      }

      // 종합소득세 계산 (2026년 기준)
      // 과세표준 = 연 소득 - 소득공제액
      const taxableIncome = Math.max(0, income - deductionAmount);

      // 소득세 계산 (2026년 소득세율)
      let incomeTax = 0;
      if (taxableIncome <= 12000000) {
        incomeTax = taxableIncome * 0.06;
      } else if (taxableIncome <= 46000000) {
        incomeTax = 720000 + (taxableIncome - 12000000) * 0.15;
      } else if (taxableIncome <= 88000000) {
        incomeTax = 5820000 + (taxableIncome - 46000000) * 0.24;
      } else if (taxableIncome <= 150000000) {
        incomeTax = 15900000 + (taxableIncome - 88000000) * 0.35;
      } else if (taxableIncome <= 300000000) {
        incomeTax = 37600000 + (taxableIncome - 150000000) * 0.38;
      } else if (taxableIncome <= 500000000) {
        incomeTax = 94600000 + (taxableIncome - 300000000) * 0.40;
      } else {
        incomeTax = 174600000 + (taxableIncome - 500000000) * 0.42;
      }

      incomeTax = Math.max(0, incomeTax);

      // 지방소득세 = 소득세의 10%
      const localTax = incomeTax * 0.1;
      const totalTax = incomeTax + localTax;

      setResult({
        taxableIncome: Math.round(taxableIncome),
        incomeTax: Math.round(incomeTax),
        localTax: Math.round(localTax),
        totalTax: Math.round(totalTax),
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
          <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700 mb-2">
            {t('annualIncome')} ({getCurrency()})
          </label>
          <input
            type="text"
            id="annualIncome"
            value={annualIncome}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setAnnualIncome(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            }}
            placeholder="예: 50000000"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="deductions" className="block text-sm font-medium text-gray-700 mb-2">
            {t('deductions')} ({getCurrency()})
          </label>
          <input
            type="text"
            id="deductions"
            value={deductions}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setDeductions(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            }}
            placeholder="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
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
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.taxableIncome')}</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatNumber(result.taxableIncome)}{getCurrency()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.incomeTax')}</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatNumber(result.incomeTax)}{getCurrency()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.localTax')}</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatNumber(result.localTax)}{getCurrency()}
              </span>
            </div>
            <div className="bg-blue-50 rounded-md p-6 mt-4">
              <div className="text-center">
                <p className="text-gray-700 mb-2">{t('result.totalTax')}</p>
                <p className="text-4xl font-bold text-blue-600">
                  {formatNumber(result.totalTax)}{getCurrency()}
                </p>
              </div>
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

