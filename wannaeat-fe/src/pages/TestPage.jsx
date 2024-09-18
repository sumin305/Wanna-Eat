import { useState } from 'react';
import Textfield from '../component/common/textfield/WETextfield/WETextfield.jsx';
import useTextfieldStore from '../stores/textfield/useTextfieldStore.js';

import './TestPage.css';

const TestPage = () => {
  const [nickname, setNickname] = useState('');
  const { setError, clearError } = useTextfieldStore();

  const validateNickname = () => {
    if (nickname === 'ssafy') {
      setError('nickname', 'exist', '이미 있는 닉네임입니다.');
    } else if (nickname.length > 10) {
      setError('nickname', 'long', '닉네임이 너무 깁니다.');
    } else if (/[^ㄱ-ㅎ가-힣a-zA-Z0-9]/.test(nickname)) {
      setError('nickname', 'invalid', '특수문자는 사용할 수 없습니다.');
    } else {
      clearError('nickname');
    }
  };

  return (
    <div>
      <p>닉네임</p>
      <Textfield
        name="nickname"
        placeholder="닉네임을 입력하세요."
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button className="testButton" onClick={validateNickname}>
        확인
      </button>
    </div>
  );
};

export default TestPage;
