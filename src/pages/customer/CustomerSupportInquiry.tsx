import React, { useEffect } from 'react';
import ScrollToTop from '../../components/ScrollToTop';
import CustomerSidebar from '../../components/CustomerSidebar';
import { LuMessageCircle } from 'react-icons/lu';
import 'react-notion/src/styles.css';

declare global {
  interface Window {
    ChannelIO?: any;
    ChannelIOInitialized?: boolean;
  }
}

const CustomerSupportInquiry: React.FC = () => {
  useEffect(() => {
    // Channel Talk 초기화
    const initializeChannelTalk = () => {
      if (window.ChannelIOInitialized) {
        return;
      }

      const channelTalk = function () {
        if (window.ChannelIO) {
          window.ChannelIO('boot', {
            pluginKey: 'ad255906-6bd3-45c7-986e-6538ae948db7',
            hideChannelButtonOnBoot: false,
          });
        } else {
          window.ChannelIOInitialized = true;
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.async = true;
          script.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
          const firstScript = document.getElementsByTagName('script')[0];
          firstScript.parentNode?.insertBefore(script, firstScript);
        }
      };
      channelTalk();
    };

    initializeChannelTalk();
  }, []);

  const handleChannelTalk = () => {
    if (window.ChannelIO) {
      window.ChannelIO('showMessenger');
    }
  };

  return (
    <div className="container mx-auto mt-[100px] flex px-4 py-8 xs:mt-[0px] xs:flex-col">
      <CustomerSidebar />

      <div className="ml-[300px] flex-1 pl-8 xs:ml-0 xs:mt-[150px] xs:pl-0">
        <div className="w-full max-w-6xl rounded-lg bg-white p-8 xs:p-4">
          <h1 className="mb-4 text-left text-4xl font-bold text-blue-600 xs:text-left xs:text-3xl">문의하기</h1>
          <p className="mb-8 text-left text-lg text-gray-700">
            궁금하신 점이나 도움이 필요하신 경우 <br></br>문의해 주세요.
          </p>
          <hr className="my-12 border-gray-200 xs:my-8" />

          <div className="space-y-4">
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="mb-2 text-left text-xl font-semibold text-gray-800">채널톡으로 실시간 상담 문의하기</h3>
              <p className="text-left text-gray-600">
                우측 하단의 채널톡 버튼을 클릭하시거나 아래에 '채널톡 상담하기' 버튼을 눌러 실시간 상담이 가능합니다.
                <br></br>
                영업시간 외 문의는 다음 영업일에 순차적으로 답변 드리겠습니다.
              </p>
              <p className="mt-4 text-left text-sm text-gray-500">
                기존고객 (AS문의) 영업시간: 평일 09:00 ~ 21:00<br></br>주말.공휴일: 10:00~18:00<br></br>신규상담: 평일
                09:00~18:00
              </p>
              <button
                onClick={handleChannelTalk}
                className="mt-6 flex w-[200px] items-center justify-center rounded-xl bg-yellow-600 px-6 py-3 text-white shadow-lg transition duration-300 hover:bg-yellow-700 active:bg-yellow-800">
                <LuMessageCircle className="h-5 w-5" />
                <span className="ml-2">채널톡 상담하기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default CustomerSupportInquiry;
