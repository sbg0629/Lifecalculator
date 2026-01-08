import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '생활 계산기 - 일상생활에 필요한 다양한 계산기 모음',
  description: '연봉 실수령액, 퇴직금, 실업급여, 전기요금, 가스요금 등 일상생활에 필요한 다양한 계산기를 제공하는 서비스입니다. 간편하고 정확한 계산으로 여러분의 생활을 도와드립니다.',
};

export default function Home() {
  const calculators = [
    {
      href: '/salary',
      title: '연봉 실수령액 계산기',
      description: '연봉을 입력하면 4대보험과 소득세를 제외한 실제 받게 되는 월 실수령액을 계산해드립니다.',
      icon: '💰',
    },
    {
      href: '/severance',
      title: '퇴직금 계산기',
      description: '평균임금과 근속연수를 입력하면 예상 퇴직금을 계산해드립니다.',
      icon: '💼',
    },
    {
      href: '/unemployment',
      title: '실업급여 계산기',
      description: '평균임금과 근속기간을 입력하면 예상 실업급여를 계산해드립니다.',
      icon: '📋',
    },
    {
      href: '/electric',
      title: '전기요금 계산기',
      description: '전기 사용량을 입력하면 예상 전기요금을 계산해드립니다.',
      icon: '⚡',
    },
    {
      href: '/gas',
      title: '가스요금 계산기',
      description: '가스 사용량을 입력하면 예상 가스요금을 계산해드립니다.',
      icon: '🔥',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            생활 계산기
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            일상생활에 필요한 다양한 계산기를 한 곳에서 제공합니다.
            <br />
            연봉 실수령액부터 퇴직금, 실업급여, 전기요금, 가스요금까지 간편하게 계산해보세요.
          </p>
        </div>

        {/* Site Introduction */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">서비스 소개</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              생활 계산기는 일상생활에서 자주 필요로 하는 다양한 계산기를 제공하는 서비스입니다. 
              복잡한 계산식을 몰라도 간단한 입력만으로 정확한 결과를 얻을 수 있습니다.
            </p>
            <p>
              우리 서비스는 연봉 실수령액 계산기, 퇴직금 계산기, 실업급여 계산기, 전기요금 계산기, 
              가스요금 계산기 등 5가지 주요 계산기를 제공합니다. 각 계산기는 한국의 법률과 규정을 
              기준으로 정확하게 계산되며, 사용자가 쉽게 이해할 수 있도록 직관적인 인터페이스를 제공합니다.
            </p>
            <p>
              연봉 실수령액 계산기는 연봉을 입력하면 국민연금, 건강보험, 고용보험, 산재보험 등 4대보험과 
              소득세를 제외한 실제 받게 되는 월 실수령액을 계산해드립니다. 퇴직금 계산기는 근로기준법에 
              따라 평균임금과 근속연수를 기반으로 예상 퇴직금을 산출합니다. 실업급여 계산기는 고용보험법에 
              따라 실업급여 수급액을 계산해드립니다.
            </p>
            <p>
              전기요금 계산기와 가스요금 계산기는 주택용 기준으로 사용량에 따른 예상 요금을 계산해드립니다. 
              각 계산기는 최신 요금제를 반영하여 정확한 결과를 제공하며, 사용자가 미리 예상 비용을 파악할 
              수 있도록 도와드립니다. 모든 계산은 클라이언트 측에서 이루어지며, 개인정보를 수집하거나 저장하지 
              않아 안전하게 사용하실 수 있습니다.
            </p>
          </div>
        </div>

        {/* Calculator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => (
            <Link
              key={calc.href}
              href={calc.href}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{calc.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {calc.title}
              </h3>
              <p className="text-gray-600">{calc.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
