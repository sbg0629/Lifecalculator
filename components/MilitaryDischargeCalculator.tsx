'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type ServiceType = 'army' | 'navy' | 'airforce' | 'marines';

const SERVICE_MONTHS: Record<ServiceType, number> = {
  army: 18,
  navy: 20,
  airforce: 21,
  marines: 18,
};

export default function MilitaryDischargeCalculator() {
  const t = useTranslations('militaryDischarge');
  const commonT = useTranslations('common');
  const [enlistDate, setEnlistDate] = useState<string>('');
  const [serviceType, setServiceType] = useState<ServiceType>('army');
  const [result, setResult] = useState<{
    dischargeDate: Date;
    daysRemaining: number;
    daysServed: number;
    progress: number;
  } | null>(null);

  const SERVICE_LABELS: Record<ServiceType, string> = {
    army: t('army'),
    navy: t('navy'),
    airforce: t('airforce'),
    marines: t('marines'),
  };

  const calculate = () => {
    try {
      if (!enlistDate) {
        if (typeof window !== 'undefined') {
          alert(t('enterDate'));
        }
        return;
      }

      const enlist = new Date(enlistDate);
      if (isNaN(enlist.getTime())) {
        if (typeof window !== 'undefined') {
          alert(t('enterValidDate'));
        }
        return;
      }

      const serviceMonths = SERVICE_MONTHS[serviceType];
      const dischargeDate = new Date(enlist);
      dischargeDate.setMonth(dischargeDate.getMonth() + serviceMonths);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      dischargeDate.setHours(0, 0, 0, 0);
      enlist.setHours(0, 0, 0, 0);

      const daysServed = Math.floor((today.getTime() - enlist.getTime()) / (1000 * 60 * 60 * 24));
      const daysRemaining = Math.floor((dischargeDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      const totalDays = serviceMonths * 30;
      const progress = Math.min(100, Math.max(0, (daysServed / totalDays) * 100));

      setResult({
        dischargeDate,
        daysRemaining: Math.max(0, daysRemaining),
        daysServed: Math.max(0, daysServed),
        progress,
      });
    } catch (error) {
      console.error('계산 중 오류 발생:', error);
      if (typeof window !== 'undefined') {
        alert(t('error'));
      }
    }
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.getDay()];
    return `${year}년 ${month}월 ${day}일 (${weekday})`;
  };

  const formatNumber = (num: number) => {
    return Math.abs(num).toLocaleString();
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors">
        <div className="mb-6">
          <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-3">
            {t('serviceType')}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(['army', 'navy', 'airforce', 'marines'] as ServiceType[]).map((type) => (
              <label
                key={type}
                className={`flex items-center justify-center p-3 border-2 rounded-md cursor-pointer transition-colors ${
                  serviceType === type
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="serviceType"
                  value={type}
                  checked={serviceType === type}
                  onChange={(e) => setServiceType(e.target.value as ServiceType)}
                  className="mr-2"
                />
                <span className="text-sm font-medium">
                  {SERVICE_LABELS[type]} ({SERVICE_MONTHS[type]}{t('months')})
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="enlistDate" className="block text-sm font-medium text-gray-700 mb-2">
            {t('enlistDate')}
          </label>
          <input
            type="date"
            id="enlistDate"
            value={enlistDate}
            onChange={(e) => setEnlistDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
          <p className="mt-2 text-sm text-gray-500">
            {t('enlistDateHint')}
          </p>
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
                <p className="text-gray-700 mb-2">{t('result.dischargeDate')}</p>
                <p className="text-3xl font-bold text-blue-600">
                  {formatDate(result.dischargeDate)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 rounded-md p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">{t('result.daysServed')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(result.daysServed)}{commonT('days')}
                </p>
              </div>
              <div className="bg-gray-50 rounded-md p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">{t('result.daysRemaining')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(result.daysRemaining)}{commonT('days')}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">{t('result.progress')}</span>
                <span className="text-sm font-medium text-gray-700">
                  {result.progress.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${result.progress}%` }}
                />
              </div>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">
                <strong>{t('result.note')}</strong> {SERVICE_LABELS[serviceType]}{t('result.noteText')} {SERVICE_MONTHS[serviceType]}{t('months')}입니다.
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
