import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 - 생활 계산기',
  description: '생활 계산기의 개인정보처리방침입니다. 개인정보의 수집, 이용, 보관, 파기 등에 대한 정책을 안내합니다.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">개인정보처리방침</h1>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. 개인정보의 처리 목적</h2>
            <p className="text-gray-700 leading-relaxed">
              생활 계산기는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 
              이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
              <li>서비스 제공: 계산기 기능 제공, 콘텐츠 제공</li>
              <li>서비스 개선: 신규 서비스 개발, 맞춤 서비스 제공, 서비스 품질 향상</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. 개인정보의 처리 및 보유기간</h2>
            <p className="text-gray-700 leading-relaxed">
              생활 계산기는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 
              개인정보를 처리·보유합니다. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              현재 생활 계산기는 사용자의 개인정보를 수집하지 않습니다. 모든 계산은 클라이언트 측에서 이루어지며, 
              서버에 개인정보를 저장하거나 전송하지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. 처리하는 개인정보의 항목</h2>
            <p className="text-gray-700 leading-relaxed">
              생활 계산기는 다음의 개인정보 항목을 처리하고 있습니다.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              현재 생활 계산기는 사용자의 개인정보를 수집하지 않습니다. 계산에 필요한 정보(연봉, 근속연수, 사용량 등)는 
              브라우저에서만 처리되며, 서버로 전송되지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. 개인정보의 제3자 제공</h2>
            <p className="text-gray-700 leading-relaxed">
              생활 계산기는 정보주체의 개인정보를 제3자에게 제공하지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. 개인정보처리의 위탁</h2>
            <p className="text-gray-700 leading-relaxed">
              생활 계산기는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              현재 개인정보 처리업무를 위탁하는 경우는 없습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. 정보주체의 권리·의무 및 그 행사방법</h2>
            <p className="text-gray-700 leading-relaxed">
              정보주체는 생활 계산기에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
              <li>개인정보 처리정지 요구권</li>
              <li>개인정보 열람요구권</li>
              <li>개인정보 정정·삭제요구권</li>
              <li>개인정보 처리정지 요구권</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. 개인정보의 파기</h2>
            <p className="text-gray-700 leading-relaxed">
              생활 계산기는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              현재 생활 계산기는 사용자의 개인정보를 수집하지 않으므로 파기할 개인정보가 없습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. 개인정보 보호책임자</h2>
            <p className="text-gray-700 leading-relaxed">
              생활 계산기는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 
              아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-md">
              <p className="text-gray-700">
                <strong>개인정보 보호책임자</strong>
                <br />
                연락처: 문의하기 페이지를 통해 연락주시기 바랍니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. 개인정보 처리방침 변경</h2>
            <p className="text-gray-700 leading-relaxed">
              이 개인정보처리방침은 2026년 1월 1일부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 
              변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

