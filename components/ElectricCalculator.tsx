'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ElectricCalculator() {
  const t = useTranslations('electric');
  const commonT = useTranslations('common');
  const [usage, setUsage] = useState<string>('');
  const [result, setResult] = useState<{
    basicCharge: number;
    energyCharge: number;
    vat: number;
    fund: number;
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
      
      const kwh = parseFloat(cleanValue);

      if (isNaN(kwh) || kwh <= 0) {
        if (typeof window !== 'undefined') {
          alert(t('enterUsage'));
        }
        return;
      }

      // 주택용 전기요금 계산 (2026년 기준, 저압 주택용)
      let basicCharge = 0;
      if (kwh <= 200) {
        basicCharge = 910;
      } else if (kwh <= 400) {
        basicCharge = 1600;
      } else {
        basicCharge = 7300;
      }

      let energyCharge = 0;
      if (kwh <= 200) {
        energyCharge = kwh * 120.7;
      } else if (kwh <= 400) {
        energyCharge = 200 * 120.7 + (kwh - 200) * 214.6;
      } else {
        energyCharge = 200 * 120.7 + 200 * 214.6 + (kwh - 400) * 307.3;
      }

      // 부가가치세 (VAT): 기본료 + 전력량요금의 10%
      const vat = Math.floor((basicCharge + energyCharge) * 0.1);
      
      // 전력산업기반기금: 기본료 + 전력량요금의 3.7%
      const fund = Math.floor((basicCharge + energyCharge) * 0.037);
      
      const total = basicCharge + energyCharge + vat + fund;

      setResult({
        basicCharge,
        energyCharge,
        vat,
        fund,
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors">
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
            placeholder="예: 350"
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{commonT('result')}</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.basicCharge')}</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatNumber(result.basicCharge)}{getCurrency()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.energyCharge')}</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatNumber(result.energyCharge)}{getCurrency()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.vat')}</span>
              <span className="text-gray-900">
                {formatNumber(result.vat)}{getCurrency()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.fund')}</span>
              <span className="text-gray-900">
                {formatNumber(result.fund)}{getCurrency()}
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
