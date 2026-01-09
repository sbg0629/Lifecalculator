'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function GoalSavingsCalculator() {
  const t = useTranslations('goalSavings');
  const commonT = useTranslations('common');
  const [goalAmount, setGoalAmount] = useState<string>('');
  const [currentAmount, setCurrentAmount] = useState<string>('0');
  const [interestRate, setInterestRate] = useState<string>('');
  const [period, setPeriod] = useState<string>('');
  const [periodUnit, setPeriodUnit] = useState<'months' | 'years'>('years');
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalSavings: number;
    interestEarned: number;
  } | null>(null);

  const calculate = () => {
    try {
      const cleanGoal = goalAmount.replace(/,/g, '').trim();
      const cleanCurrent = currentAmount.replace(/,/g, '').trim() || '0';
      const cleanRate = interestRate.replace(/[^0-9.]/g, '').trim();
      const cleanPeriod = period.replace(/[^0-9.]/g, '').trim();

      if (!cleanGoal) {
        if (typeof window !== 'undefined') {
          alert(t('enterGoal'));
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

      const goal = parseFloat(cleanGoal);
      const current = parseFloat(cleanCurrent) || 0;
      const rate = parseFloat(cleanRate) / 100; // 연 이자율
      const periodValue = parseFloat(cleanPeriod);
      const periodInMonths = periodUnit === 'years' ? periodValue * 12 : periodValue;
      const periodInYears = periodInMonths / 12;

      if (isNaN(goal) || goal <= 0 || isNaN(rate) || rate < 0 || isNaN(periodValue) || periodValue <= 0) {
        if (typeof window !== 'undefined') {
          alert(t('error'));
        }
        return;
      }

      if (goal <= current) {
        if (typeof window !== 'undefined') {
          alert('목표 금액은 현재 금액보다 커야 합니다.');
        }
        return;
      }

      // 목돈 만들기 계산 (2026년 기준, 복리 계산)
      // 목표 금액 = 현재 금액 × (1 + 월이자율)^개월수 + 월납입액 × [(1 + 월이자율)^개월수 - 1] / 월이자율
      // 월납입액을 역산하여 계산
      const monthlyRate = rate / 12;
      const neededAmount = goal - current;
      
      let monthlyPayment = 0;
      if (monthlyRate === 0) {
        monthlyPayment = neededAmount / periodInMonths;
      } else {
        // 현재 금액이 목표 금액에 도달하는 데 필요한 이자 계산
        const futureValueOfCurrent = current * Math.pow(1 + monthlyRate, periodInMonths);
        const remainingNeeded = goal - futureValueOfCurrent;
        
        if (remainingNeeded <= 0) {
          monthlyPayment = 0;
        } else {
          // 월납입액 계산: 필요금액 = 월납입액 × [(1 + 월이자율)^개월수 - 1] / 월이자율
          const numerator = remainingNeeded * monthlyRate;
          const denominator = Math.pow(1 + monthlyRate, periodInMonths) - 1;
          monthlyPayment = numerator / denominator;
        }
      }

      // 총 저축액 계산
      const totalSavings = (monthlyPayment * periodInMonths) + current;
      
      // 예상 이자 계산
      let totalValue = current * Math.pow(1 + monthlyRate, periodInMonths);
      if (monthlyRate > 0) {
        totalValue += monthlyPayment * (Math.pow(1 + monthlyRate, periodInMonths) - 1) / monthlyRate;
      } else {
        totalValue += monthlyPayment * periodInMonths;
      }
      const interestEarned = totalValue - totalSavings;

      setResult({
        monthlyPayment: Math.round(monthlyPayment),
        totalSavings: Math.round(totalSavings),
        interestEarned: Math.round(interestEarned),
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
          <label htmlFor="goalAmount" className="block text-sm font-medium text-gray-700 mb-2">
            {t('goalAmount')} ({getCurrency()})
          </label>
          <input
            type="text"
            id="goalAmount"
            value={goalAmount}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setGoalAmount(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            }}
            placeholder="예: 100000000"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="currentAmount" className="block text-sm font-medium text-gray-700 mb-2">
            {t('currentAmount')} ({getCurrency()})
          </label>
          <input
            type="text"
            id="currentAmount"
            value={currentAmount}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setCurrentAmount(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            }}
            placeholder="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
        </div>

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
              placeholder="예: 5"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
            <select
              value={periodUnit}
              onChange={(e) => setPeriodUnit(e.target.value as 'months' | 'years')}
              className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            >
              <option value="years">{t('periodYears')}</option>
              <option value="months">{t('periodMonths')}</option>
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
            <div className="bg-blue-50 rounded-md p-6">
              <div className="text-center">
                <p className="text-gray-700 mb-2">{t('result.monthlyPayment')}</p>
                <p className="text-4xl font-bold text-blue-600">
                  {formatNumber(result.monthlyPayment)}{getCurrency()}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.totalSavings')}</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatNumber(result.totalSavings)}{getCurrency()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.interestEarned')}</span>
              <span className="text-lg font-semibold text-green-600">
                +{formatNumber(result.interestEarned)}{getCurrency()}
              </span>
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

