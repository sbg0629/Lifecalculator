'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function AgeCalculator() {
  const t = useTranslations('age');
  const commonT = useTranslations('common');
  const [birthDate, setBirthDate] = useState<string>('');
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    nextBirthday: number;
  } | null>(null);

  useEffect(() => {
    if (birthDate) {
      calculate();
    } else {
      setResult(null);
    }
  }, [birthDate]);

  const calculate = () => {
    try {
      if (!birthDate) {
        setResult(null);
        return;
      }

      const birth = new Date(birthDate + 'T00:00:00');
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      birth.setHours(0, 0, 0, 0);

      if (isNaN(birth.getTime())) {
        setResult(null);
        return;
      }

      if (birth > today) {
        setResult(null);
        return;
      }

      let years = today.getFullYear() - birth.getFullYear();
      let months = today.getMonth() - birth.getMonth();
      let days = today.getDate() - birth.getDate();

      if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      // 다음 생일까지의 일수
      const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
      if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
      }
      const daysUntilNextBirthday = Math.floor((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      setResult({
        years,
        months,
        days,
        nextBirthday: daysUntilNextBirthday,
      });
    } catch (error) {
      console.error('계산 중 오류 발생:', error);
      setResult(null);
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors">
        <div className="mb-6">
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
            {t('birthDate')}
          </label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
          <p className="mt-2 text-sm text-gray-500">
            {t('birthDateHint')}
          </p>
        </div>
      </div>

      {result && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{commonT('result')}</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-md p-6">
              <div className="text-center">
                <p className="text-gray-700 mb-2">{t('result.age')}</p>
                <p className="text-4xl font-bold text-blue-600">
                  {formatNumber(result.years)}{t('result.years')} {formatNumber(result.months)}{t('result.months')} {formatNumber(result.days)}{t('result.days')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-50 rounded-md p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">{t('result.years')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(result.years)}
                </p>
              </div>
              <div className="bg-gray-50 rounded-md p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">{t('result.months')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(result.months)}
                </p>
              </div>
              <div className="bg-gray-50 rounded-md p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">{t('result.days')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(result.days)}
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <p className="text-gray-700">
                <strong>{t('result.nextBirthday')}:</strong> {formatNumber(result.nextBirthday)}{commonT('days')}
              </p>
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

