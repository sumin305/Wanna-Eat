import React from 'react';
import { Global, css } from '@emotion/react';
import Main from './Main';

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
    margin: 0;
  }
`;

function App() {
  return (
    <div>
      <Global styles={globalStyles} />
      <Main />
    </div>
  );
}

export default App;
