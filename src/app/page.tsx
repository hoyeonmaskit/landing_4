'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';



// Page component for the landing page
export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'free-beta' | 'pre-order'>('pre-order');
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        setShowSuccessModal={setShowSuccessModal}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
      />

      {/* Success Modal */}
      {showSuccessModal && (
        <SuccessModal 
          isOpen={showSuccessModal} 
          onClose={() => setShowSuccessModal(false)} 
          formType={activeTab}
          setIsSubmitting={setIsSubmitting}
        />
      )}

      {/* 5. Footer Section */}
      <Footer />
    </div>
  );
}

// 1. Hero Section Component
function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-[#c8102e] via-[#b01e2c] to-[#9b0000] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiPjwvcmVjdD4KPC9zdmc+')]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#9b0000]/10 to-[#9b0000]/50"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex justify-center mb-10">
          <div className="flex items-center space-x-4">
            <Image src="/images/maskit-logo-white.png" alt="마스킷 로고" width={120} height={36} />
            <span className="text-2xl font-bold">X</span>
            <span className="text-2xl md:text-3xl font-bold font-pretendard">CJeS STUDIO</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-lg md:text-xl mb-3 backdrop-blur-sm">
              <span className="font-bold text-white">큐리스 프로덕션</span> 서비스 런칭
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">공연 제작의 A to Z 원스탑 서비스</h1>
          <p className="text-xl md:text-2xl mb-4">공연 기획부터 티켓 정산까지</p>
          <p className="text-xl md:text-2xl mb-10 font-bold">큐리스 프로덕션의 원스탑 솔루션을 경험해보세요</p>
          
          <div className="flex justify-center">
            <a href="#apply" className="px-10 py-4 bg-white text-[#c8102e] hover:bg-gray-100 rounded-md text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              서비스 신청하기
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
          <h2 className="text-3xl font-bold text-center mb-10">하나의 서비스 창구에서 편리한 공연 제작</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#c8102e] text-white">
                  <th className="p-4 text-center text-sm">카테고리</th>
                  <th className="p-4 text-center text-sm">기존</th>
                  <th className="p-4 text-center text-sm">큐리스 프로덕션</th>
                </tr>
              </thead>
              <tbody>
                {comparisonItems.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4 font-medium border-b border-gray-200 text-center text-sm">{item.category}</td>
                    <td className="p-4 text-gray-500 border-b border-gray-200 text-center text-sm">{item.traditional}</td>
                    <td className="p-4 text-[#c8102e] border-b border-gray-200 font-semibold text-center text-sm">{item.integrated}</td>
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
    { 
      step: 1,
      title: "기획 및 컨설팅",
      description: "공연 콘셉트 기획 및 예산 설정",
      isFree: true,
      icon: "✍️"
    },
    { 
      step: 2,
      title: "대관",
      description: "최적의 공연장 추천 및 계약 지원",
      isFree: false,
      icon: "🏛️"
    },
    { 
      step: 3,
      title: "포스터 제작",
      description: "전문 디자이너의 맞춤형 포스터",
      isFree: true,
      icon: "🎨"
    },
    { 
      step: 4,
      title: "홍보 영상",
      description: "1분 이내 SNS용 홍보 영상",
      isFree: true,
      icon: "🎬"
    },
    { 
      step: 5,
      title: "무대 제작",
      description: "공연 콘셉트에 맞는 무대 설계",
      isFree: false,
      icon: "🎭"
    },
    { 
      step: 6,
      title: "SNS 홍보",
      description: "콘텐츠 업로드 및 일정 관리",
      isFree: true,
      icon: "📱"
    },
    { 
      step: 7,
      title: "티켓 시스템",
      description: "모바일 티켓 발권 및 관리",
      isFree: true,
      icon: "🎟️"
    },
    { 
      step: 8,
      title: "당일 운영",
      description: "전문 스태프의 현장 지원",
      isFree: false,
      icon: "👥"
    },
    { 
      step: 9,
      title: "정산",
      description: "티켓 판매 정산 처리",
      isFree: false,
      icon: "💰"
    },
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
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-2">
            6월~7월 예정인 공연이라면 장르나 규모에 상관없이 지원 가능합니다.
            개인 아티스트부터 중견 제작사까지,
          </p>
          <p className="text-xl md:text-2xl font-bold text-[#c8102e] max-w-3xl mx-auto animate-pulse">
            공연 제작 원스탑 솔루션을 경험해보세요
          </p>
          <p className="text-sm text-[#c8102e] font-medium mt-4">
            ※ 선착순 모집으로 인해 무료 베타 서비스 파트너는 조기 마감될 수 있습니다.
          </p>
        </motion.div>

        {/* Services Flow */}
        <div className="mb-16 relative max-w-3xl mx-auto">
          {/* Desktop & Mobile Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#ffb6c1] to-[#c8102e]"></div>

            <div className="space-y-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#c8102e] rounded-full border-4 border-white flex items-center justify-center text-white font-bold z-10">
                    {service.step}
                  </div>

                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-2xl">{service.icon}</div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          service.isFree 
                            ? 'bg-[#fff0f0] text-[#c8102e] border border-[#c8102e]' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {service.isFree ? '무료' : '유료'}
                        </span>
                      </div>
                      <div className="text-sm font-semibold mb-1">
                        {service.title}
                      </div>
                      <p className="text-xs text-gray-600">{service.description}</p>
                    </div>
                  </div>

                  {/* Empty space for timeline balance */}
                  <div className="w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
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
              서비스 신청하기
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          * 유료 옵션은 별도 협의를 통해 제공됩니다. 예매 정산 수수료는 4%입니다.
        </div>

        {/* 서비스 진행 일정 */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">무료 베타 서비스 진행 일정</h2>
          
          <div className="relative py-16">
            {/* 수평선 */}
            <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ffb6c1] to-[#c8102e] transform -translate-y-1/2"></div>
            
            {/* 타임라인 항목들 */}
            <div className="grid grid-cols-5 relative">
              {/* 5월: 신청 접수 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white border-4 border-[#c8102e] rounded-full flex items-center justify-center text-[#c8102e] font-bold text-lg z-10 mb-6 shadow-md">1</div>
                <div className="text-center bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100 mt-2">
                  <h3 className="font-bold text-[#c8102e] mb-1">5월</h3>
                  <p className="text-sm text-gray-700">신청 접수</p>
                </div>
              </div>
              
              {/* 5월 셋째주: 선정 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white border-4 border-[#c8102e] rounded-full flex items-center justify-center text-[#c8102e] font-bold text-lg z-10 mb-6 shadow-md">2</div>
                <div className="text-center bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100 mt-2">
                  <h3 className="font-bold text-[#c8102e] mb-1">5월 셋째주</h3>
                  <p className="text-sm text-gray-700">무료 베타 서비스<br/>대상 공연 선정</p>
                </div>
              </div>
              
              {/* 6월 1일: 예매 시작 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white border-4 border-[#c8102e] rounded-full flex items-center justify-center text-[#c8102e] font-bold text-lg z-10 mb-6 shadow-md">3</div>
                <div className="text-center bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100 mt-2">
                  <h3 className="font-bold text-[#c8102e] mb-1">6월 1일</h3>
                  <p className="text-sm text-gray-700">제작 지원 및<br/>예매 시작</p>
                </div>
              </div>
              
              {/* 공연 진행 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white border-4 border-[#c8102e] rounded-full flex items-center justify-center text-[#c8102e] font-bold text-lg z-10 mb-6 shadow-md">4</div>
                <div className="text-center bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100 mt-2">
                  <h3 className="font-bold text-[#c8102e] mb-1">6월~7월</h3>
                  <p className="text-sm text-gray-700">공연 진행</p>
                </div>
              </div>
              
              {/* 결과 리포트 및 정산 */}
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-white border-4 border-[#c8102e] rounded-full flex items-center justify-center text-[#c8102e] font-bold text-lg z-10 mb-6 shadow-md">5</div>
                <div className="text-center bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100 mt-2">
                  <h3 className="font-bold text-[#c8102e] mb-1">공연 종료 후</h3>
                  <p className="text-sm text-gray-700">결과 리포트<br/>제공 및 정산</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* 중요 안내사항 박스 */}
          <div className="mt-12 bg-[#fff9f9] border border-[#ffb6c1] rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-[#c8102e]">중요 안내사항</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#c8102e] mr-2">•</span>
                <p><strong>무료 베타 서비스는 6월~7월 예정 공연</strong>을 대상으로 하며, <strong>선착순으로 모집</strong>되어 조기에 마감될 수 있습니다.</p>
              </li>
              <li className="flex items-start">
                <span className="text-[#c8102e] mr-2">•</span>
                <p><strong>서비스 사전 예약은 공연 일정과 관계없이 가능</strong>하며, 정식 출시 시 우선적인 서비스 혜택을 받으실 수 있습니다.</p>
              </li>
              <li className="flex items-start">
                <span className="text-[#c8102e] mr-2">•</span>
                <p><strong>6월 1일부터 티켓 예매가 가능</strong>합니다. 티켓 예매 페이지는 선정된 공연에 한해 오픈됩니다.</p>
              </li>
              <li className="flex items-start">
                <span className="text-[#c8102e] mr-2">•</span>
                <p><strong>무료 베타 서비스는 서비스 품질 개선을 위한 피드백을 적극적으로 제공</strong>해 주셔야 합니다. 이는 더 나은 서비스를 위한 중요한 자료로 활용됩니다.</p>
              </li>
              <li className="flex items-start">
                <span className="text-[#c8102e] mr-2">•</span>
                <p>베타 서비스 이후 <strong>무료 공연 데이터 분석 리포트를 제공</strong>해 드립니다. 이를 통해 공연의 성과를 객관적으로 분석할 수 있습니다.</p>
              </li>
            </ul>
          </div>
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
  setShowSuccessModal,
  isSubmitting,
  setIsSubmitting
}: {
  activeTab: 'free-beta' | 'pre-order';
  setActiveTab: (tab: 'free-beta' | 'pre-order') => void;
  activeFaqIndex: number | null;
  toggleFaq: (index: number) => void;
  setShowSuccessModal: (show: boolean) => void;
  isSubmitting: boolean;
  setIsSubmitting: (isSubmitting: boolean) => void;
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
        
        {/* Application Form */}
        <div className="max-w-2xl mx-auto mb-16">

          {/* Application Form */}
          <form 
            action="https://formsubmit.co/54bd27af5c5937bb4c4b043c746f1824"
            method="POST"
            className="bg-white shadow-md rounded-lg p-6 border-t-4 border-[#c8102e]"
            onSubmit={(e) => {
              const form = e.currentTarget;
              
              // 기본 필드 검증
              const companyNameField = form.querySelector('input[name="회사/단체명"]') as HTMLInputElement;
              const phoneField = form.querySelector('input[name="phone"]') as HTMLInputElement;
              const emailField = form.querySelector('input[name="email"]') as HTMLInputElement;
              const performanceNameField = form.querySelector('input[name="공연명"]') as HTMLInputElement;
              const genreField = form.querySelector('input[name="장르"]') as HTMLInputElement;
              const audienceField = form.querySelector('input[name="예상 관객 수"]') as HTMLInputElement;
              const dateField = form.querySelector('select[name="예상 공연 시기"]') as HTMLSelectElement;
              const progressField = form.querySelector('select[name="현재 진행 수준"]') as HTMLSelectElement;
              
              // 이메일 형식 검증
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(emailField.value)) {
                e.preventDefault();
                alert('올바른 이메일 주소를 입력해주세요.');
                emailField.focus();
                return;
              }
              
              // 전화번호 형식 검증
              if (phoneField.value.length < 10 || phoneField.value.length > 11 || !/^[0-9]+$/.test(phoneField.value)) {
                e.preventDefault();
                alert('올바른 전화번호를 입력해주세요. (10-11자리 숫자)');
                phoneField.focus();
                return;
              }
              
              // 공연명 길이 검증
              if (performanceNameField.value.length < 2) {
                e.preventDefault();
                alert('공연명은 최소 2자 이상 입력해주세요.');
                performanceNameField.focus();
                return;
              }
              
              // 장르 검증
              if (genreField.value.length < 2) {
                e.preventDefault();
                alert('장르는 최소 2자 이상 입력해주세요.');
                genreField.focus();
                return;
              }
              
              // 관람객 수 검증
              const audienceCount = parseInt(audienceField.value, 10);
              if (isNaN(audienceCount) || audienceCount < 1) {
                e.preventDefault();
                alert('예상 관객 수는 1명 이상이어야 합니다.');
                audienceField.focus();
                return;
              }
              
              // 공연 시기 검증
              if (!dateField.value) {
                e.preventDefault();
                alert('예상 공연 시기를 선택해주세요.');
                dateField.focus();
                return;
              }
              
              // 진행 수준 검증
              if (!progressField.value) {
                e.preventDefault();
                alert('현재 진행 수준을 선택해주세요.');
                progressField.focus();
                return;
              }
              
              // 관심 서비스 체크박스 유효성 검사
              const checkboxes = Array.from(form.querySelectorAll('input[name="관심 서비스[]"]')) as HTMLInputElement[];
              const checked = checkboxes.some(checkbox => checkbox.checked);
              
              if (!checked) {
                e.preventDefault();
                alert('관심 서비스를 최소 1개 이상 선택해주세요.');
                return;
              }
              
              // 개인정보 수집 동의 검증
              const privacyCheckbox = form.querySelector('input[type="checkbox"][required]') as HTMLInputElement;
              if (!privacyCheckbox.checked) {
                e.preventDefault();
                alert('개인정보 수집 및 이용에 동의해주셔야 합니다.');
                privacyCheckbox.focus();
                return;
              }

              // 로딩 상태 활성화 및 모달 표시
              e.preventDefault();
              setIsSubmitting(true);
              setShowSuccessModal(true);
            }}
          >
            {/* FormSubmit Configuration */}
            <input type="hidden" name="_next" value="https://maskitlab.com" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_cc" value="hoyeon.bae@gmail.com" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_subject" value={`[마스킷 X CJeS] 공연 제작 서비스 신청`} />
            <input type="hidden" name="_autoresponse" value={`마스킷 X CJeS 공연제작 서비스 신청이 완료되었습니다.\n\n신청하신 내용을 검토한 후, 추가 안내사항을 이메일로 전달해드리도록 하겠습니다.\n\n감사합니다.`} />

            {/* 신청자 정보 섹션 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">신청자 정보</h3>
              
              {/* 신청자 유형 */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">신청자 유형 *</label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center">
                    <input type="radio" name="신청자 유형" value="개인" required className="mr-2 accent-[#c8102e]" />
                    <span>개인</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="신청자 유형" value="개인사업자" required className="mr-2 accent-[#c8102e]" />
                    <span>개인사업자</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="신청자 유형" value="법인사업자" required className="mr-2 accent-[#c8102e]" />
                    <span>법인사업자</span>
                  </label>
                </div>
              </div>

              {/* 회사/단체명 */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">회사/단체명</label>
                <input
                  type="text"
                  name="회사/단체명"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c8102e] focus:border-transparent"
                  placeholder="회사 또는 단체명을 입력해주세요"
                />
              </div>

              {/* 연락처 (이메일) */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">이메일 *</label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c8102e] focus:border-transparent"
                  required
                  placeholder="연락받으실 이메일을 입력해주세요"
                />
              </div>
              
              {/* 연락처 (핸드폰) */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">핸드폰 번호 *</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c8102e] focus:border-transparent"
                  required
                  placeholder="'-' 없이 숫자만 입력해주세요"
                  pattern="[0-9]{10,11}"
                  title="'-' 없이 숫자 10-11자리를 입력해주세요"
                />
              </div>
            </div>

            {/* 공연 정보 섹션 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">공연 정보</h3>

              {/* 공연명 */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">공연명 *</label>
                <input
                  type="text"
                  name="공연명"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c8102e] focus:border-transparent"
                  required
                  placeholder="공연명을 입력해주세요"
                />
              </div>

              {/* 장르 */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">장르 *</label>
                <input
                  type="text"
                  name="장르"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c8102e] focus:border-transparent"
                  required
                  placeholder="공연 장르를 입력해주세요"
                />
              </div>

              {/* 예상 공연 시기 */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">예상 공연 시기 *</label>
                <select 
                  name="예상 공연 시기"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c8102e] focus:border-transparent" 
                  required
                >
                  <option value="">선택해주세요</option>
                  <option value="2025년 6월 초">2025년 6월 초</option>
                  <option value="2025년 6월 중순">2025년 6월 중순</option>
                  <option value="2025년 6월 말">2025년 6월 말</option>
                  <option value="2025년 7월">2025년 7월</option>
                  <option value="2025년 8월">2025년 8월</option>
                  <option value="2025년 9월">2025년 9월</option>
                  <option value="2025년 10월 이후">2025년 10월 이후</option>
                  <option value="미정">미정</option>
                </select>
              </div>

              {/* 예상 공연 규모 */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">예상 공연 규모 (관객 수) *</label>
                <input
                  type="number"
                  name="예상 관객 수"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c8102e] focus:border-transparent"
                  required
                  min="0"
                  placeholder="예상 관객 수를 입력해주세요"
                />
              </div>

              {/* 현재 진행 수준 */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">현재 진행 수준 *</label>
                <select 
                  name="현재 진행 수준"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c8102e] focus:border-transparent" 
                  required
                >
                  <option value="">선택해주세요</option>
                  <option value="아이디어 단계">아이디어 단계</option>
                  <option value="기획 중">기획 중</option>
                  <option value="기획 완료">기획 완료</option>
                  <option value="대관 완료">대관 완료</option>
                  <option value="배우/아티스트 섭외 중">배우/아티스트 섭외 중</option>
                  <option value="배우/아티스트 섭외 완료">배우/아티스트 섭외 완료</option>
                  <option value="제작 중">제작 중</option>
                  <option value="티켓 판매 준비 중">티켓 판매 준비 중</option>
                  <option value="티켓 판매 중">티켓 판매 중</option>
                </select>
              </div>

              {/* 완료된 제작 단계 */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">완료된 제작 단계 (복수 선택 가능)</label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center">
                    <input type="checkbox" name="완료된 제작 단계[]" value="기획서 작성" className="mr-2 accent-[#c8102e]" />
                    기획서 작성
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" name="완료된 제작 단계[]" value="대본/악보 완성" className="mr-2 accent-[#c8102e]" />
                    대본/악보 완성
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" name="완료된 제작 단계[]" value="대관 계약" className="mr-2 accent-[#c8102e]" />
                    대관 계약
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" name="완료된 제작 단계[]" value="인력 섭외" className="mr-2 accent-[#c8102e]" />
                    인력 섭외
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" name="완료된 제작 단계[]" value="예산 편성" className="mr-2 accent-[#c8102e]" />
                    예산 편성
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" name="완료된 제작 단계[]" value="홍보물 제작" className="mr-2 accent-[#c8102e]" />
                    홍보물 제작
                  </label>
                </div>
              </div>

              {/* 공연 기획 의도 */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">공연 기획 의도</label>
                <textarea
                  name="공연 기획 의도"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-[#c8102e] focus:border-transparent"
                  placeholder="공연 기획 의도나 컨셉을 자유롭게 작성해주세요"
                ></textarea>
              </div>
            </div>

            {/* 서비스 선택 섹션 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">희망 서비스</h3>
              
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">관심 서비스 (복수 선택 가능) *</label>
                <p className="text-sm text-gray-500 mb-3">공연 기획부터 정산까지 필요한 모든 서비스를 선택해주세요</p>
                
                {/* 기획 단계 */}
                <div className="mb-4">
                  <p className="font-medium text-gray-700 mb-2 border-l-4 border-[#c8102e] pl-2">기획 단계</p>
                  <div className="grid grid-cols-2 gap-2 ml-3">
                    <label className="flex items-center">
                      <input type="checkbox" name="관심 서비스[]" value="공연 기획 컨설팅" className="mr-2 accent-[#c8102e]" />
                      공연 기획 컨설팅
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" name="관심 서비스[]" value="예산 계획 수립" className="mr-2 accent-[#c8102e]" />
                      예산 계획 수립
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" name="관심 서비스[]" value="대관 지원" className="mr-2 accent-[#c8102e]" />
                      대관 지원
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" name="관심 서비스[]" value="인력 구성 자문" className="mr-2 accent-[#c8102e]" />
                      인력 구성 자문
                    </label>
                  </div>
                </div>
                
                {/* 제작 단계 */}
                <div className="mb-4">
                  <p className="font-medium text-gray-700 mb-2 border-l-4 border-[#c8102e] pl-2">제작 단계</p>
                  <div className="grid grid-cols-2 gap-2 ml-3">
                    <label className="flex items-center">
                      <input type="checkbox" name="관심 서비스[]" value="무대 디자인" className="mr-2 accent-[#c8102e]" />
                      무대 디자인 (유료)
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" name="관심 서비스[]" value="무대 제작" className="mr-2 accent-[#c8102e]" />
                      무대 제작 (유료)
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" name="관심 서비스[]" value="조명 음향 지원" className="mr-2 accent-[#c8102e]" />
                      조명/음향 지원 (유료)
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" name="관심 서비스[]" value="연습실 대관 지원" className="mr-2 accent-[#c8102e]" />
                      연습실 대관 지원 (유료)
                    </label>
                  </div>
                </div>
                
                {/* 홍보 단계 */}
                <div className="mb-4">
                  <p className="font-medium text-gray-700 mb-2 border-l-4 border-[#c8102e] pl-2">홍보 단계</p>
                  <div className="grid grid-cols-2 gap-2 ml-3">
                    <label className="flex items-center">
                      <input type="checkbox" name="관심 서비스[]" value="포스터 제작" className="mr-2 accent-[#c8102e]" />
                      포스터 제작
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" name="관심 서비스[]" value="홍보 영상 제작" className="mr-2 accent-[#c8102e]" />
                      홍보 영상 제작
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" name="관심 서비스[]" value="SNS 홍보" className="mr-2 accent-[#c8102e]" />
                      SNS 홍보
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" name="관심 서비스[]" value="보도자료 배포" className="mr-2 accent-[#c8102e]" />
                      보도자료 배포
                    </label>
                  </div>
                </div>
                
                {/* 운영 단계 */}
                <div className="mb-4">
                  <p className="font-medium text-gray-700 mb-2 border-l-4 border-[#c8102e] pl-2">운영 단계</p>
                  <div className="grid grid-cols-2 gap-2 ml-3">
                    <label className="flex items-center">
                      <input type="checkbox" name="관심 서비스[]" value="티켓 시스템" className="mr-2 accent-[#c8102e]" />
                      티켓 시스템
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" name="관심 서비스[]" value="현장 스태프 운영" className="mr-2 accent-[#c8102e]" />
                      현장 스태프 운영 (유료)
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" name="관심 서비스[]" value="관객 응대 채널 운영" className="mr-2 accent-[#c8102e]" />
                      관객 응대 채널 운영
                    </label>
                  </div>
                </div>
                
                {/* 정산 단계 */}
                <div className="mb-2">
                  <p className="font-medium text-gray-700 mb-2 border-l-4 border-[#c8102e] pl-2">정산 단계</p>
                  <div className="grid grid-cols-2 gap-2 ml-3">
                    <label className="flex items-center">
                      <input type="checkbox" name="관심 서비스[]" value="티켓 판매 정산" className="mr-2 accent-[#c8102e]" />
                      티켓 판매 정산
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" name="관심 서비스[]" value="세금 계산서 발행" className="mr-2 accent-[#c8102e]" />
                      세금 계산서 발행
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" name="관심 서비스[]" value="공연 결과 보고서" className="mr-2 accent-[#c8102e]" />
                      공연 결과 보고서
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" name="관심 서비스[]" value="관객 데이터 분석" className="mr-2 accent-[#c8102e]" />
                      관객 데이터 분석
                    </label>
                  </div>
                </div>
                
                <p className="mt-4 text-sm text-gray-500">* 유료 옵션은 별도 협의를 통해 제공됩니다.</p>
              </div>
            </div>

            {/* 신청 유형 선택 섹션 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">신청 유형</h3>
              
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">신청 유형 선택 *</label>
                <div className="flex flex-col gap-3">
                  <label className={`flex items-center p-4 border rounded-lg ${
                    activeTab === 'free-beta' ? 'border-[#c8102e] bg-[#fff0f0]' : 'border-gray-300'
                  }`}>
                    <input 
                      type="radio" 
                      name="신청 유형" 
                      value="무료 베타 서비스 신청" 
                      checked={activeTab === 'free-beta'} 
                      onChange={() => setActiveTab('free-beta')}
                      className="mr-3 accent-[#c8102e]" 
                      required
                    />
                    <div>
                      <span className="font-medium block">무료 베타 서비스 신청</span>
                      <span className="text-sm text-gray-600">6월 중 진행되는 공연을 대상으로 무료 서비스를 제공합니다</span>
                      <span className="text-xs text-[#c8102e] block mt-1">※ 선착순 모집으로 인해 조기 마감될 수 있습니다</span>
                    </div>
                  </label>
                  
                  <label className={`flex items-center p-4 border rounded-lg ${
                    activeTab === 'pre-order' ? 'border-[#333] bg-gray-50' : 'border-gray-300'
                  }`}>
                    <input 
                      type="radio" 
                      name="신청 유형" 
                      value="서비스 사전 예약" 
                      checked={activeTab === 'pre-order'} 
                      onChange={() => setActiveTab('pre-order')}
                      className="mr-3 accent-[#333]" 
                      required
                    />
                    <div>
                      <span className="font-medium block">서비스 사전 예약</span>
                      <span className="text-sm text-gray-600">7월 이후 정식 서비스 출시 시 우선 혜택을 제공합니다</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="flex items-center">
                <input type="checkbox" required className="mr-2 accent-[#c8102e]" />
                <span className="text-sm text-gray-700">개인정보 수집 및 이용에 동의합니다 *</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 bg-gradient-to-r from-[#c8102e] to-[#9b0000] hover:from-[#9b0000] hover:to-[#800020] text-white rounded-md text-lg font-semibold transition-all duration-300 shadow-md ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  제출 중...
                </span>
              ) : '신청하기'}
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

// Success Modal Component
function SuccessModal({ isOpen, onClose, formType, setIsSubmitting }: { 
  isOpen: boolean; 
  onClose: () => void; 
  formType: 'free-beta' | 'pre-order';
  setIsSubmitting: (isSubmitting: boolean) => void;
}) {
  const [isModalSubmitting, setModalSubmitting] = useState(false);
  if (!isOpen) return null;

  const title = formType === 'free-beta' ? '무료 베타 서비스 신청' : '서비스 사전 예약';
  const message = formType === 'free-beta' 
    ? '베타 서비스 신청을 완료하시겠습니까? 확인을 누르시면 검토 후 선정 결과를 이메일로 안내해드리겠습니다.' 
    : '서비스 사전 예약을 완료하시겠습니까? 확인을 누르시면 정식 서비스 출시 전 상세 정보를 이메일로 안내해드리겠습니다.';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="text-center">
          <div className="mb-4">
            <svg className="mx-auto w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
          <p className="text-gray-600 mb-6">{message}</p>
          
          <button
            onClick={async () => {
              // 폼을 찾아서 데이터 전송
              const form = document.querySelector('form') as HTMLFormElement;
              if (form) {
                // 버튼 로딩 상태 활성화
                setIsSubmitting(true);
                setModalSubmitting(true);
                
                const formData = new FormData(form);
                const applicationType = formType === 'free-beta' ? '무료 베타 서비스 신청' : '서비스 사전 예약';
                
                try {
                  // 완료된 제작 단계 값을 배열로 수집
                  const completedStages = Array.from(
                    form.querySelectorAll('input[name="완료된 제작 단계[]"]:checked')
                  ).map((cb: Element) => (cb as HTMLInputElement).value);
                  
                  const response = await fetch('/api/submit-form', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      type: applicationType,
                      applicantType: formData.get('신청자 유형'),
                      companyName: formData.get('회사/단체명'),
                      performanceName: formData.get('공연명'),
                      genre: formData.get('장르'),
                      expectedDate: formData.get('예상 공연 시기'),
                      expectedAudience: formData.get('예상 관객 수'),
                      email: formData.get('email'),
                      phone: formData.get('phone'),
                      progressLevel: formData.get('현재 진행 수준'),
                      concept: formData.get('공연 기획 의도'),
                      completedStages: completedStages, // 완료된 제작 단계 추가
                      services: Array.from(form.querySelectorAll('input[name="관심 서비스[]"]:checked')).map((cb: Element) => (cb as HTMLInputElement).value)
                    }),
                  });

                  if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to submit form');
                  }

                  // 성공적으로 제출됨
                  form.reset();
                  
                  // 로딩 상태 초기화
                  setIsSubmitting(false);
                  setModalSubmitting(false);
                  
                  // 성공 메시지 표시
                  const successMessage = document.createElement('div');
                  successMessage.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg z-50';
                  successMessage.innerHTML = `
                    <div class="flex items-center">
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>신청이 성공적으로 접수되었습니다.</span>
                    </div>
                  `;
                  document.body.appendChild(successMessage);
                  
                  // 3초 후 성공 메시지 제거
                  setTimeout(() => {
                    document.body.removeChild(successMessage);
                  }, 5000);
                } catch (error) {
                  console.error('Error submitting form:', error);
                  alert('신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
                  
                  // 오류 발생 시에도 로딩 상태 초기화
                  setIsSubmitting(false);
                  setModalSubmitting(false);
                }
              }
              onClose();
            }}
            className={`px-6 py-3 ${
              formType === 'free-beta' 
                ? 'bg-[#c8102e]' 
                : 'bg-[#333]'
            } text-white rounded-md hover:bg-opacity-90 transition-colors ${isModalSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
            disabled={isModalSubmitting}
          >
            {isModalSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                제출 중...
              </span>
            ) : '확인'}
          </button>
        </div>
      </div>
    </div>
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
              <span className="text-xl font-bold font-pretendard">CJeS STUDIO</span>
            </div>
            <p className="text-gray-300 max-w-md">
              큐리스 프로덕션은 마스킷과 CJeS STUDIO의 협력으로 탄생한 공연 제작 원스톱 서비스입니다.
              공연 기획부터 정산까지, 공연 제작의 A to Z를 원스탑 서비스로 경험하세요.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">마스킷</h3>
              <ul className="space-y-2 text-gray-300">
                <li>모바일 티켓 솔루션</li>
                <li>문화예술 빅데이터 분석</li>
                <li>관객 관리 CRM</li>
                <li>데이터 마케팅</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">CJeS STUDIO</h3>
              <ul className="space-y-2 text-gray-300">
                <li>콘텐츠 제작</li>
                <li>아티스트 매니지먼트</li>
                <li></li>
                <li>공연 운영 지원</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-300">© 2025 마스킷 X CJeS STUDIO. All rights reserved.</p>
          </div>
          
        </div>
      </div>
    </footer>
  );
}