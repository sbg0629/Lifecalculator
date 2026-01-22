'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function DDayCalculator() {
  const t = useTranslations('dday');
  const commonT = useTranslations('common');
  const [targetDate, setTargetDate] = useState<string>('');
  const [result, setResult] = useState<{
    daysRemaining: number;
    daysPassed: number;
    weeksRemaining: number;
    monthsRemaining: number;
  } | null>(null);

  useEffect(() => {
    if (targetDate) {
      calculate();
    } else {
      setResult(null);
    }
  }, [targetDate]);

  const calculate = () => {
    try {
      if (!targetDate) {
        setResult(null);
        return;
      }

      const target = new Date(targetDate + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      target.setHours(0, 0, 0, 0);

      if (isNaN(target.getTime())) {
        setResult(null);
        return;
      }

      const daysDiff = Math.floor((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      const daysRemaining = daysDiff > 0 ? daysDiff : 0;
      const daysPassed = daysDiff < 0 ? Math.abs(daysDiff) : 0;
      const weeksRemaining = Math.floor(daysRemaining / 7);
      const monthsRemaining = Math.floor(daysRemaining / 30.44);

      setResult({
        daysRemaining,
        daysPassed,
        weeksRemaining,
        monthsRemaining,
      });
    } catch (error) {
      console.error('계산 중 오류 발생:', error);
      setResult(null);
    }
  };

  const formatNumber = (num: number) => {
    return Math.abs(num).toLocaleString();
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors">
        <div className="mb-6">
          <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700 mb-2">
            {t('targetDate')}
          </label>
          <input
            type="date"
            id="targetDate"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
          <p className="mt-2 text-sm text-gray-500">
            {t('targetDateHint')}
          </p>
        </div>
      </div>

      {result && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{commonT('result')}</h2>
          <div className="space-y-4">
            {result.daysRemaining > 0 && (
              <div className="bg-blue-50 rounded-md p-6">
                <div className="text-center">
                  <p className="text-gray-700 mb-2">D-{formatNumber(result.daysRemaining)}</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {formatNumber(result.daysRemaining)}{commonT('days')}
                  </p>
                </div>
              </div>
            )}
            {result.daysPassed > 0 && (
              <div className="bg-gray-50 rounded-md p-6">
                <div className="text-center">
                  <p className="text-gray-700 mb-2">D+{formatNumber(result.daysPassed)}</p>
                  <p className="text-3xl font-bold text-gray-600">
                    {formatNumber(result.daysPassed)}{commonT('days')}
                  </p>
                </div>
              </div>
            )}
            {result.daysRemaining === 0 && result.daysPassed === 0 && (
              <div className="bg-green-50 rounded-md p-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">D-Day</p>
                  <p className="text-gray-700 mt-2">오늘입니다!</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {result.daysRemaining > 0 && (
                <>
                  <div className="bg-gray-50 rounded-md p-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">{t('result.weeksRemaining')}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatNumber(result.weeksRemaining)}주
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-md p-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">{t('result.monthsRemaining')}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatNumber(result.monthsRemaining)}개월
                    </p>
                  </div>
                </>
              )}
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

