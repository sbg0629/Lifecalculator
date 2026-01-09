'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function SavingsCalculator() {
  const t = useTranslations('savings');
  const commonT = useTranslations('common');
  const [type, setType] = useState<'savings' | 'deposit'>('savings');
  const [principal, setPrincipal] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [period, setPeriod] = useState<string>('');
  const [periodUnit, setPeriodUnit] = useState<'months' | 'years'>('months');
  const [result, setResult] = useState<{
    principal: number;
    interest: number;
    total: number;
    monthlyPayment?: number;
  } | null>(null);

  const calculate = () => {
    try {
      const cleanPrincipal = principal.replace(/,/g, '').trim();
      const cleanRate = interestRate.replace(/[^0-9.]/g, '').trim();
      const cleanPeriod = period.replace(/[^0-9.]/g, '').trim();

      if (!cleanPrincipal) {
        if (typeof window !== 'undefined') {
          alert(t('enterPrincipal'));
        }
        return;
      }

      if (!cleanRate) {
        if (typeof window !== 'undefined') {
          alert(t('enterRate'));
        }
        return;
      }

      if (!cleanPeriod) {
        if (typeof window !== 'undefined') {
          alert(t('enterPeriod'));
        }
        return;
      }

      const principalValue = parseFloat(cleanPrincipal);
      const rate = parseFloat(cleanRate) / 100; // 이자율을 소수로 변환
      const periodValue = parseFloat(cleanPeriod);
      const periodInMonths = periodUnit === 'years' ? periodValue * 12 : periodValue;
      const periodInYears = periodInMonths / 12;

      if (isNaN(principalValue) || principalValue <= 0 || isNaN(rate) || rate <= 0 || isNaN(periodValue) || periodValue <= 0) {
        if (typeof window !== 'undefined') {
          alert(t('error'));
        }
        return;
      }

      let total = 0;
      let interest = 0;
      let monthlyPayment = 0;

      if (type === 'savings') {
        // 적금 계산 (복리)
        // 월 납입액 × [(1 + 월이자율)^납입개월수 - 1] / 월이자율
        const monthlyRate = rate / 12;
        const monthlyPaymentValue = principalValue / periodInMonths;
        monthlyPayment = monthlyPaymentValue;
        
        // 복리 계산
        const futureValueFactor = Math.pow(1 + monthlyRate, periodInMonths);
        total = monthlyPaymentValue * (futureValueFactor - 1) / monthlyRate;
        interest = total - (monthlyPaymentValue * periodInMonths);
      } else {
        // 예금 계산 (단리)
        // 원금 × (1 + 연이자율 × 기간)
        total = principalValue * (1 + rate * periodInYears);
        interest = total - principalValue;
      }

      setResult({
        principal: Math.round(principalValue),
        interest: Math.round(interest),
        total: Math.round(total),
        monthlyPayment: type === 'savings' ? Math.round(monthlyPayment) : undefined,
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
            {t('type')}
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="savings"
                checked={type === 'savings'}
                onChange={(e) => setType(e.target.value as 'savings' | 'deposit')}
                className="mr-2"
              />
              <span className="text-gray-700">{t('savings')}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="deposit"
                checked={type === 'deposit'}
                onChange={(e) => setType(e.target.value as 'savings' | 'deposit')}
                className="mr-2"
              />
              <span className="text-gray-700">{t('deposit')}</span>
            </label>
          </div>
        </div>

        {type === 'savings' ? (
          <div className="mb-6">
            <label htmlFor="principal" className="block text-sm font-medium text-gray-700 mb-2">
              {t('principal')} (목표 금액) ({getCurrency()})
            </label>
            <input
              type="text"
              id="principal"
              value={principal}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setPrincipal(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
              }}
              placeholder="예: 10000000"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
          </div>
        ) : (
          <div className="mb-6">
            <label htmlFor="principal" className="block text-sm font-medium text-gray-700 mb-2">
              {t('principal')} ({getCurrency()})
            </label>
            <input
              type="text"
              id="principal"
              value={principal}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setPrincipal(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
              }}
              placeholder="예: 10000000"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-2">
            {t('interestRate')}
          </label>
          <input
            type="text"
            id="interestRate"
            value={interestRate}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.]/g, '');
              setInterestRate(value);
            }}
            placeholder="예: 3.5"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('period')}
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              value={period}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, '');
                setPeriod(value);
              }}
              placeholder="예: 12"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
            <select
              value={periodUnit}
              onChange={(e) => setPeriodUnit(e.target.value as 'months' | 'years')}
              className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            >
              <option value="months">{t('periodMonths')}</option>
              <option value="years">{t('periodYears')}</option>
            </select>
          </div>
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
            {result.monthlyPayment && (
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-700">{t('result.monthlyPayment')}</span>
                <span className="text-lg font-semibold text-gray-900">
                  {formatNumber(result.monthlyPayment)}{getCurrency()}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.principal')}</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatNumber(result.principal)}{getCurrency()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.interest')}</span>
              <span className="text-lg font-semibold text-green-600">
                +{formatNumber(result.interest)}{getCurrency()}
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

