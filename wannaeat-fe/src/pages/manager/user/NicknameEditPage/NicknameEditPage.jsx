import { useEffect, useState } from 'react';
import useHeaderStore from 'stores/common/useHeaderStore';
import Textfield from 'component/common/textfield/WETextfield/WETextfield.jsx';
import { editMyInfo } from 'api/customer/user';
import {
  TextfieldWrapperWithButton,
  TextFieldWrapperButton,
} from 'pages/common/SignUpPage/SignUpPage';
import { InputWrapper, InputTitle, ButtonWrapper } from './NicknameEditPage.js';
import Button from 'component/common/button/WEButton/WEButton.jsx';
import useMyInfoStore from 'stores/customer/useMyInfoStore';
import theme from 'style/common/theme';
import { checkNickname } from 'api/common/join';
import { useNavigate } from 'react-router-dom';
import useAlert from 'utils/alert';

const NicknameEditPage = () => {
  const { setPageName, setIsShowBackIcon, setActiveIcons } = useHeaderStore();
  const [newNickname, setNewNickname] = useState('');
  const [verifyNickname, setVerifyNickname] = useState(false);
  const navigate = useNavigate();
  const { nickname, setNickname } = useMyInfoStore();
  const showAlert = useAlert();
  useEffect(() => {
    setPageName('닉네임 변경');
    setIsShowBackIcon(true);
    setNewNickname(nickname);
    setActiveIcons([]);
  }, []);

  const handleNicknameChange = (e) => {
    setNewNickname(e.target.value);
  };

  const handleNicknameVerifyButtonClick = async () => {
    const result = await checkNickname(newNickname);
    console.log(result);
    if (result.status === 200) {
      setVerifyNickname(true);
      showAlert('사용 가능한 닉네임입니다');
    } else if (result.status === 409) {
      showAlert(result.response.data.message);
      setNewNickname('');
    }
  };

  const handleBeforeButtonClick = () => {
    navigate(-1);
  };

  const handleNextButtonClick = async () => {
    if (verifyNickname) {
      setNickname(newNickname);
      const result = await editMyInfo(newNickname);
      console.log(result);
      if (result.status === 200) {
        showAlert('닉네임 변경에 성공했습니다.');
        navigate('/manager/myinfo');
      } else {
        showAlert('닉네임 변경에 실패했습니다.');
      }
    } else {
      if (newNickname === '') {
        showAlert('변경할 닉네임을 입력해주세요');
      }
      showAlert('닉네임 중복검사 해주세요');
    }
  };

  const handleOnFocus = () => {
    setNewNickname('');
  };
  return (
    <div>
      <InputWrapper>
        <InputTitle>닉네임 </InputTitle>
        <TextfieldWrapperWithButton>
          <Textfield
            name="nickname"
            value={newNickname}
            onChange={handleNicknameChange}
            placeholder="사용할 닉네임을 입력해주세요"
            onFocus={handleOnFocus}
          ></Textfield>
          <TextFieldWrapperButton onClick={handleNicknameVerifyButtonClick}>
            검사
          </TextFieldWrapperButton>
        </TextfieldWrapperWithButton>
      </InputWrapper>

      <ButtonWrapper>
        <Button
          onClick={handleBeforeButtonClick}
          size="short"
          color={'black'}
          backgroundColor={theme.color.disabled}
        >
          이전
        </Button>
        <Button onClick={handleNextButtonClick} size="venti">
          저장
        </Button>
      </ButtonWrapper>
    </div>
  );
};

export default NicknameEditPage;
