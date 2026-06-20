import React, { useEffect, useState, useLayoutEffect } from 'react';
import { NotionRenderer } from 'react-notion';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import 'react-notion/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';

import ScrollToTop from '../components/ScrollToTop';
import InstallationCasesSidebar from '../components/installationcases/InstallationCasesSidebar';

const InstallationCasesGallery: React.FC = () => {
  const [response, setResponse] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentPageId = searchParams.get('page');

  // 페이지 ID로 Notion 페이지 내용을 로드하는 함수
  const loadNotionPage = async (pageId: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://notion-api.splitbee.io/v1/page/${pageId}`);

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
    } catch (error) {
      console.error('Error fetching Notion data:', error);
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
    const pageId = currentPageId || '168a1962dab480a0a403f7b946665349';
    loadNotionPage(pageId);
  }, [currentPageId]);

  useEffect(() => {
    // Custom styles for notion override
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
      <InstallationCasesSidebar />

      <div className="ml-[300px] flex-1 pl-8 xs:ml-0 xs:mt-[30px] xs:pl-0">
        <h1 className="mb-0 text-3xl font-bold text-gray-900">설치사례 갤러리</h1>
        <hr className="my-8 border-gray-200" />

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="notion-container -mt-[0px]">
            <NotionRenderer blockMap={response} fullPage={true} mapPageUrl={(pageId) => `?page=${pageId}`} />
          </div>
        )}
      </div>
      <ScrollToTop />
    </div>
  );
};

export default InstallationCasesGallery;
