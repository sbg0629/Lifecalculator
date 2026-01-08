'use client';

import { useState } from 'react';

type ServiceType = 'army' | 'navy' | 'airforce' | 'marines';

const SERVICE_MONTHS: Record<ServiceType, number> = {
  army: 18,
  navy: 20,
  airforce: 21,
  marines: 18,
};

const SERVICE_LABELS: Record<ServiceType, string> = {
  army: '육군',
  navy: '해군',
  airforce: '공군',
  marines: '해병대',
};

export default function MilitaryDischargeCalculator() {
  const [enlistDate, setEnlistDate] = useState<string>('');
  const [serviceType, setServiceType] = useState<ServiceType>('army');
  const [result, setResult] = useState<{
    dischargeDate: Date;
    daysRemaining: number;
    daysServed: number;
    progress: number;
  } | null>(null);

  const calculate = () => {
    try {
      if (!enlistDate) {
        if (typeof window !== 'undefined') {
          alert('입대일을 입력해주세요.');
        }
        return;
      }

      const enlist = new Date(enlistDate);
      if (isNaN(enlist.getTime())) {
        if (typeof window !== 'undefined') {
          alert('올바른 날짜를 입력해주세요.');
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
        alert('계산 중 오류가 발생했습니다. 다시 시도해주세요.');
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
    return Math.abs(num).toLocaleString('ko-KR');
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="mb-6">
          <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-3">
            군종
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
                  {SERVICE_LABELS[type]} ({SERVICE_MONTHS[type]}개월)
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="enlistDate" className="block text-sm font-medium text-gray-700 mb-2">
            입대일
          </label>
          <input
            type="date"
            id="enlistDate"
            value={enlistDate}
            onChange={(e) => setEnlistDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
          <p className="mt-2 text-sm text-gray-500">
            입대일을 선택해주세요
          </p>
        </div>

        <button
          onClick={calculate}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium text-lg"
        >
          전역일 계산하기
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">계산 결과</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-md p-6">
              <div className="text-center">
                <p className="text-gray-700 mb-2">예상 전역일</p>
                <p className="text-3xl font-bold text-blue-600">
                  {formatDate(result.dischargeDate)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 rounded-md p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">복무한 일수</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(result.daysServed)}일
                </p>
              </div>
              <div className="bg-gray-50 rounded-md p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">남은 일수</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(result.daysRemaining)}일
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">복무 진행률</span>
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
                <strong>참고:</strong> {SERVICE_LABELS[serviceType]}의 복무기간은 {SERVICE_MONTHS[serviceType]}개월입니다.
                <br />
                실제 전역일은 휴가, 병가 등에 따라 달라질 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

