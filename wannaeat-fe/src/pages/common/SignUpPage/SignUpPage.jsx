import { useEffect, useState } from 'react';
import WECheck from '../../../component/common/check/WECheck.jsx';
import Textfield from '../../../component/common/textfield/WETextfield/WETextfield.jsx';
import Button from '../../../component/common/button/WEButton/WEButton.jsx';
import useTextfieldStore from '../../../stores/common/useTextfieldStore.js';
import useModalStore from '../../../stores/common/useModalStore.js';
import WEToggle from '../../../component/common/toggle/WEToggle.jsx';
import { createSsafyPayAccount } from 'api/common/ssafyPay/user.js';
import {
  checkNickname,
  sendCode,
  verifyCode,
} from '../../../api/common/join.js';
import { createAccount } from 'api/common/ssafyPay/account.js';
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
import useCommonStore, { ROLE } from '../../../stores/common/useCommonStore.js';
import useAlert from 'utils/alert';
import { useNavigate } from 'react-router-dom';
const SignUpPage = () => {
  const { setRole, email, socialType, requestSignUp } = useCommonStore();
  const { setError, clearError } = useTextfieldStore();
  const [isChecked, setIsChecked] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [verifyNickname, setVerifyNickname] = useState(false);
  const [isVerificationCodeSent, setIsVerificationCodeSent] = useState(false);
  const [verifyPhoneNumber, setVerifyPhoneNumber] = useState(false);
  const [code, setCode] = useState(0);
  const navigate = useNavigate();
  const alert = useAlert();

  const [userInfo, setUserInfo] = useState({
    nickname: '',
    email: '',
    socialType: '',
    role: '',
    phone: '',
  });

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

  // 닉네임 중복 검사 핸들러
  const handleNicknameVerifyButtonClick = async () => {
    const response = await checkNickname(userInfo.nickname);
    console.log(response);
    if (response.status === 200) {
      alert('사용 가능한 닉네임입니다.');
      setVerifyNickname(true);
    } else {
      alert('사용 불가능한 닉네임입니다.');
      setVerifyNickname(false);
    }
  };

  // 휴대번호 변경 핸들러
  const handlePhoneNumberChange = (e) => {
    const phoneNumber = e.target.value;
    setUserInfo((prevState) => ({
      ...prevState,
      phone: phoneNumber,
    }));
  };

  // 휴대번호 인증 버튼 핸들러
  const handlePhoneNumberVerifyButtonClick = async () => {
    const response = await sendCode(userInfo.phone, socialType);
    console.log(response);
    if (response.status === 201) {
      // 휴대번호 인증 문자 요청
      alert('인증번호가 전송되었습니다.');
      setIsVerificationCodeSent(true);
    } else {
      alert('인증번호 전송에 실패했습니다.');
    }
  };

  const handleCheckCodeButtonClick = async () => {
    // 전화번호 인증 코드 검증
    const response = await verifyCode(
      parseInt(code),
      userInfo.phone,
      socialType
    );

    if (response.status === 200) {
      alert('인증이 완료되었습니다.');
      setVerifyPhoneNumber(true);
    } else {
      alert('인증에 실패했습니다. ');
    }
  };

  // 싸피 금융 API 사용자 등록
  const joinSsafyAccount = async () => {
    // 계정 생성
    const createAccountResult = await createSsafyPayAccount(email);

    // 계좌 생성
    const createDepositAccountResult = await createAccount();

    if (createAccountResult.status !== 201) {
      console.log(createAccountResult.response.data.responseMessage);
      return false;
    }

    if (createDepositAccountResult.status != 201) {
      console.log(createDepositAccountResult.response.data.responseMessage);
      return false;
    }

    console.log('싸피 계정 가입 성공');
    return true;
  };

  // 회원가입 버튼 핸들러
  const handleJoinButtonClick = async () => {
    // 약관 동의했는지 체크
    if (!isChecked) {
      alert('약관에 동의해주세요');
      return;
    }

    // 닉네임 검사했는지 체크
    if (!verifyNickname) {
      alert('닉네임 중복 검사 해주세요');
      return;
    }

    // 휴대번호 인증했는지 체크
    // if (!verifyPhoneNumber) {
    //   alert('휴대번호 인증해주세요');
    //   return;
    // }

    // 회원가입 요청할 request form
    const requestUserInfo = {
      nickname: userInfo.nickname,
      role: isCustomer ? ROLE.CUSTOMER : ROLE.MANAGER,
      phone: userInfo.phone,
    };

    // 손님 회원가입일 경우 싸피 페이 사용자 계정 생성 및 계좌 생성
    if (requestUserInfo.role === ROLE.CUSTOMER) {
      await joinSsafyAccount();
    }

    // 회원가입 요청
    const response = await requestSignUp(requestUserInfo);

    if (response.status === 201) {
      if (requestUserInfo.role === ROLE.CUSTOMER) {
        setRole(ROLE.CUSTOMER);
        navigate('/password-regist');
      } else {
        navigate('/manager');
        setRole(ROLE.MANAGER);
      }
    } else {
      alert(response.response.data.message);
    }
  };

  return (
    <SignUpPageContainer>
      <SignUpPageHeader>추가 정보 입력</SignUpPageHeader>
      <SignUpPageHeaderHr />
      <UserModeWrapper>
        <InputTitle>사용자 모드</InputTitle>
        <WEToggle isOn={isCustomer} setIsOn={setIsCustomer}></WEToggle>
        <UserModeToggle></UserModeToggle>
      </UserModeWrapper>

      <InputContainer>
        <InputWrapper>
          <InputTitle>닉네임 </InputTitle>
          <TextfieldWrapperWithButton>
            <Textfield
              name="nickname"
              value={userInfo.nickname}
              onChange={handleNicknameChange}
              placeholder="사용할 닉네임을 입력해주세요"
            ></Textfield>
            <TextFieldWrapperButton onClick={handleNicknameVerifyButtonClick}>
              검사
            </TextFieldWrapperButton>
          </TextfieldWrapperWithButton>
        </InputWrapper>
        <InputWrapper>
          <InputTitle>이메일 </InputTitle>
          <TextfieldWrapper>
            <Textfield name="email" disabled value={email}></Textfield>
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
            <Textfield
              type="number"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              placeholder="인증번호를 입력해주세요"
            ></Textfield>
            <TextFieldWrapperButton onClick={handleCheckCodeButtonClick}>
              확인
            </TextFieldWrapperButton>
          </TextfieldWrapperWithButton>
        </InputWrapper>
      </InputContainer>

      <ButtonWrapper>
        <VerificationNumberInputWrapper
          onClick={() => setIsChecked(!isChecked)}
        >
          <WECheck isChecked={isChecked} />
          <VerificationTitle>약관에 동의합니다.</VerificationTitle>
        </VerificationNumberInputWrapper>
        <Button onClick={handleJoinButtonClick}>회원가입</Button>
      </ButtonWrapper>
    </SignUpPageContainer>
  );
};

export default SignUpPage;
