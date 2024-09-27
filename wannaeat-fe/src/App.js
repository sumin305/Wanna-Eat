import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Global, css } from '@emotion/react';
import Main from './Main';

import {
  requestPermission,
  onForegroundMessage,
} from './firebase/firebaseCloudMessaging';
import { getFcmToken } from './firebase/firebaseCloudMessaging';

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
    // letter-spacing: 1px;
    font-weight: 500;
    margin: 0;
    padding: 0;
  }
`;

// FCM permission & token
if (Notification.permission !== 'granted') {
  requestPermission();
}

function App() {
  return (
    <BrowserRouter>
      <Global styles={globalStyles} />
      <Main />
    </BrowserRouter>
  );
}

export default App;
