'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function VATCalculator() {
  const t = useTranslations('vat');
  const commonT = useTranslations('common');
  const [inputType, setInputType] = useState<'supply' | 'total'>('supply');
  const [amount, setAmount] = useState<string>('');
  const [result, setResult] = useState<{
    supplyPrice: number;
    vat: number;
    totalPrice: number;
  } | null>(null);

  useEffect(() => {
    if (amount) {
      calculate();
    } else {
      setResult(null);
    }
  }, [amount, inputType]);

  const calculate = () => {
    try {
      const cleanAmount = amount.replace(/,/g, '').trim();
      if (!cleanAmount) {
        setResult(null);
        return;
      }

      const value = parseFloat(cleanAmount);
      if (isNaN(value) || value <= 0) {
        setResult(null);
        return;
      }

      // 부가가치세 10% (2026년 기준)
      const vatRate = 0.1;

      let supplyPrice = 0;
      let vat = 0;
      let totalPrice = 0;

      if (inputType === 'supply') {
        // 공급가액 (VAT 별도)
        supplyPrice = value;
        vat = supplyPrice * vatRate;
        totalPrice = supplyPrice + vat;
      } else {
        // 공급가액 (VAT 포함)
        totalPrice = value;
        supplyPrice = totalPrice / (1 + vatRate);
        vat = totalPrice - supplyPrice;
      }

      setResult({
        supplyPrice: Math.round(supplyPrice),
        vat: Math.round(vat),
        totalPrice: Math.round(totalPrice),
      });
    } catch (error) {
      console.error('계산 중 오류 발생:', error);
      setResult(null);
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
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t('inputType')}
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="inputType"
                value="supply"
                checked={inputType === 'supply'}
                onChange={(e) => setInputType(e.target.value as 'supply' | 'total')}
                className="mr-2"
              />
              <span className="text-gray-700">{t('supplyPrice')}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="inputType"
                value="total"
                checked={inputType === 'total'}
                onChange={(e) => setInputType(e.target.value as 'supply' | 'total')}
                className="mr-2"
              />
              <span className="text-gray-700">{t('totalPrice')}</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            {t('amount')} ({getCurrency()})
          </label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setAmount(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            }}
            placeholder="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
        </div>
      </div>

      {result && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{commonT('result')}</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.supplyPrice')}</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatNumber(result.supplyPrice)}{getCurrency()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-700">{t('result.vat')}</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatNumber(result.vat)}{getCurrency()}
              </span>
            </div>
            <div className="bg-blue-50 rounded-md p-6 mt-4">
              <div className="text-center">
                <p className="text-gray-700 mb-2">{t('result.totalPrice')}</p>
                <p className="text-4xl font-bold text-blue-600">
                  {formatNumber(result.totalPrice)}{getCurrency()}
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

