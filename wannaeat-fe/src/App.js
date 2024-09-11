import React from 'react';
import { theme } from './style/common/theme';
import { Global, css } from '@emotion/react';

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
      <p style={{ color: theme.colors.primary }}>안녕하세요</p>
    </div>
  );
}

export default App;
