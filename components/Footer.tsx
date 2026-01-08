import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">생활 계산기</h3>
            <p className="text-sm text-gray-600">
              일상생활에 필요한 다양한 계산기를 제공하는 서비스입니다.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">계산기</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/salary" className="text-gray-600 hover:text-blue-600">
                  연봉 실수령액
                </Link>
              </li>
              <li>
                <Link href="/severance" className="text-gray-600 hover:text-blue-600">
                  퇴직금 계산기
                </Link>
              </li>
              <li>
                <Link href="/unemployment" className="text-gray-600 hover:text-blue-600">
                  실업급여 계산기
                </Link>
              </li>
              <li>
                <Link href="/electric" className="text-gray-600 hover:text-blue-600">
                  전기요금 계산기
                </Link>
              </li>
              <li>
                <Link href="/gas" className="text-gray-600 hover:text-blue-600">
                  가스요금 계산기
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">법적 고지</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-blue-600">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600">
                  문의하기
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} 생활 계산기. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

