'use client';

import { useState, useEffect, useCallback } from 'react';

export default function BabyDaysCalculator() {
  const [birthDate, setBirthDate] = useState<string>('');
  const [result, setResult] = useState<{
    daysOld: number;
    weeksOld: number;
    monthsOld: number;
    yearsOld: number;
    next100Days: Date;
    nextBirthday: Date;
  } | null>(null);

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

      // 태어난지 며칠째인지 계산
      const daysOld = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

      if (daysOld < 0) {
        setResult(null);
        return;
      }

      // 주 계산
      const weeksOld = Math.floor(daysOld / 7);

      // 개월 계산 (대략적)
      const monthsOld = Math.floor(daysOld / 30.44);

      // 년 계산
      const yearsOld = Math.floor(daysOld / 365.25);

      // 100일 계산
      const next100Days = new Date(birth);
      next100Days.setDate(next100Days.getDate() + 100);

      // 다음 생일 계산
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
    if (birthDate) {
      calculate();
    } else {
      setResult(null);
    }
  }, [birthDate, calculate]);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.getDay()];
    return `${year}년 ${month}월 ${day}일 (${weekday})`;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('ko-KR');
  };

  const getAgeDescription = (days: number) => {
    if (days < 7) {
      return `${days}일째`;
    } else if (days < 30) {
      const weeks = Math.floor(days / 7);
      const remainingDays = days % 7;
      return remainingDays > 0 ? `${weeks}주 ${remainingDays}일째` : `${weeks}주째`;
    } else if (days < 365) {
      const months = Math.floor(days / 30.44);
      const remainingDays = Math.floor(days % 30.44);
      return remainingDays > 0 ? `${months}개월 ${remainingDays}일째` : `${months}개월째`;
    } else {
      const years = Math.floor(days / 365.25);
      const months = Math.floor((days % 365.25) / 30.44);
      return months > 0 ? `${years}살 ${months}개월째` : `${years}살째`;
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="mb-6">
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
            출생일
          </label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
          <p className="mt-2 text-sm text-gray-500">
            아기의 출생일을 선택해주세요
          </p>
        </div>
      </div>

      {result && (
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">계산 결과</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-md p-6">
              <div className="text-center">
                <p className="text-gray-700 mb-2">태어난지</p>
                <p className="text-3xl font-bold text-blue-600">
                  {getAgeDescription(result.daysOld)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-gray-50 rounded-md p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">일</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(result.daysOld)}일
                </p>
              </div>
              <div className="bg-gray-50 rounded-md p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">주</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(result.weeksOld)}주
                </p>
              </div>
              <div className="bg-gray-50 rounded-md p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">개월</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(result.monthsOld)}개월
                </p>
              </div>
              <div className="bg-gray-50 rounded-md p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">년</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(result.yearsOld)}년
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-700 font-medium">100일</span>
                <span className="text-lg font-semibold text-gray-900">
                  {formatDate(result.next100Days)}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-700 font-medium">다음 생일</span>
                <span className="text-lg font-semibold text-gray-900">
                  {formatDate(result.nextBirthday)}
                </span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600">
                <strong>참고:</strong> 계산은 대략적인 값이며, 실제 나이는 생년월일을 기준으로 계산됩니다.
                <br />
                100일과 생일은 한국의 전통적인 기념일입니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

