import React, { useEffect, useState, useLayoutEffect } from 'react';
import { NotionRenderer } from 'react-notion';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-notion/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';

import ScrollToTop from '../../components/ScrollToTop';
import CustomerSidebar from '../../components/CustomerSidebar';
import { IoArrowBack } from 'react-icons/io5';

const CustomerSupportEvent: React.FC = () => {
  const [response, setResponse] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentPageId = searchParams.get('page');

  const loadNotionPage = async (pageId: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`https://notion-api.splitbee.io/v1/page/${pageId}`);
      if (!data || Object.keys(data).length === 0) {
        throw new Error('No data found');
      }

      // Notion API 응답 개선
      const cleanedData: any = {};
      if (data && typeof data === 'object') {
        Object.keys(data).forEach((key) => {
          const block = data[key];
          if (block && block.value) {
            cleanedData[key] = {
              ...block,
              value: block.value.value || block.value,
            };
          } else {
            cleanedData[key] = block;
          }
        });
      }

      setResponse(cleanedData);
    } catch (err: any) {
      console.error('Error fetching Notion data:', err);
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.href) {
        const url = new URL(anchor.href);
        if (url.origin === window.location.origin && url.searchParams.has('page')) {
          e.preventDefault();
          const pageId = url.searchParams.get('page');
          if (pageId) {
            // 뒤로가기가 되도록 replace: true 없이 navigate 호출
            navigate(`?page=${pageId}`);
          }
        }
      }
    };

    const notionContainer = document.querySelector('.notion-container');
    if (notionContainer) {
      notionContainer.addEventListener('click', handleLinkClick as any);
    } else {
      document.addEventListener('click', handleLinkClick as any);
    }

    return () => {
      if (notionContainer) {
        notionContainer.removeEventListener('click', handleLinkClick as any);
      } else {
        document.removeEventListener('click', handleLinkClick as any);
      }
    };
  }, [response, navigate]);

  useEffect(() => {
    // URL의 pageId 변경 감지하여 데이터 로딩
    const pageId = currentPageId || '15fa1962dab4801bbb2de8cf359379f2';
    loadNotionPage(pageId);
  }, [currentPageId]);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .notion-page-header {
        display: none !important;
      }
      .notion {
        font-family: inherit !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="container mx-auto mt-[100px] flex px-4 py-8 xs:mt-[0px] xs:flex-col">
      <CustomerSidebar />

      <div className="ml-[300px] flex-1 pl-8 xs:ml-0 xs:mt-[150px] xs:pl-0">
        <div className="w-full max-w-6xl rounded-lg bg-white p-8 xs:p-4">
          <div className="mb-4 flex items-center gap-4">
            {currentPageId && (
              <button
                className="flex h-[50px] w-[50px] items-center justify-center rounded-xl px-2 py-2 text-gray-800 transition-all hover:scale-105 hover:bg-gray-100 active:scale-95"
                onClick={() => navigate(-1)}>
                <IoArrowBack className="h-12 w-12" />
              </button>
            )}
            <h1 className="text-4xl font-bold text-blue-600 xs:text-3xl">이벤트</h1>
          </div>
          <p className="mb-8 text-left text-lg text-gray-700">이레페이에서 진행되는 이벤트를 확인하세요.</p>
          <hr className="my-12 border-gray-200 xs:my-8" />

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="rounded-lg bg-red-50 p-4 text-center text-red-500">
              <p>{error}</p>
            </div>
          ) : (
            <div className="notion-container -mt-[0px]">
              <NotionRenderer blockMap={response} fullPage={true} mapPageUrl={(pageId) => `?page=${pageId}`} />
            </div>
          )}
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default CustomerSupportEvent;
