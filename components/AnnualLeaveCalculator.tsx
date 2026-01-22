'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function AnnualLeaveCalculator() {
  const t = useTranslations('annualLeave');
  const commonT = useTranslations('common');
  const [monthlySalary, setMonthlySalary] = useState<string>('');
  const [unusedDays, setUnusedDays] = useState<string>('');
  const [result, setResult] = useState<{
    annualLeavePay: number;
  } | null>(null);

  const calculate = () => {
    try {
      const cleanSalary = monthlySalary.replace(/,/g, '').trim();
      const cleanDays = unusedDays.replace(/[^0-9.]/g, '').trim();

      if (!cleanSalary) {
        if (typeof window !== 'undefined') {
          alert(t('enterSalary'));
        }
        return;
      }

      if (!cleanDays) {
        if (typeof window !== 'undefined') {
          alert(t('enterDays'));
        }
        return;
      }

      const salary = parseFloat(cleanSalary);
      const days = parseFloat(cleanDays);

      if (isNaN(salary) || salary <= 0 || isNaN(days) || days <= 0) {
        if (typeof window !== 'undefined') {
          alert(t('error'));
        }
        return;
      }

      // 연차수당 계산 (2026년 기준, 근로기준법)
      // 연차수당 = (월급여액 ÷ 월 소정근로일수) × 미사용 연차 일수
      // 월 소정근로일수는 보통 20~22일 (실제 달력 기준)
      const monthlyScheduledDays = 20.92; // 월 평균 소정근로일수 (1년 261일 ÷ 12개월)
      const dailyWage = salary / monthlyScheduledDays;
      const annualLeavePay = dailyWage * days;

      setResult({
        annualLeavePay: Math.round(annualLeavePay),
      });
    } catch (error) {
      console.error('계산 중 오류 발생:', error);
      if (typeof window !== 'undefined') {
        alert(t('error'));
      }
    }
  };

  const formatNumber = (num: number) => {
    return Math.round(num).toLocaleString();
  };

  const getCurrency = () => {
    return commonT('currency');
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors">
        <div className="mb-6">
          <label htmlFor="monthlySalary" className="block text-sm font-medium text-gray-700 mb-2">
            {t('monthlySalary')} ({getCurrency()})
          </label>
          <input
            type="text"
            id="monthlySalary"
            value={monthlySalary}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setMonthlySalary(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            }}
            placeholder="예: 3000000"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="unusedDays" className="block text-sm font-medium text-gray-700 mb-2">
            {t('unusedDays')}
          </label>
          <input
            type="text"
            id="unusedDays"
            value={unusedDays}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.]/g, '');
              setUnusedDays(value);
            }}
            placeholder="예: 5"
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
            <div className="bg-blue-50 rounded-md p-6">
              <div className="text-center">
                <p className="text-gray-700 mb-2">{t('result.annualLeavePay')}</p>
                <p className="text-4xl font-bold text-blue-600">
                  {formatNumber(result.annualLeavePay)}{getCurrency()}
                </p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">
                <strong>{t('result.formula')}</strong>
                <br />
                {t('result.note')}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

