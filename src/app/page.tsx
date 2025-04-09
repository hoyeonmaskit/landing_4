'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Page component for the landing page
export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'free-beta' | 'pre-order'>('pre-order');
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('신청이 완료되었습니다. 곧 담당자가 연락드릴 예정입니다.');
  };

  const toggleFaq = (index: number) => {
    if (activeFaqIndex === index) {
      setActiveFaqIndex(null);
    } else {
      setActiveFaqIndex(index);
    }
  };

  return (
    <div className="w-full overflow-x-hidden font-sans">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Pain Point & Solution Section */}
      <PainPointSolution />

      {/* 3. Service & Benefits Section */}
      <ServiceBenefits />

      {/* 4. Application & FAQ Section */}
      <ApplicationFAQ 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        activeFaqIndex={activeFaqIndex} 
        toggleFaq={toggleFaq} 
        handleSubmit={handleSubmit} 
      />

      {/* 5. Footer Section */}
      <Footer />
    </div>
  );
}

// 1. Hero Section Component
function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-[#c8102e] to-[#9b0000] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <Image
          src="/images/concert-bg.jpg"
          alt="공연 배경 이미지"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex justify-center mb-10">
          <div className="flex items-center space-x-4">
            <Image src="/images/maskit-logo.png" alt="마스킷 로고" width={120} height={40} />
            <span className="text-2xl font-bold">X</span>
            <Image src="/images/cjes-logo.png" alt="CJeS 로고" width={120} height={40} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">공연 제작의 A to Z, 원스톱 서비스</h1>
          <p className="text-xl md:text-2xl mb-10">포스터 제작부터 티켓 정산까지, 하나의 서비스에서 해결하세요</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#apply" className="px-8 py-4 bg-white text-[#c8102e] hover:bg-gray-100 rounded-md text-lg font-semibold transition-colors shadow-lg">
              무료 베타 서비스 신청하기
            </a>
            <a href="#apply" className="px-8 py-4 bg-[#333] text-white hover:bg-gray-700 rounded-md text-lg font-semibold transition-colors shadow-lg">
              서비스 사전 예약하기
            </a>
          </div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </div>
      </div>
    </section>
  );
}

