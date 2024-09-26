import { useEffect, useState } from 'react';
import WETextField from 'component/common/textfield/WETextfield/WETextfield.jsx';
import useHeaderStore from 'stores/common/header/useHeaderStore.js';
import useTextfieldStore from 'stores/common/textfield/useTextfieldStore.js';
import {
  RestaurantRegistPageStyled,
  TextfieldWrapperStyled,
} from './RestaurantRegistPage.js';

const RestaurantRegistPage = () => {
  const { setIsCarrot, setPageName, setIsUnderLine } = useHeaderStore();
  const { setError, clearError } = useTextfieldStore();

  const [nickname, setNickname] = useState('');

  useEffect(() => {
    setIsCarrot(false);
    setIsUnderLine(true);
    setPageName('매장 정보 입력');
  }, []);

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
    <RestaurantRegistPageStyled>
      <TextfieldWrapperStyled>
        <WETextField
          name="nickname"
          placeholder="닉네임을 입력하세요."
          value={nickname}
          showErrorMessageSpace={true}
          onChange={(e) => setNickname(e.target.value)}
        />
        <WETextField />
        <WETextField />
        <WETextField />
        <WETextField />
      </TextfieldWrapperStyled>
      <button className="testButton" onClick={validateNickname}>
        확인
      </button>
    </RestaurantRegistPageStyled>
  );
};

export default RestaurantRegistPage;
