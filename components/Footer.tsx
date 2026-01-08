'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
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
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}/salary`} className="text-gray-600 hover:text-blue-600">
                  {nav('salary')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/severance`} className="text-gray-600 hover:text-blue-600">
                  {nav('severance')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/unemployment`} className="text-gray-600 hover:text-blue-600">
                  {nav('unemployment')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/electric`} className="text-gray-600 hover:text-blue-600">
                  {nav('electric')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/gas`} className="text-gray-600 hover:text-blue-600">
                  {nav('gas')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/military-discharge`} className="text-gray-600 hover:text-blue-600">
                  {nav('militaryDischarge')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/baby-days`} className="text-gray-600 hover:text-blue-600">
                  {nav('babyDays')}
                </Link>
              </li>
            </ul>
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

