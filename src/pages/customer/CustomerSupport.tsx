import React from 'react';
import { Link } from 'react-router-dom';
import ScrollToTop from '../../components/ScrollToTop';
import CustomerSidebar from '../../components/CustomerSidebar';

const CustomerSupport: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto mt-[100px] flex px-4 py-8 xs:mt-[0px] xs:flex-col">
      <CustomerSidebar />

      <div className="ml-[300px] flex-1 pl-8 xs:ml-0 xs:mt-[130px] xs:pl-0">
        <div className="mt-8 text-center xs:hidden">
          <p className="flex h-[50px] items-center justify-center rounded-xl border-2 bg-slate-200 text-lg text-gray-600">
            좌측 사이드바에서 메뉴를 선택하거나 하단에서 메뉴를 선택하세요!
          </p>
        </div>

        <div className="w-full max-w-6xl rounded-lg p-8 xs:p-4">
          <h1 className="mb-4 text-left text-4xl font-bold text-blue-600 xs:text-left xs:text-3xl">고객 지원</h1>
          <p className="mb-8 text-left text-lg text-gray-700">고객님의 문의사항을 해결해 드리겠습니다.</p>

          <div className="grid grid-cols-2 gap-6 xs:grid-cols-1">
            <Link to="/customer-support/notice" onClick={scrollToTop}>
              <div className="flex cursor-pointer flex-col items-center rounded-xl bg-sky-600 p-6 transition-all duration-200 hover:scale-[1.02] hover:bg-sky-700 hover:shadow-lg active:scale-[0.98] active:bg-sky-800">
                <h3 className="mb-2 text-xl font-semibold text-white">공지사항</h3>
                <p className="text-center text-white">이레페이에서 안내드리는 공지사항입니다.</p>
              </div>
            </Link>

            <Link to="/customer-support/faq" onClick={scrollToTop}>
              <div className="flex cursor-pointer flex-col items-center rounded-xl bg-green-600 p-6 transition-all duration-200 hover:scale-[1.02] hover:bg-green-700 hover:shadow-lg active:scale-[0.98] active:bg-green-800">
                <h3 className="mb-2 text-xl font-semibold text-white">자주묻는질문</h3>
                <p className="text-center text-white">고객님께서 자주물어보는 질문과 답변입니다.</p>
              </div>
            </Link>

            <Link to="/customer-support/event" onClick={scrollToTop}>
              <div className="flex cursor-pointer flex-col items-center rounded-xl bg-slate-600 p-6 transition-all duration-200 hover:scale-[1.02] hover:bg-slate-700 hover:shadow-lg active:scale-[0.98] active:bg-slate-800">
                <h3 className="mb-2 text-xl font-semibold text-white">이벤트</h3>
                <p className="text-center text-white">이레페이에서 진행되는 이벤트 안내입니다.</p>
              </div>
            </Link>

            <Link to="/customer-support/inquiry" onClick={scrollToTop}>
              <div className="flex cursor-pointer flex-col items-center rounded-xl bg-yellow-700 p-6 transition-all duration-200 hover:scale-[1.02] hover:bg-yellow-800 hover:shadow-lg active:scale-[0.98] active:bg-yellow-900">
                <h3 className="mb-2 text-xl font-semibold text-white">문의하기</h3>
                <p className="text-center text-white">채널톡 실시간 상담이 가능합니다.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default CustomerSupport;
