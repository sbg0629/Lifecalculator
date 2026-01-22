'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('title')}</h3>
            <p className="text-sm text-gray-600">
              {t('description')}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('calculators')}</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <Link href={`/${locale}/salary`} className="text-gray-600 hover:text-blue-600">
                {nav('salary')}
              </Link>
              <Link href={`/${locale}/severance`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {nav('severance')}
              </Link>
              <Link href={`/${locale}/unemployment`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {nav('unemployment')}
              </Link>
              <Link href={`/${locale}/weekly-rest`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {nav('weeklyRest')}
              </Link>
              <Link href={`/${locale}/annual-leave`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {nav('annualLeave')}
              </Link>
              <Link href={`/${locale}/overtime`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {nav('overtime')}
              </Link>
              <Link href={`/${locale}/electric`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {nav('electric')}
              </Link>
              <Link href={`/${locale}/gas`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {nav('gas')}
              </Link>
              <Link href={`/${locale}/water`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {nav('water')}
              </Link>
              <Link href={`/${locale}/management`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {nav('management')}
              </Link>
              <Link href={`/${locale}/savings`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {nav('savings')}
              </Link>
              <Link href={`/${locale}/loan`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {nav('loan')}
              </Link>
              <Link href={`/${locale}/goal-savings`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {nav('goalSavings')}
              </Link>
              <Link href={`/${locale}/vat`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {nav('vat')}
              </Link>
              <Link href={`/${locale}/income-tax`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {nav('incomeTax')}
              </Link>
              <Link href={`/${locale}/military-discharge`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {nav('militaryDischarge')}
              </Link>
              <Link href={`/${locale}/baby-days`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {nav('babyDays')}
              </Link>
              <Link href={`/${locale}/dday`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {nav('dday')}
              </Link>
              <Link href={`/${locale}/age`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {nav('age')}
              </Link>
              <Link href={`/${locale}/bmi`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {nav('bmi')}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('legal')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}/privacy`} className="text-gray-600 hover:text-blue-600">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="text-gray-600 hover:text-blue-600">
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-gray-600 hover:text-blue-600">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} {t('title')}. {t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}

