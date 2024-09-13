import { React } from 'react';
import Textfield from '../component/common/textfield/WETextfield/WETextfield.jsx';

import './TestPage.css';

const TestPage = () => {
  return (
    <div>
      <input type="number"></input>
      <p>대표자</p>
      <Textfield />
      <Textfield />
      <Textfield placeholder="이름을 입력하세요." />
      <Textfield error={true} errorMessage={'에러 메시지 테스트입니다!!'} />
      <Textfield disabled={true} />
    </div>
  );
};

export default TestPage;
