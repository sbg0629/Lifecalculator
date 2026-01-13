'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';

export default function BabyDaysCalculator() {
  const t = useTranslations('babyDays');
  const commonT = useTranslations('common');
  const [birthDate, setBirthDate] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false); // 빌드 에러 방지를 위한 마운트 상태 추가
  const [result, setResult] = useState<{
    daysOld: number;
    weeksOld: number;
    monthsOld: number;
    yearsOld: number;
    next100Days: Date;
    nextBirthday: Date;
  } | null>(null);

  // 컴포넌트가 브라우저에 마운트되었는지 확인
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const calculate = useCallback(() => {
    try {
      if (!birthDate) {
        setResult(null);
        return;
      }

      const birth = new Date(birthDate);
      if (isNaN(birth.getTime())) {
        setResult(null);
        return;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      birth.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
      const daysOld = daysDiff + 1;

      if (daysOld < 0) {
        setResult(null);
        return;
      }

      const weeksOld = Math.floor(daysOld / 7);
      const monthsOld = Math.floor(daysOld / 30.44);
      const yearsOld = Math.floor(daysOld / 365.25);

      const next100Days = new Date(birth);
      next100Days.setDate(next100Days.getDate() + 100);

      const nextBirthday = new Date(birth);
      nextBirthday.setFullYear(today.getFullYear());
      if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
      }

      setResult({
        daysOld,
        weeksOld,
        monthsOld,
        yearsOld,
        next100Days,
        nextBirthday,
      });
    } catch (error) {
      console.error('계산 중 오류 발생:', error);
      setResult(null);
    }
  }, [birthDate]);

  useEffect(() => {
    if (birthDate && isMounted) {
      calculate();
    } else {
      setResult(null);
    }
  }, [birthDate, calculate, isMounted]);

  const formatDate = (date: Date) => {
    if (!date) return '';
    try {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
      const weekday = weekdays[date.getDay()];
      return `${year}년 ${month}월 ${day}일 (${weekday})`;
    } catch (e) {
      return '';
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const getAgeDescription = (days: number) => {
    if (days < 7) {
      return `${days}${t('days')}`;
    } else if (days < 30) {
      const weeks = Math.floor(days / 7);
      const remainingDays = days % 7;
      return remainingDays > 0 ? `${weeks}${t('weeks')} ${remainingDays}${t('days')}` : `${weeks}${t('weeks')}`;
    } else if (days < 365) {
      const months = Math.floor(days / 30.44);
      const remainingDays = Math.floor(days % 30.44);
      return remainingDays > 0 ? `${months}${t('months')} ${remainingDays}${t('days')}` : `${months}${t('months')}`;
    } else {
      const years = Math.floor(days / 365.25);
      const months = Math.floor((days % 365.25) / 30.44);
      return months > 0 ? `${years}${t('years')} ${months}${t('months')}` : `${years}${t('years')}`;
    }
  };

  // 마운트되기 전에는 빈 화면을 보여주어 서버 사이드 에러 방지
  if (!isMounted) {
    return null; 
  }

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
                <p className="text-gray-700 mb-2">{t('result.daysOld')}</p>
                <p className="text-3xl font-bold text-blue-600">
                  {getAgeDescription(result.daysOld)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-gray-50 rounded-md p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">{t('result.days')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(result.daysOld)}{t('result.days')}
                </p>
              </div>
              <div className="bg-gray-50 rounded-md p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">{t('result.weeks')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(result.weeksOld)}{t('result.weeks')}
                </p>
              </div>
              <div className="bg-gray-50 rounded-md p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">{t('result.months')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(result.monthsOld)}{t('result.months')}
                </p>
              </div>
              <div className="bg-gray-50 rounded-md p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">{t('result.years')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(result.yearsOld)}{t('result.years')}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-700 font-medium">{t('result.next100Days')}</span>
                <span className="text-lg font-semibold text-gray-900">
                  {formatDate(result.next100Days)}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-700 font-medium">{t('result.nextBirthday')}</span>
                <span className="text-lg font-semibold text-gray-900">
                  {formatDate(result.nextBirthday)}
                </span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">
                <strong>{t('result.note')}</strong> {t('result.noteText')}
                <br />
                {t('result.noteText2')}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}