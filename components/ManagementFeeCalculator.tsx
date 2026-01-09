'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ManagementFeeCalculator() {
  const t = useTranslations('management');
  const commonT = useTranslations('common');
  const [area, setArea] = useState<string>('');
  const [managementType, setManagementType] = useState<'basic' | 'comprehensive'>('basic');
  const [result, setResult] = useState<{
    basicFee: number;
    elevatorFee: number;
    securityFee: number;
    cleaningFee: number;
    lightingFee: number;
    repairFee: number;
    total: number;
  } | null>(null);

  const calculate = () => {
    try {
      const cleanArea = area.replace(/,/g, '').trim();
      if (!cleanArea) {
        if (typeof window !== 'undefined') {
          alert(t('enterArea'));
        }
        return;
      }
      
      const areaValue = parseFloat(cleanArea);

      if (isNaN(areaValue) || areaValue <= 0) {
        if (typeof window !== 'undefined') {
          alert(t('enterArea'));
        }
        return;
      }

      // 관리비 계산 (2026년 기준, 대략적 계산)
      // 전용면적 기준으로 계산 (㎡당 단가)
      const areaPerSquareMeter = areaValue;

      // 기본 관리비 = 전용면적 × 단가 (약 300원/㎡)
      const basicFee = Math.round(areaPerSquareMeter * 300);

      // 승강기 유지비 = 전용면적 × 단가 (약 200원/㎡)
      const elevatorFee = Math.round(areaPerSquareMeter * 200);

      // 경비비 = 전용면적 × 단가 (약 150원/㎡)
      const securityFee = Math.round(areaPerSquareMeter * 150);

      // 청소비 = 전용면적 × 단가 (약 100원/㎡)
      const cleaningFee = Math.round(areaPerSquareMeter * 100);

      // 조명비 = 전용면적 × 단가 (약 50원/㎡)
      const lightingFee = Math.round(areaPerSquareMeter * 50);

      // 수선비 = 전용면적 × 단가 (약 100원/㎡)
      const repairFee = Math.round(areaPerSquareMeter * 100);

      const total = basicFee + elevatorFee + securityFee + cleaningFee + lightingFee + repairFee;

      setResult({
        basicFee,
        elevatorFee,
        securityFee,
        cleaningFee,
        lightingFee,
        repairFee,
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
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t('managementType')}
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="managementType"
                value="basic"
                checked={managementType === 'basic'}
                onChange={(e) => setManagementType(e.target.value as 'basic' | 'comprehensive')}
                className="mr-2"
              />
              <span className="text-gray-700">{t('basic')}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="managementType"
                value="comprehensive"
                checked={managementType === 'comprehensive'}
                onChange={(e) => setManagementType(e.target.value as 'basic' | 'comprehensive')}
                className="mr-2"
              />
              <span className="text-gray-700">{t('comprehensive')}</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
            {t('area')}
          </label>
          <input
            type="text"
            id="area"
            value={area}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.]/g, '');
              setArea(value);
            }}
            placeholder="예: 84"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
          <p className="mt-2 text-sm text-gray-500">
            {t('areaHint')}
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
              <span className="text-gray-700">{t('result.basicFee')}</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatNumber(result.basicFee)}{getCurrency()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.elevatorFee')}</span>
              <span className="text-gray-900">
                {formatNumber(result.elevatorFee)}{getCurrency()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.securityFee')}</span>
              <span className="text-gray-900">
                {formatNumber(result.securityFee)}{getCurrency()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.cleaningFee')}</span>
              <span className="text-gray-900">
                {formatNumber(result.cleaningFee)}{getCurrency()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.lightingFee')}</span>
              <span className="text-gray-900">
                {formatNumber(result.lightingFee)}{getCurrency()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.repairFee')}</span>
              <span className="text-gray-900">
                {formatNumber(result.repairFee)}{getCurrency()}
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

