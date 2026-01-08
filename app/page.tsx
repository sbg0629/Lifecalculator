import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '생활 계산기 - 일상생활에 필요한 다양한 계산기 모음',
  description: '연봉 실수령액, 퇴직금, 실업급여, 전기요금, 가스요금 등 일상생활에 필요한 다양한 계산기를 제공하는 서비스입니다. 간편하고 정확한 계산으로 여러분의 생활을 도와드립니다.',
};

export default function Home() {
  const calculatorCategories = [
    {
      category: '급여·복지',
      calculators: [
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
      ],
    },
    {
      category: '생활비용',
      calculators: [
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
      ],
    },
    {
      category: '생활계산',
      calculators: [
        {
          href: '/military-discharge',
          title: '전역일 계산기',
          description: '입대일과 군종을 입력하면 예상 전역일과 복무 진행률을 계산해드립니다.',
          icon: '🎖️',
        },
        {
          href: '/baby-days',
          title: '아기 태어난지 계산기',
          description: '아기의 출생일을 입력하면 태어난지 며칠째인지, 몇 주, 몇 개월인지 계산해드립니다.',
          icon: '👶',
        },
      ],
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
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <p className="text-gray-700 text-center">
            일상생활에 필요한 다양한 계산기를 한 곳에서 제공합니다.
            <br />
            복잡한 계산식 없이 간단한 입력만으로 정확한 결과를 얻을 수 있습니다.
          </p>
        </div>

        {/* Calculator Cards by Category */}
        {calculatorCategories.map((category) => (
          <div key={category.category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.calculators.map((calc) => (
                <Link
                  key={calc.href}
                  href={calc.href}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4">{calc.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {calc.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{calc.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
