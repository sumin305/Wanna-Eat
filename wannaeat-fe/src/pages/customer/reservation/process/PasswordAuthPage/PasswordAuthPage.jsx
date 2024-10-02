import { PasswordInputContainer } from './PasswordAuthPage';
import {
  BlackOutLayout,
  PasswordTitle,
  PasswordInputBox,
  PasswordCircle,
  PasswordKeypadWrapper,
  PasswordKey,
} from 'pages/common/PasswordRegistPage/PasswordRegistPage.js';
import { useState, useEffect } from 'react';
import FingerPrint from 'assets/icons/common/fingerprint.svg';
import { useNavigate } from 'react-router-dom';
import useAuthStore from 'stores/customer/useAuthStore';

const PasswordAuthPage = () => {
  const [title, setTitle] = useState('결제 비밀번호를 입력해주세요');
  const [inputNumber, setInputNumber] = useState('');
  const [number, setNumber] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const {
    isSupported,
    isPasskeyRegistered,
    setIsAuthenticated,
    isAuthenticated,
  } = useAuthStore();

  useEffect(() => {
    suffleNumber();
  }, [inputNumber]);

  const randomPassword = () => {
    let newPassword = JSON.parse(JSON.stringify(number));
    newPassword.push('<');
    newPassword.splice(9, 0, '지문');
    let newJSXArr = newPassword.map((num) => (
      <PasswordKey key={num} onClick={() => handleNumberButtonClick(num)}>
        {num === '지문' ? <img src={FingerPrint}></img> : num}
      </PasswordKey>
    ));

    return newJSXArr;
  };
  const passwordCircle = () => {
    let newJSXArr = [];
    for (let i = 0; i < inputNumber.length; i++) {
      newJSXArr.push(<PasswordCircle key={i} color={'white'} />);
    }

    for (let i = 0; i < 6 - inputNumber.length; i++) {
      newJSXArr.push(
        <PasswordCircle key={inputNumber.length + i} color={'gray'} />
      );
    }
    return newJSXArr;
  };

  const suffleNumber = () => {
    setNumber(number.sort(() => Math.random() - 0.5));
  };
  const handleNumberButtonClick = (num) => {
    if (num === '<') {
      setInputNumber('');
      return;
    }

    if (num === '지문') {
      handleCheckFingerprint();
      return;
    }

    setInputNumber(inputNumber + num);
    if (inputNumber.length === 5) {
      setPassword(inputNumber);
      setInputNumber('');
      setIsAuthenticated(true);

      alert('비밀번호 검사!');

      if (isAuthenticated) {
        navigate('/customer/reservation/deposit-payment');
      } else {
        alert('인증에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };
  // 생체 인증 (지문 등) 확인 함수
  const handleCheckFingerprint = async () => {
    try {
      if (!isSupported || !isPasskeyRegistered) {
        alert(
          '이 기기는 지문 인식을 지원하지 않거나 패스키가 등록되지 않았습니다.'
        );
        return;
      }

      const assertion = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array([117, 61, 252, 231, 191, 241, 32, 4]), // 서버에서 생성한 고유한 값 (랜덤 값)
          rpId: window.location.hostname, // 현재 웹사이트 도메인 (RP ID)
          userVerification: 'required', // 생체 인증 강제 (지문 등)
          timeout: 60000, // 타임아웃 설정 (60초)
        },
      });

      console.log('Assertion Received:', assertion);

      // 인증 성공 처리
      setIsAuthenticated(true);
      navigate('/customer/reservation/deposit-payment');
    } catch (e) {
      alert('인증에 실패했습니다. 다시 시도해주세요.');
    }
  };
  return (
    <div>
      <BlackOutLayout />
      <PasswordInputContainer>
        <div></div>
        <PasswordTitle>{title}</PasswordTitle>
        <PasswordInputBox>{passwordCircle()}</PasswordInputBox>
        <PasswordKeypadWrapper>{randomPassword()}</PasswordKeypadWrapper>
      </PasswordInputContainer>
    </div>
  );
};

export default PasswordAuthPage;
