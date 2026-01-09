'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function BMICalculator() {
  const t = useTranslations('bmi');
  const commonT = useTranslations('common');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
  } | null>(null);

  useEffect(() => {
    if (height && weight) {
      calculate();
    } else {
      setResult(null);
    }
  }, [height, weight]);

  const calculate = () => {
    try {
      const heightValue = parseFloat(height);
      const weightValue = parseFloat(weight);

      if (!heightValue || !weightValue || heightValue <= 0 || weightValue <= 0) {
        setResult(null);
        return;
      }

      // 키를 미터로 변환 (cm 단위로 입력받음)
      const heightInMeters = heightValue / 100;
      const bmi = weightValue / (heightInMeters * heightInMeters);

      let category = '';
      if (bmi < 18.5) {
        category = t('result.underweight');
      } else if (bmi < 23) {
        category = t('result.normal');
      } else if (bmi < 25) {
        category = t('result.overweight');
      } else {
        category = t('result.obese');
      }

      setResult({
        bmi: Math.round(bmi * 10) / 10,
        category,
      });
    } catch (error) {
      console.error('계산 중 오류 발생:', error);
      setResult(null);
    }
  };

  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5) return 'text-blue-600';
    if (bmi < 23) return 'text-green-600';
    if (bmi < 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBMIBgColor = (bmi: number) => {
    if (bmi < 18.5) return 'bg-blue-50';
    if (bmi < 23) return 'bg-green-50';
    if (bmi < 25) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
              {t('height')} ({t('heightCm')})
            </label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="예: 175"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
          </div>
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
              {t('weight')} ({t('weightKg')})
            </label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="예: 70"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{commonT('result')}</h2>
          <div className="space-y-4">
            <div className={`${getBMIBgColor(result.bmi)} rounded-md p-6`}>
              <div className="text-center">
                <p className="text-gray-700 mb-2">{t('result.bmi')}</p>
                <p className={`text-5xl font-bold ${getBMIColor(result.bmi)}`}>
                  {result.bmi}
                </p>
                <p className="text-xl font-semibold text-gray-700 mt-2">
                  {result.category}
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">
                <strong>{t('result.note')}</strong> {t('result.noteText')}
              </p>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>• {t('result.underweight')}: BMI < 18.5</p>
                <p>• {t('result.normal')}: 18.5 ≤ BMI < 23</p>
                <p>• {t('result.overweight')}: 23 ≤ BMI < 25</p>
                <p>• {t('result.obese')}: BMI ≥ 25</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

