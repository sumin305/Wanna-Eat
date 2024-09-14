import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

import { Global, css } from '@emotion/react';
import WETabbar from './layout/common/WETabbar/WETabbar';
import TopPage from './pages/TopPage';

const globalStyles = css`
  @font-face {
    font-family: 'Paperlogy-5Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-4Regular.woff2')
      format('woff2');
    font-weight: 500;
    font-style: normal;
  }

  * {
    font-family: 'Paperlogy-5Regular', sans-serif;
    letter-spacing: 1px;
    font-weight: 500;
  }
`;

function App() {
  return (
    <BrowserRouter>
      <Global styles={globalStyles} />
      <WETabbar />
      <AppRoutes />
      <TopPage></TopPage>
    </BrowserRouter>
  );
}

export default App;
