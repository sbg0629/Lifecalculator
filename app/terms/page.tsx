import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관 - 생활 계산기',
  description: '생활 계산기의 이용약관입니다. 서비스 이용에 대한 약관 및 규정을 안내합니다.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">이용약관</h1>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">제1조 (목적)</h2>
            <p className="text-gray-700 leading-relaxed">
              이 약관은 생활 계산기(이하 "회사"라 합니다)가 제공하는 생활 계산기 서비스(이하 "서비스"라 합니다)의 이용과 관련하여 
              회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">제2조 (정의)</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>"서비스"란 회사가 제공하는 연봉 실수령액, 퇴직금, 실업급여, 전기요금, 가스요금 계산기 등의 서비스를 의미합니다.</li>
              <li>"이용자"란 이 약관에 따라 회사가 제공하는 서비스를 받는 개인 또는 법인을 의미합니다.</li>
              <li>"콘텐츠"란 서비스를 통해 제공되는 정보, 텍스트, 그래픽, 링크 등을 의미합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">제3조 (약관의 게시와 개정)</h2>
            <p className="text-gray-700 leading-relaxed">
              회사는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다. 회사는 필요한 경우 관련 법령을 위배하지 
              않는 범위에서 이 약관을 개정할 수 있습니다. 약관이 개정되는 경우 회사는 개정된 약관의 내용과 시행일을 명시하여 현행 약관과 
              함께 서비스의 초기 화면에 그 시행일 7일 이전부터 시행일 후 상당한 기간 동안 공지합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">제4조 (서비스의 제공 및 변경)</h2>
            <p className="text-gray-700 leading-relaxed">
              회사는 다음과 같은 서비스를 제공합니다.
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
              <li>연봉 실수령액 계산기</li>
              <li>퇴직금 계산기</li>
              <li>실업급여 계산기</li>
              <li>전기요금 계산기</li>
              <li>가스요금 계산기</li>
              <li>기타 회사가 추가로 개발하거나 제휴계약 등을 통해 제공하는 일체의 서비스</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              회사는 서비스의 내용을 변경할 수 있으며, 변경 시에는 사전에 공지합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">제5조 (서비스의 중단)</h2>
            <p className="text-gray-700 leading-relaxed">
              회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 
              중단할 수 있습니다. 회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 
              배상합니다. 단, 회사가 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">제6조 (이용자의 의무)</h2>
            <p className="text-gray-700 leading-relaxed">
              이용자는 다음 행위를 하여서는 안 됩니다.
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
              <li>신청 또는 변경 시 허위내용의 등록</li>
              <li>타인의 정보 도용</li>
              <li>회사가 게시한 정보의 변경</li>
              <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
              <li>회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
              <li>회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
              <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">제7조 (계산 결과의 정확성)</h2>
            <p className="text-gray-700 leading-relaxed">
              회사가 제공하는 계산기는 참고용으로 제공되며, 실제 금액과 다를 수 있습니다. 계산 결과는 법령, 규정, 요금제 등의 변경에 따라 
              달라질 수 있으며, 회사는 계산 결과의 정확성을 보장하지 않습니다. 정확한 금액은 관련 기관에 직접 문의하시기 바랍니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">제8조 (면책조항)</h2>
            <p className="text-gray-700 leading-relaxed">
              회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다. 
              회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다. 회사는 이용자가 서비스를 이용하여 기대하는 
              수익을 상실한 것에 대하여 책임을 지지 않으며, 그 밖의 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">제9조 (준거법 및 관할법원)</h2>
            <p className="text-gray-700 leading-relaxed">
              이 약관의 해석 및 회사와 이용자 간의 분쟁에 대하여는 대한민국 법을 적용하며, 본 서비스와 관련하여 분쟁이 발생한 경우 소송의 
              관할은 회사의 본사 소재지를 관할하는 법원으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">부칙</h2>
            <p className="text-gray-700 leading-relaxed">
              이 약관은 2026년 1월 1일부터 시행됩니다.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

