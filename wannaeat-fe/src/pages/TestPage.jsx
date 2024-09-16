import { React } from 'react';

import WEButton from '../component/common/button/WEButton/WEButton.jsx';
import './TestPage.css';
import theme from '../style/common/theme.js';

const TestPage = () => {
  return (
    <div>
      <WEButton size="menu">메뉴</WEButton>
      <WEButton size="short" backgroundColor={theme.color.gray} color={'black'}>
        이전
      </WEButton>
      <WEButton size="modal">확인</WEButton>
      <WEButton size="modal" backgroundColor={theme.color.gray} color={'black'}>
        취소
      </WEButton>
      <WEButton size="medium" outlined={true}>
        사장님 호출
      </WEButton>
      <WEButton size="venti">결제</WEButton>
      <WEButton size="long">예약하기</WEButton>
      <WEButton>Defalut</WEButton>
      <WEButton disabled={true}>disabled</WEButton>
    </div>
  );
};

export default TestPage;
