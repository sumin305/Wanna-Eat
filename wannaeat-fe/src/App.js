// App.js
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Global, css } from '@emotion/react';
import Main from './Main';

import { requestPermission } from './firebase/firebaseCloudMessaging';
import { getRestaurantCategories } from 'api/customer/restaurant.js';
import { getMerchantCategories } from 'api/common/ssafyPay/card.js';

const globalStyles = css`
  @font-face {
    font-family: 'Paperlogy-5Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-3Light.woff2')
      format('woff2');
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: 'Paperlogy-5Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-4Regular.woff2')
      format('woff2');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Paperlogy-5Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-7Bold.woff2')
      format('woff2');
    font-weight: 700;
    font-style: normal;
  }
  * {
    font-family: 'Paperlogy-5Regular', sans-serif;
    font-weight: 500;
    margin: 0;
    padding: 0;
  }

  button {
    border: 0;
    background: none;
    color: black;
  }
`;

const getCategories = async () => {
  const response = await getRestaurantCategories();
  if (response.status === 200) {
    localStorage.setItem(
      'categories',
      JSON.stringify(response.data.data.restaurantCategories)
    );
  }
};

// 알람창 띄워서 새로고침 방지
const usePreventRefresh = (shouldPrevent) => {
  useEffect(() => {
    // 새로고침 시 알람창 띄우는 것 해제하는 조건
    if (!shouldPrevent) return;

    const handleBeforeunload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeunload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload);
    };
  }, []);
};

function App() {
  // 로그인 페이지 체크
  const isLoginPage = window.location.pathname === '/';

  // 로그인 페이지를 제외한 모든 페이지 새로고침 방지
  usePreventRefresh(!isLoginPage);

  useEffect(() => {
    // 알림 권한 요청 및 포그라운드 알림 처리
    requestPermission();

    // 카테고리 데이터 가져오기
    getCategories();
    getMerchantCategories();
  }, []); // 빈 배열을 의존성 배열로 사용하여 초기 실행 시 한 번만 호출되도록 설정

  return (
    <BrowserRouter>
      <Global styles={globalStyles} />
      <Main />
    </BrowserRouter>
  );
}

export default App;
