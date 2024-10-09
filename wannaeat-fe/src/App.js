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

// 알람창 띄워서 새로고침 방지
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
  const isLoginPage = window.location.pathname === '/';
  const [isLoading, setIsLoading] = useState(true);

  usePreventRefresh(!isLoginPage);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await requestPermission();
        await getCategories();
        await getMerchantCategories();
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeApp();
  }, []);

  return (
    <BrowserRouter>
      <Global styles={globalStyles} />
      {isLoading ? <Loading /> : <Main />}
    </BrowserRouter>
  );
}

export default App;