// 2. Pain Point & Solution Section Component
function PainPointSolution() {
  const painPoints = [
    { icon: "📅", title: "일정 관리", description: "여러 업체와 미팅 일정 조율" },
    { icon: "💰", title: "비용 증가", description: "분산된 계약으로 중복 비용 발생" },
    { icon: "🔄", title: "커뮤니케이션", description: "다중 채널 관리의 어려움" },
    { icon: "⏱️", title: "시간 소모", description: "행정 업무로 인한 창작 시간 감소" },
    { icon: "📊", title: "데이터 부재", description: "통합된 성과 분석 불가능" },
  ];

  const comparisonItems = [
    { category: "커뮤니케이션", traditional: "다중 채널, 혼선 발생", integrated: "단일 창구, 명확한 책임" },
    { category: "관리 시간", traditional: "주 20시간+", integrated: "주 5시간 이내" },
    { category: "일관성", traditional: "업체별 상이한 결과물", integrated: "통합된 브랜딩과 메시지" },
    { category: "비용 효율", traditional: "중복 비용, 높은 총액", integrated: "최적화된 패키지 가격" },
    { category: "데이터 활용", traditional: "분절된 정보, 낮은 활용도", integrated: "통합 인사이트, 의사결정 지원" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Pain Points */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            이 상황, 당신의 이야기인가요?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md text-center border-t-4 border-[#c8102e]"
              >
                <div className="text-4xl mb-4">{point.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
                <p className="text-gray-600">{point.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-[#fff9f9] rounded-lg shadow-md">
            <blockquote className="italic text-lg text-center text-[#c8102e]">
              &ldquo;정작 공연 콘텐츠에 집중할 시간이 없어요. 행정과 관리에 에너지를 다 쏟고 있습니다.&rdquo;
              <footer className="text-right mt-2 text-sm text-gray-500">— 공연 제작자</footer>
            </blockquote>
          </div>
        </div>

        {/* Solution Comparison */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-10">기존 방식 VS 마스킷 X CJeS 방식</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#c8102e] text-white">
                  <th className="p-4 text-left">카테고리</th>
                  <th className="p-4 text-left">기존 방식</th>
                  <th className="p-4 text-left">마스킷 X CJeS 방식</th>
                </tr>
              </thead>
              <tbody>
                {comparisonItems.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 font-medium border-b border-gray-200">{item.category}</td>
                    <td className="p-4 text-red-600 border-b border-gray-200">{item.traditional}</td>
                    <td className="p-4 text-[#c8102e] border-b border-gray-200 font-medium">{item.integrated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

// 3. Service & Benefits Section Component
function ServiceBenefits() {
  const benefits = [
    { title: "시간 절약", value: "75%", description: "주당 관리 시간 감소", icon: "⏱️" },
    { title: "비용 효율", value: "30%", description: "개별 업체 대비 비용 절감", icon: "💰" },
    { title: "전문성", value: "2개", description: "분야 전문 기업의 노하우", icon: "🏆" },
    { title: "편의성", value: "1개", description: "단일 창구 커뮤니케이션", icon: "🔄" },
  ];

  const services = [
    // ... 기존 services 코드는 유지
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">무료 베타 서비스 파트너를 찾습니다</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            6월 중 공연 예정인 프로젝트라면 장르나 규모에 상관없이 지원 가능합니다.
            개인 아티스트부터 중견 제작사까지, 공연 제작의 새로운 패러다임을 함께 만들어가세요.
          </p>
        </motion.div>

        {/* Services Flow */}
        <div className="mb-16 relative max-w-3xl mx-auto">
          {/* 기존 Services Flow 코드는 유지 */}
        </div>

        {/* Benefits - 개선된 부분 */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-10">이런 혜택을 누려보세요</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-lg p-6 text-center shadow-md border-t-4 ${
                  index % 4 === 0 ? 'border-[#c8102e]' : 
                  index % 4 === 1 ? 'border-blue-500' : 
                  index % 4 === 2 ? 'border-yellow-500' : 
                  'border-green-500'
                } hover:shadow-lg transition-all`}
              >
                <div className={`text-3xl mb-3 ${
                  index % 4 === 0 ? 'text-[#c8102e]' : 
                  index % 4 === 1 ? 'text-blue-500' : 
                  index % 4 === 2 ? 'text-yellow-500' : 
                  'text-green-500'
                }`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{benefit.title}</h3>
                <div className={`text-4xl font-bold mb-2 ${
                  index % 4 === 0 ? 'text-[#c8102e]' : 
                  index % 4 === 1 ? 'text-blue-500' : 
                  index % 4 === 2 ? 'text-yellow-500' : 
                  'text-green-500'
                }`}>
                  {benefit.value}
                </div>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <a href="#apply" className="inline-block px-8 py-4 bg-[#c8102e] text-white hover:bg-[#9b0000] rounded-md text-lg font-semibold transition-colors shadow-md">
              무료 베타 서비스 신청하기
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          * 유료 옵션은 별도 협의를 통해 제공됩니다. 예매 정산 수수료는 4%입니다.
        </div>
      </div>
    </section>
  );
}

// 4. Application & FAQ Section Component
function ApplicationFAQ({ 
  activeTab, 
  setActiveTab, 
  activeFaqIndex, 
  toggleFaq, 
  handleSubmit 
}: {
  activeTab: 'free-beta' | 'pre-order';
  setActiveTab: (tab: 'free-beta' | 'pre-order') => void;
  activeFaqIndex: number | null;
  toggleFaq: (index: number) => void;
  handleSubmit: (e: React.FormEvent) => void;
}) {
  const faqs = [
    {
      question: "무료 베타 서비스는 어떤 조건을 충족해야 신청할 수 있나요?",
      answer: "6월 중 진행되는 공연이면 신청 가능합니다. 장르나 규모에 제한이 없으며, 개인 아티스트부터 중견 제작사까지 모두 지원 가능합니다."
    },
    {
      question: "서비스 범위와 한계는 어디까지인가요?",
      answer: "기본적으로 포스터 디자인, 홍보 영상 제작, SNS 홍보 관리, 모바일 티켓 시스템을 무료로 제공합니다. 무대 제작, 대관, 운영 지원은 유료 옵션으로 이용 가능합니다."
    },
    {
      question: "베타 서비스 신청 후 진행 과정은 어떻게 되나요?",
      answer: "신청서 제출 → 인터뷰 및 선정 → 킥오프 미팅 → 서비스 진행 순으로 이루어집니다. 선정된 파트너에게는 개별 연락을 통해 자세한 일정을 안내해 드립니다."
    },
    {
      question: "정식 서비스는 언제부터 시작되나요?",
      answer: "베타 테스트 결과를 반영하여 7월부터 정식 서비스를 시작할 예정입니다. 정식 서비스에 대한 자세한 사항은 사전 예약 신청 후 안내해 드립니다."
    },
    {
      question: "기존에 진행 중인 공연 제작 과정에도 적용할 수 있나요?",
      answer: "이미 진행 중인 프로젝트의 경우, 남은 단계에 한해 서비스 적용이 가능합니다. 자세한 사항은 개별 상담을 통해 안내해 드립니다."
    }
  ];

  return (
    <section id="apply" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">지금 바로 신청하세요</h2>
        
        {/* Application Tabs & Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="flex mb-8">
            <button
              onClick={() => setActiveTab('free-beta')}
              className={`flex-1 py-3 text-center text-lg font-medium ${
                activeTab === 'free-beta'
                  ? 'bg-white text-[#c8102e] border-2 border-[#c8102e]'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              무료 베타 서비스 신청
            </button>
            <button
              onClick={() => setActiveTab('pre-order')}
              className={`flex-1 py-3 text-center text-lg font-medium ${
                activeTab === 'pre-order'
                  ? 'bg-[#333] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              서비스 사전 예약
            </button>
          </div>

          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 border-t-4 border-[#c8102e]">
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">공연명 *</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c8102e] focus:border-transparent"
                required
                placeholder="공연명을 입력해주세요"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">장르 *</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                required
                placeholder="공연 장르를 입력해주세요"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">예상 공연 시기 *</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent" required>
                <option value="">선택해주세요</option>
                {activeTab === 'free-beta' ? (
                  <>
                    <option value="2025-06-early">2025년 6월 초</option>
                    <option value="2025-06-mid">2025년 6월 중순</option>
                    <option value="2025-06-late">2025년 6월 말</option>
                  </>
                ) : (
                  <>
                    <option value="2025-07">2025년 7월</option>
                    <option value="2025-08">2025년 8월</option>
                    <option value="2025-09">2025년 9월</option>
                    <option value="2025-10">2025년 10월 이후</option>
                    <option value="undecided">미정</option>
                  </>
                )}
              </select>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">예상 공연 규모 (관객 수) *</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                required
                placeholder="예상 관객 수를 입력해주세요"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">연락처 (이메일) *</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                required
                placeholder="연락받으실 이메일을 입력해주세요"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">공연 기획 의도</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-[#800020] focus:border-transparent"
                placeholder="공연 기획 의도나 컨셉을 자유롭게 작성해주세요"
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">관심 서비스 (복수 선택 가능)</label>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 accent-[#c8102e]" />
                  포스터 제작
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 accent-[#800020]" />
                  홍보 영상 제작
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 accent-[#800020]" />
                  SNS 홍보
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 accent-[#800020]" />
                  티켓 시스템
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 accent-[#800020]" />
                  무대 제작 (유료)
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2 accent-[#800020]" />
                  대관 지원 (유료)
                </label>
              </div>
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 accent-[#c8102e]" required />
                <span className="text-sm text-gray-700">개인정보 수집 및 이용에 동의합니다 *</span>
              </label>
            </div>

            <button
              type="submit"
              className={`w-full py-3 ${
                activeTab === 'free-beta' 
                  ? 'bg-white text-[#c8102e] hover:bg-[#fff0f0] border border-[#c8102e]' 
                  : 'bg-[#333] hover:bg-gray-700 text-white'
              } rounded-md text-lg font-semibold transition-colors shadow-md`}
            >
              {activeTab === 'free-beta' ? '무료 베타 신청하기' : '서비스 사전 예약하기'}
            </button>
          </form>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">자주 묻는 질문</h2>
          
          <div className="bg-white rounded-lg shadow-md">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 last:border-0">
                <button
                  className="w-full flex justify-between items-center p-5 text-left"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${activeFaqIndex === index ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeFaqIndex === index ? 'max-h-40' : 'max-h-0'
                  }`}
                >
                  <div className="p-5 pt-0 text-gray-600">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// 5. Footer Section Component
function Footer() {
  return (
    <footer className="bg-[#333] text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-4 mb-4">
              <Image src="/images/maskit-logo-white.png" alt="마스킷 로고" width={100} height={30} />
              <span className="text-xl font-bold">X</span>
              <Image src="/images/cjes-logo-white.png" alt="CJeS 로고" width={100} height={30} />
            </div>
            <p className="text-gray-300 max-w-md">
              마스킷과 CJeS 엔터테인먼트의 협력으로 탄생한 공연 제작 원스톱 서비스입니다.
              포스터 디자인부터 정산까지, 공연 제작의 A to Z를 한 곳에서 경험하세요.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">마스킷</h3>
              <ul className="space-y-2 text-gray-300">
                <li>예매 시스템 전문 기업</li>
                <li>모바일 티켓 솔루션</li>
                <li>공연 데이터 분석</li>
                <li>정산 처리 서비스</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">CJeS 엔터테인먼트</h3>
              <ul className="space-y-2 text-gray-300">
                <li>홍보 및 마케팅</li>
                <li>포스터 및 홍보물 디자인</li>
                <li>SNS 콘텐츠 제작</li>
                <li>공연 운영 지원</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-300">© 2025 마스킷 X CJeS 엔터테인먼트. All rights reserved.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href="mailto:contact@maskit-cjes.com" className="text-gray-300 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
              </svg>
            </a>
            <a href="tel:+82021234567" className="text-gray-300 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path>
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.06 1.805.249 2.227.419.562.217.96.477 1.382.896.419.42.679.819.896 1.381.17.422.359 1.057.419 2.227.058 1.265.07 1.645.07 4.85s-.012 3.585-.07 4.85c-.06 1.17-.249 1.805-.419 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.17-1.057.359-2.227.419-1.265.058-1.645.07-4.85.07s-3.585-.012-4.85-.07c-1.17-.06-1.805-.249-2.227-.419-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.17-.422-.359-1.057-.419-2.227-.058-1.265-.07-1.645-.07-4.85s.012-3.585.07-4.85c.06-1.17.249-1.805.419-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.17 1.057-.359 2.227-.419 1.265-.058 1.645-.07 4.85-.07zm0 2.163c-3.259 0-3.667.014-4.85.072-1.066.049-1.603.222-1.978.372-.4.167-.734.374-1.05.69-.317.317-.524.65-.691 1.05-.15.375-.322.91-.37 1.979-.059 1.184-.072 1.592-.072 4.85 0 3.259.014 3.668.072 4.85.048 1.066.221 1.603.37 1.978.167.4.374.734.69 1.05.317.317.65.524 1.05.691.375.15.91.323 1.978.371 1.184.059 1.591.072 4.85.072 3.259 0 3.668-.014 4.85-.072 1.066-.048 1.603-.221 1.978-.37.4-.167.734-.374 1.05-.69.317-.317.524-.65.691-1.05.15-.375.322-.91.37-1.979.059-1.184.072-1.592.072-4.85 0-3.259-.014-3.667-.072-4.85-.048-1.066-.221-1.603-.37-1.978-.167-.4-.374-.734-.69-1.05-.317-.317-.65-.524-1.05-.691-.375-.15-.91-.323-1.978-.371-1.184-.059-1.592-.072-4.85-.072zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793 0 1.44.645 1.44 1.439z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );