import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: '문의하기 - 생활 계산기',
  description: '생활 계산기 서비스에 대한 문의사항이나 건의사항을 보내주세요. 빠른 시일 내에 답변드리겠습니다.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">문의하기</h1>

        <ContactForm />
      </div>
    </div>
  );
}

