'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function WeeklyRestCalculator() {
  const t = useTranslations('weeklyRest');
  const commonT = useTranslations('common');
  const [weeklyHours, setWeeklyHours] = useState<string>('40');
  const [dailyWage, setDailyWage] = useState<string>('');
  const [daysWorked, setDaysWorked] = useState<string>('');
  const [result, setResult] = useState<{
    weeklyRestPay: number;
  } | null>(null);

  const calculate = () => {
    try {
      const hours = parseFloat(weeklyHours) || 40;
      const cleanWage = dailyWage.replace(/,/g, '').trim();
      const cleanDays = daysWorked.replace(/[^0-9.]/g, '').trim();

      if (!cleanWage) {
        if (typeof window !== 'undefined') {
          alert(t('enterDailyWage'));
        }
        return;
      }

      if (!cleanDays) {
        if (typeof window !== 'undefined') {
          alert(t('enterDays'));
        }
        return;
      }

      const wage = parseFloat(cleanWage);
      const days = parseFloat(cleanDays);

      if (isNaN(wage) || wage <= 0 || isNaN(days) || days <= 0) {
        if (typeof window !== 'undefined') {
          alert(t('error'));
        }
        return;
      }

      // 주휴수당 계산 (2026년 기준, 근로기준법)
      // 주 40시간 근무 시 주휴수당 = (일급 × 주근무일수) ÷ 주소정근로일수 × 1일
      // 주소정근로일수는 보통 5일이지만, 실제 근무일수를 기준으로 계산
      const scheduledDays = 5; // 주 소정근로일수
      const weeklyRestPay = (wage * days) / scheduledDays;

      setResult({
        weeklyRestPay: Math.round(weeklyRestPay),
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
          <label htmlFor="weeklyHours" className="block text-sm font-medium text-gray-700 mb-2">
            {t('weeklyHours')}
          </label>
          <input
            type="number"
            id="weeklyHours"
            value={weeklyHours}
            onChange={(e) => setWeeklyHours(e.target.value)}
            placeholder="40"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="dailyWage" className="block text-sm font-medium text-gray-700 mb-2">
            {t('dailyWage')} ({getCurrency()})
          </label>
          <input
            type="text"
            id="dailyWage"
            value={dailyWage}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setDailyWage(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            }}
            placeholder="예: 100000"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="daysWorked" className="block text-sm font-medium text-gray-700 mb-2">
            {t('daysWorked')}
          </label>
          <input
            type="text"
            id="daysWorked"
            value={daysWorked}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.]/g, '');
              setDaysWorked(value);
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
                <p className="text-gray-700 mb-2">{t('result.weeklyRestPay')}</p>
                <p className="text-4xl font-bold text-blue-600">
                  {formatNumber(result.weeklyRestPay)}{getCurrency()}
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

