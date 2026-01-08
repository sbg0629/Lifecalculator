'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function GasCalculator() {
  const t = useTranslations('gas');
  const commonT = useTranslations('common');
  const [usage, setUsage] = useState<string>('');
  const [result, setResult] = useState<{
    basicCharge: number;
    usageCharge: number;
    vat: number;
    total: number;
  } | null>(null);

  const calculate = () => {
    try {
      const cleanValue = usage.replace(/,/g, '').trim();
      if (!cleanValue) {
        if (typeof window !== 'undefined') {
          alert(t('enterUsage'));
        }
        return;
      }
      
      const m3 = parseFloat(cleanValue);

      if (isNaN(m3) || m3 <= 0) {
        if (typeof window !== 'undefined') {
          alert(t('enterUsage'));
        }
        return;
      }

      // 주택용 도시가스 요금 계산 (2024년 기준)
      let basicCharge = 0;
      if (m3 <= 20) {
        basicCharge = 1200;
      } else if (m3 <= 100) {
        basicCharge = 2400;
      } else if (m3 <= 500) {
        basicCharge = 4800;
      } else {
        basicCharge = 9600;
      }

      let usageCharge = 0;
      if (m3 <= 20) {
        usageCharge = m3 * 730.0;
      } else if (m3 <= 100) {
        usageCharge = 20 * 730.0 + (m3 - 20) * 850.0;
      } else if (m3 <= 500) {
        usageCharge = 20 * 730.0 + 80 * 850.0 + (m3 - 100) * 1020.0;
      } else {
        usageCharge = 20 * 730.0 + 80 * 850.0 + 400 * 1020.0 + (m3 - 500) * 1200.0;
      }

      // 부가가치세 (VAT): 기본료 + 사용료의 10%
      const vat = Math.floor((basicCharge + usageCharge) * 0.1);
      
      const total = basicCharge + usageCharge + vat;

      setResult({
        basicCharge,
        usageCharge,
        vat,
        total,
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
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="mb-6">
          <label htmlFor="usage" className="block text-sm font-medium text-gray-700 mb-2">
            {t('usage')}
          </label>
          <input
            type="text"
            id="usage"
            value={usage}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.]/g, '');
              setUsage(value);
            }}
            placeholder="예: 25"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
          <p className="mt-2 text-sm text-gray-500">
            {t('usageHint')}
          </p>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium text-lg"
        >
          {t('calculateButton')}
        </button>
      </div>

      {result !== null && (
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{commonT('result')}</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.basicCharge')}</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatNumber(result.basicCharge)}{getCurrency()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.usageCharge')}</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatNumber(result.usageCharge)}{getCurrency()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.vat')}</span>
              <span className="text-gray-900">
                {formatNumber(result.vat)}{getCurrency()}
              </span>
            </div>
            <div className="bg-blue-50 rounded-md p-6 mt-4">
              <div className="text-center">
                <p className="text-gray-700 mb-2">{t('result.total')}</p>
                <p className="text-4xl font-bold text-blue-600">
                  {formatNumber(result.total)}{getCurrency()}
                </p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600 mb-2">
                <strong>{t('result.rateGuide')}</strong>
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>{t('result.rate1')}</li>
                <li>{t('result.rate2')}</li>
                <li>{t('result.rate3')}</li>
                <li>{t('result.rate4')}</li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">
                <strong>{t('result.note')}</strong> {t('result.noteText')}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
