import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  const calculatorCategories = [
    {
      category: t('category.salaryWelfare'),
      calculators: [
        {
          href: `/${locale}/salary`,
          title: t('calculators.salary.title'),
          description: t('calculators.salary.description'),
          icon: '💰',
        },
        {
          href: `/${locale}/severance`,
          title: t('calculators.severance.title'),
          description: t('calculators.severance.description'),
          icon: '💼',
        },
        {
          href: `/${locale}/unemployment`,
          title: t('calculators.unemployment.title'),
          description: t('calculators.unemployment.description'),
          icon: '📋',
        },
      ],
    },
    {
      category: t('category.livingCosts'),
      calculators: [
        {
          href: `/${locale}/electric`,
          title: t('calculators.electric.title'),
          description: t('calculators.electric.description'),
          icon: '⚡',
        },
        {
          href: `/${locale}/gas`,
          title: t('calculators.gas.title'),
          description: t('calculators.gas.description'),
          icon: '🔥',
        },
      ],
    },
    {
      category: t('category.lifeCalc'),
      calculators: [
        {
          href: `/${locale}/military-discharge`,
          title: t('calculators.militaryDischarge.title'),
          description: t('calculators.militaryDischarge.description'),
          icon: '🎖️',
        },
        {
          href: `/${locale}/baby-days`,
          title: t('calculators.babyDays.title'),
          description: t('calculators.babyDays.description'),
          icon: '👶',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <p className="text-gray-700 text-center">
            {t('intro')}
          </p>
        </div>

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

