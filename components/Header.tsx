'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('nav');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCalcMenuOpen, setIsCalcMenuOpen] = useState(false);

  const calculators = [
    { href: `/${locale}/salary`, label: t('salary') },
    { href: `/${locale}/severance`, label: t('severance') },
    { href: `/${locale}/unemployment`, label: t('unemployment') },
    { href: `/${locale}/weekly-rest`, label: t('weeklyRest') },
    { href: `/${locale}/annual-leave`, label: t('annualLeave') },
    { href: `/${locale}/overtime`, label: t('overtime') },
    { href: `/${locale}/electric`, label: t('electric') },
    { href: `/${locale}/gas`, label: t('gas') },
    { href: `/${locale}/water`, label: t('water') },
    { href: `/${locale}/management`, label: t('management') },
    { href: `/${locale}/savings`, label: t('savings') },
    { href: `/${locale}/loan`, label: t('loan') },
    { href: `/${locale}/goal-savings`, label: t('goalSavings') },
    { href: `/${locale}/vat`, label: t('vat') },
    { href: `/${locale}/income-tax`, label: t('incomeTax') },
    { href: `/${locale}/military-discharge`, label: t('militaryDischarge') },
    { href: `/${locale}/baby-days`, label: t('babyDays') },
    { href: `/${locale}/dday`, label: t('dday') },
    { href: `/${locale}/age`, label: t('age') },
    { href: `/${locale}/bmi`, label: t('bmi') },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={`/${locale}`} className="text-xl font-bold text-blue-600 hover:text-blue-700">
            {t('siteName')}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <div className="relative">
              <button
                onClick={() => setIsCalcMenuOpen(!isCalcMenuOpen)}
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 flex items-center"
              >
                {t('calculatorList')}
                <svg
                  className={`ml-1 h-4 w-4 transition-transform ${isCalcMenuOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isCalcMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  {calculators.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsCalcMenuOpen(false)}
                      className={`block px-4 py-2 text-sm ${
                        pathname === item.href
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 열기"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-1">
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 mb-2">
              <span className="text-sm font-medium text-gray-700">설정</span>
              <div className="flex items-center space-x-2">
                <LanguageSwitcher />
              </div>
            </div>
            {calculators.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
      {/* Click outside to close dropdown */}
      {isCalcMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsCalcMenuOpen(false)}
        />
      )}
    </header>
  );
}

