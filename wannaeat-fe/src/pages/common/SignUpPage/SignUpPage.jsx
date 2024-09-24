import { useEffect, useState } from 'react';
import WECheck from '../../../component/common/check/WECheck.jsx';
import Textfield from '../../../component/common/textfield/WETextfield/WETextfield.jsx';
import Button from '../../../component/common/button/WEButton/WEButton.jsx';
import useTextfieldStore from '../../../stores/common/textfield/useTextfieldStore.js';
import useModalStore from '../../../stores/common/modal/useModalStore.js';
import {
  SignUpPageContainer,
  SignUpPageHeader,
  SignUpPageHeaderHr,
  UserModeWrapper,
  InputContainer,
  InputWrapper,
  InputTitle,
  UserModeToggle,
  TextfieldWrapper,
  TextfieldWrapperWithButton,
  TextFieldWrapperButton,
  VerificationNumberInputWrapper,
  VerificationTitle,
  ButtonWrapper,
} from './SignUpPage.js';
import WEToggle from '../../../component/common/toggle/WEToggle.jsx';
const SignUpPage = () => {
  const { setError, clearError } = useTextfieldStore();
  const { open, setAlertText, setModalType } = useModalStore();
  const [isChecked, setIsChecked] = useState(false);
  const [verifyNickname, setVerifyNickname] = useState(false);
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const [verifyPhoneNumber, setVerifyPhoneNumber] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    email: 'gogotnals@naver.com',
    phoneNumber: '',
  });
  const handleCheckBoxClick = () => {
    setIsChecked(!isChecked);
  };

  // 닉네임 변경 핸들러
  const handleNicknameChange = (e) => {
    const nickname = e.target.value;
    if (nickname.length !== 0 && (nickname.length < 2 || nickname.length > 8)) {
      setError('nickname', 'text', '닉네임은 2자 이상 8자 이하입니다.');
    } else {
      clearError('nickname');
    }

    setUserInfo((prevState) => ({
      ...prevState,
      nickname: nickname,
    }));
  };

  // 휴대번호 변경 핸들러
  const handlePhoneNumberChange = (e) => {
    const phoneNumber = e.target.value;
    setUserInfo((prevState) => ({
      ...prevState,
      phoneNumber: phoneNumber,
    }));
  };

  // 휴대번호 인증 버튼 핸들러
  const handlePhoneNumberVerifyButtonClick = () => {
    setIsVerificationCodeSent(true);

    // 휴대번호 인증 문자 요청
    alert('인증번호가 전송되었습니다.');
  };

  const alert = (text) => {
    setModalType('alert');
    setAlertText(text);
    open();
  };

  return (
    <SignUpPageContainer>
      <SignUpPageHeader>추가 정보 입력</SignUpPageHeader>
      <SignUpPageHeaderHr />
      <UserModeWrapper>
        <InputTitle>사용자 모드</InputTitle>
        <WEToggle></WEToggle>
        <UserModeToggle></UserModeToggle>
      </UserModeWrapper>

      <InputContainer>
        <InputWrapper>
          <InputTitle>닉네임 </InputTitle>
          <TextfieldWrapper>
            <Textfield
              name="nickname"
              onChange={handleNicknameChange}
              placeholder="사용할 닉네임을 입력해주세요"
            ></Textfield>
          </TextfieldWrapper>
        </InputWrapper>
        <InputWrapper>
          <InputTitle>이메일 </InputTitle>
          <TextfieldWrapper>
            <Textfield name="email" disabled value={userInfo.email}></Textfield>
          </TextfieldWrapper>
        </InputWrapper>

        <InputWrapper>
          <InputTitle>휴대번호 </InputTitle>
          <TextfieldWrapperWithButton>
            <Textfield
              name="phoneNumber"
              onChange={handlePhoneNumberChange}
              placeholder="휴대번호를 입력해주세요"
            ></Textfield>
            <TextFieldWrapperButton
              onClick={handlePhoneNumberVerifyButtonClick}
            >
              인증
            </TextFieldWrapperButton>
          </TextfieldWrapperWithButton>
        </InputWrapper>

        <InputWrapper>
          <InputTitle>인증번호 </InputTitle>
          <TextfieldWrapperWithButton>
            <Textfield placeholder="인증번호를 입력해주세요"></Textfield>
            <TextFieldWrapperButton
              onClick={() => console.log('인증번호 확인')}
            >
              확인
            </TextFieldWrapperButton>
          </TextfieldWrapperWithButton>
        </InputWrapper>
      </InputContainer>

      <ButtonWrapper>
        <VerificationNumberInputWrapper onClick={handleCheckBoxClick}>
          <WECheck isChecked={isChecked} />
          <VerificationTitle>약관에 동의합니다.</VerificationTitle>
        </VerificationNumberInputWrapper>
        <Button>회원가입</Button>
      </ButtonWrapper>
    </SignUpPageContainer>
  );
};

export default SignUpPage;
