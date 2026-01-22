'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function SeveranceCalculator() {
  const t = useTranslations('severance');
  const commonT = useTranslations('common');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [monthlySalary, setMonthlySalary] = useState<string>('3000000');
  const [sameFor3Months, setSameFor3Months] = useState<boolean>(true);
  const [annualBonus, setAnnualBonus] = useState<string>('0');
  const [annualLeaveAllowance, setAnnualLeaveAllowance] = useState<string>('0');
  const [result, setResult] = useState<{
    severancePay: number;
    dailyAverageWage: number;
    threeMonthsTotalWage: number;
    threeMonthsDays: number;
    yearsOfService: number;
    daysDiff: number;
    calculationDetails: string;
  } | null>(null);

  // 자동 계산
  useEffect(() => {
    const calculate = () => {
    try {
      if (!startDate || !endDate) {
        setResult(null);
        return;
      }

      const cleanSalary = monthlySalary.replace(/,/g, '').trim();
      if (!cleanSalary) {
        setResult(null);
        return;
      }

      const salary = parseFloat(cleanSalary);
      if (isNaN(salary) || salary <= 0) {
        setResult(null);
        return;
      }

      const start = new Date(startDate + 'T00:00:00');
      const end = new Date(endDate + 'T00:00:00');

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        setResult(null);
        return;
      }

      if (end <= start) {
        setResult(null);
        return;
      }

      // 근속일수 계산 (2026년 기준)
      // 입사일부터 퇴사일까지의 일수
      // 근로기준법상 근속일수는 입사일부터 퇴사일 전날까지 계산 (퇴사일은 포함하지 않음)
      const daysDiff = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      
      // 근속연수 계산 (1년 = 365일 기준)
      // 근로기준법상 근속연수는 총 근속일수를 365일로 나눈 값
      const yearsOfService = daysDiff / 365;
      
      // 디버깅: 계산 값 확인
      console.log('근속일수 계산:', {
        startDate,
        endDate,
        start: start.toISOString(),
        end: end.toISOString(),
        daysDiff,
        yearsOfService,
      });

      // 평균임금 계산 (2026년 기준)
      // 퇴사 전 3개월 임금 계산
      const bonus = annualBonus ? parseFloat(annualBonus.replace(/,/g, '')) : 0;
      const leaveAllowance = annualLeaveAllowance ? parseFloat(annualLeaveAllowance.replace(/,/g, '')) : 0;
      
      // 월평균임금 = 월급 + 연간상여금/12 + 연차수당/12
      const monthlyAverage = salary + (bonus / 12) + (leaveAllowance / 12);

      // 퇴사 전 3개월 날짜 범위 계산 (2026년 기준)
      // 퇴사일 이전 3개월 기준으로 계산
      const endForCalculation = new Date(endDate + 'T00:00:00');
      const threeMonthsAgo = new Date(endForCalculation);
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      
      // 퇴사 전 3개월 총일수 계산
      // 퇴사일 직전날부터 역산 3개월의 일수
      // 근로기준법상 퇴사일 이전 3개월의 일수를 계산
      const threeMonthsDays = Math.floor((endForCalculation.getTime() - threeMonthsAgo.getTime()) / (1000 * 60 * 60 * 24));

      // 퇴사 전 3개월 임금 총액
      // 3개월 동안 동일한 임금이라 가정하거나, 각 월의 실제 일수 비율로 계산
      // 근로기준법상 실제 지급된 임금을 기준으로 계산해야 하므로, 
      // 간단히 월평균임금 × 3으로 계산 (각 월의 일수 비율은 실제로는 다를 수 있음)
      const threeMonthsTotalWage = monthlyAverage * 3; // 3개월 임금 총액

      // 1일 평균임금 = (퇴사 전 3개월 임금 총액) / (퇴사 전 3개월 총일수)
      // 근로기준법 제2조 제1항 제6호에 따른 평균임금 계산
      const dailyAverageWage = threeMonthsTotalWage / threeMonthsDays;

      // 퇴직금 계산 (근로기준법 제34조, 2026년 기준)
      // 퇴직금 = 평균임금 × 30일 × 근속연수
      // 여기서 근속연수는 1년 단위로 계산 (1년 미만은 그 비율)
      // 평균임금 = 1일 평균임금
      // 근속연수 = 총 근속일수 / 365일
      const severancePay = dailyAverageWage * 30 * yearsOfService;

      // 계산 상세 내역을 위한 formatNumber 함수 호출
      const formatNumberForDetails = (num: number) => {
        return Math.round(num).toLocaleString();
      };
      
      // 근속연수 포맷팅 (정수일 때는 소수점 없이, 소수점이 있을 때만 표시)
      const formatYearsOfService = (years: number) => {
        if (years % 1 === 0) {
          return Math.round(years).toString();
        }
        return years.toFixed(3);
      };
      
      const calculationDetails = `${formatNumberForDetails(threeMonthsTotalWage)}${getCurrency()} ÷ ${threeMonthsDays}일 = ${formatNumberForDetails(dailyAverageWage)}${getCurrency()}/일 × 30일 × ${formatYearsOfService(yearsOfService)}년`;

      setResult({
        severancePay: Math.round(severancePay),
        dailyAverageWage: Math.round(dailyAverageWage),
        threeMonthsTotalWage: Math.round(threeMonthsTotalWage),
        threeMonthsDays,
        yearsOfService,
        daysDiff,
        calculationDetails,
      });
    } catch (error) {
      console.error('계산 중 오류 발생:', error);
      setResult(null);
    }
    };

    calculate();
  }, [startDate, endDate, monthlySalary, sameFor3Months, annualBonus, annualLeaveAllowance]);

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

  const formatNumberWithDecimal = (num: number) => {
    if (isNaN(num) || !isFinite(num)) {
      return '0';
    }
    try {
      return num.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    } catch {
      return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  };

  const getCurrency = () => {
    return commonT('currency');
  };

  const handleSalaryAdd = (amount: number) => {
    const cleanSalary = monthlySalary.replace(/,/g, '').trim();
    const currentSalary = cleanSalary ? parseFloat(cleanSalary) : 0;
    const newSalary = currentSalary + amount;
    setMonthlySalary(formatNumber(newSalary));
  };

  const handleCopyResult = () => {
    if (result) {
      const text = `${t('result.severancePay')}: ${formatNumber(result.severancePay)}${getCurrency()}`;
      navigator.clipboard.writeText(text).then(() => {
        alert(t('result.copySuccess'));
      }).catch(() => {
        alert('복사에 실패했습니다.');
      });
    }
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setMonthlySalary('3000000');
    setSameFor3Months(true);
    setAnnualBonus('0');
    setAnnualLeaveAllowance('0');
    setResult(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Input Form */}
        <div className="space-y-6">
          {/* Required Input */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('requiredInput')}</h3>
            
            <div className="space-y-6">
              {/* Start Date */}
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('startDate')}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  />
                </div>
              </div>

              {/* End Date */}
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('endDate')}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  />
                </div>
              </div>

              {/* Monthly Salary */}
              <div>
                <label htmlFor="monthlySalary" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('monthlySalary')}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    id="monthlySalary"
                    value={monthlySalary}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      setMonthlySalary(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                    }}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  />
                  <span className="text-gray-600">{getCurrency().trim()}</span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={sameFor3Months}
                      onChange={(e) => setSameFor3Months(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">{t('sameFor3Months')}</span>
                  </label>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-gray-500">
                    {parseInt(monthlySalary.replace(/,/g, '') || '0') / 10000}만{getCurrency().trim()}
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => handleSalaryAdd(1000000)}
                    className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors"
                  >
                    {t('add1Million')}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSalaryAdd(100000)}
                    className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors"
                  >
                    {t('add100K')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Optional Input */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">{t('optionalInput')}</h3>
            
            <div className="space-y-6">
              {/* Annual Bonus */}
              <div>
                <label htmlFor="annualBonus" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('annualBonus')}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    id="annualBonus"
                    value={annualBonus}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      setAnnualBonus(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                    }}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  />
                  <span className="text-gray-600">{getCurrency().trim()}</span>
                </div>
              </div>

              {/* Annual Leave Allowance */}
              <div>
                <label htmlFor="annualLeaveAllowance" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('annualLeaveAllowance')}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    id="annualLeaveAllowance"
                    value={annualLeaveAllowance}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      setAnnualLeaveAllowance(value.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
                    }}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  />
                  <span className="text-gray-600">{getCurrency().trim()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Results */}
        {result && (
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg shadow-xl p-8 text-white">
              <h2 className="text-2xl font-semibold mb-8">{t('result.severancePay')}</h2>
              <div className="mb-8">
                <p className="text-5xl font-bold mb-2">
                  {formatNumber(result.severancePay)}{getCurrency()}
                </p>
              </div>
              
              <div className="mb-6 pt-6 border-t border-blue-600">
                <p className="text-sm text-blue-200 mb-1">{t('result.dailyAverageWage')}</p>
                <p className="text-2xl font-bold mb-4">
                  {formatNumberWithDecimal(result.dailyAverageWage)}{getCurrency()}
                </p>
                <div className="text-xs text-blue-300 space-y-1 mt-4 p-3 bg-blue-800/30 rounded">
                  <p>퇴사 전 3개월 임금 총액: {formatNumber(result.threeMonthsTotalWage)}{getCurrency()}</p>
                  <p>퇴사 전 3개월 총일수: {result.threeMonthsDays}일</p>
                  <p>총 근속일수: {formatNumber(result.daysDiff)}일</p>
                  <p>근속연수: {result.yearsOfService % 1 === 0 ? Math.round(result.yearsOfService) : result.yearsOfService.toFixed(3)}년 ({result.daysDiff}일 ÷ 365일)</p>
                  <p className="mt-2 pt-2 border-t border-blue-700">계산식: {result.calculationDetails}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={handleCopyResult}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-md transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  {t('result.copyResult')}
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-md transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {t('result.reset')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
