import { useEffect, useState } from 'react';
import WECheck from '../../../component/common/check/WECheck.jsx';
import Textfield from '../../../component/common/textfield/WETextfield/WETextfield.jsx';
import Button from '../../../component/common/button/WEButton/WEButton.jsx';
import {
  SignUpPageContainer,
  SignUpPageHeader,
  SignUpPageHeaderHr,
  UserModeWrapper,
  InputWrapper,
  InputTitle,
  UserModeToggle,
  TextfieldWrapper,
  VerificationNumberInputWrapper,
  VerificationTitle,
} from './SignUpPage.js';
const SignUpPage = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckBoxClick = () => {
    console.log(isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <SignUpPageContainer>
      <SignUpPageHeader>추가 정보 입력</SignUpPageHeader>
      <SignUpPageHeaderHr />
      <UserModeWrapper>
        <InputTitle>사용자 모드</InputTitle>
        <UserModeToggle></UserModeToggle>
      </UserModeWrapper>

      <InputWrapper>
        <InputTitle>닉네임 </InputTitle>
        <TextfieldWrapper>
          <Textfield></Textfield>
        </TextfieldWrapper>
      </InputWrapper>

      <InputWrapper>
        <InputTitle>이메일 </InputTitle>
        <TextfieldWrapper>
          <Textfield></Textfield>
        </TextfieldWrapper>
      </InputWrapper>

      <InputWrapper>
        <InputTitle>휴대번호 </InputTitle>
        <TextfieldWrapper>
          <Textfield></Textfield>
        </TextfieldWrapper>
      </InputWrapper>

      <InputWrapper>
        <InputTitle>인증번호 </InputTitle>
        <TextfieldWrapper>
          <Textfield></Textfield>
        </TextfieldWrapper>
      </InputWrapper>

      <VerificationNumberInputWrapper onClick={handleCheckBoxClick}>
        <WECheck isChecked={isChecked} />
        <VerificationTitle>약관에 동의합니다.</VerificationTitle>
      </VerificationNumberInputWrapper>

      <Button>회원가입</Button>
    </SignUpPageContainer>
  );
};

export default SignUpPage;
