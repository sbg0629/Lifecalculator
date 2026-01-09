'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function OvertimeCalculator() {
  const t = useTranslations('overtime');
  const commonT = useTranslations('common');
  const [dailyWage, setDailyWage] = useState<string>('');
  const [overtimeHours, setOvertimeHours] = useState<string>('');
  const [result, setResult] = useState<{
    overtimePay: number;
    hourlyWage: number;
  } | null>(null);

  const calculate = () => {
    try {
      const cleanWage = dailyWage.replace(/,/g, '').trim();
      const cleanHours = overtimeHours.replace(/[^0-9.]/g, '').trim();

      if (!cleanWage) {
        if (typeof window !== 'undefined') {
          alert(t('enterDailyWage'));
        }
        return;
      }

      if (!cleanHours) {
        if (typeof window !== 'undefined') {
          alert(t('enterHours'));
        }
        return;
      }

      const wage = parseFloat(cleanWage);
      const hours = parseFloat(cleanHours);

      if (isNaN(wage) || wage <= 0 || isNaN(hours) || hours <= 0) {
        if (typeof window !== 'undefined') {
          alert(t('error'));
        }
        return;
      }

      // 야근수당 계산 (2026년 기준, 근로기준법)
      // 야근수당 = 시간급 × 1.5 × 야근 시간
      // 시간급 = 일급 ÷ 8시간
      const hourlyWage = wage / 8;
      const overtimePay = hourlyWage * 1.5 * hours;

      setResult({
        overtimePay: Math.round(overtimePay),
        hourlyWage: Math.round(hourlyWage),
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
          <label htmlFor="overtimeHours" className="block text-sm font-medium text-gray-700 mb-2">
            {t('overtimeHours')} (시간)
          </label>
          <input
            type="text"
            id="overtimeHours"
            value={overtimeHours}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.]/g, '');
              setOvertimeHours(value);
            }}
            placeholder="예: 2"
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
              <span className="text-gray-700">{t('result.hourlyWage')}</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatNumber(result.hourlyWage)}{getCurrency()}/시간
              </span>
            </div>
            <div className="bg-blue-50 rounded-md p-6 mt-4">
              <div className="text-center">
                <p className="text-gray-700 mb-2">{t('result.overtimePay')}</p>
                <p className="text-4xl font-bold text-blue-600">
                  {formatNumber(result.overtimePay)}{getCurrency()}
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

