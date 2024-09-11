import React from 'react';
import { Global, css } from '@emotion/react';
import TopPage from './component/common/modal/TopPage'
const globalStyles = css`
  @font-face {
    font-family: 'Paperlogy-5Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-4Regular.woff2')
      format('woff2');
    font-weight: 500;
    font-style: normal;
  }

  * {
    font-family: 'Paperlogy', sans-serif;
    letter-spacing: 1px;
    font-weight: 500;
  }
`;

function App() {
  return (
    <div>
      <Global styles={globalStyles} />
      <TopPage></TopPage>
    </div>
  );
}

export default App;
