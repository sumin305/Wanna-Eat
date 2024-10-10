// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Global, css } from '@emotion/react';
import Main from './Main';
import Loading from './component/common/loading/Loading';

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

// // 알람창 띄워서 새로고침 방지
const usePreventRefresh = (shouldPrevent) => {
  useEffect(() => {
    if (!shouldPrevent) return;

    const handleBeforeunload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeunload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload);
    };
  }, [shouldPrevent]);
};

function App() {
  // 로그인페이지, 결제페이지, 보증금 결제페이지 체크
  const isLoginPage = window.location.pathname === '/';
  const isPayPage = window.location.pathname.startsWith('/customer/order/pay');
  const isDepositPage =
    window.location.pathname === '/customer/reservation/deposit-payment';
  const [isLoading, setIsLoading] = useState(true);

  // 로그인페이지, 결제페이지, 보증금 결제페이지를 제외한 모든 페이지 새로고침 방지
  usePreventRefresh(!(isLoginPage || isPayPage || isDepositPage));

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await requestPermission();
        await getCategories();
        await getMerchantCategories();
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [window.location.pathname]);

  return (
    <BrowserRouter>
      <Global styles={globalStyles} />
      {isLoading ? <Loading /> : <Main />}
    </BrowserRouter>
  );
}

export default App;
