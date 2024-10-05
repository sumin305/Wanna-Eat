import { useEffect } from 'react';
import { useState } from 'react';
import FingerPrint from 'assets/icons/common/fingerprint.svg';
import useCommonStore, { ROLE } from '../../../stores/common/useCommonStore';
import {
  BlackOutLayout,
  PasswordInputContainer,
  PasswordTitle,
  PasswordInputBox,
  PasswordCircle,
  PasswordKeypadWrapper,
  PasswordKey,
} from './PasswordRegistPage';
import { useNavigate } from 'react-router-dom';
import useAuthStore from 'stores/customer/useAuthStore';
import { registPassword } from 'api/customer/user';
const PasswordRegistPage = () => {
  const { setRole, email } = useCommonStore();
  const [title, setTitle] = useState('결제 비밀번호를 등록해주세요');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [number, setNumber] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [password, setPassword] = useState('');
  const [inputNumber, setInputNumber] = useState('');
  const { isSupported, setIsSupported, setIsPasskeyRegistered } =
    useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    suffleNumber();
  }, [inputNumber]);

  const randomPassword = () => {
    let newPassword = JSON.parse(JSON.stringify(number));
    newPassword.push('<');
    newPassword.splice(9, 0, '취소');
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

  useEffect(() => {
    // WebAuthn 기능이 지원되는지 확인
    if (window.PublicKeyCredential) {
      setIsSupported(true);
    } else {
      alert('이 브라우저는 생체 인증을 지원하지 않습니다.');
    }
  }, []);

  // 패스키 등록 함수
  const handleRegisterPasskey = async () => {
    try {
      if (!isSupported) {
        alert('이 기기는 생체 인증을 지원하지 않습니다.');
        return;
      }

      const attestation = await navigator.credentials.create({
        publicKey: {
          challenge: new Uint8Array(32), // 서버에서 생성한 고유한 challenge 값 필요
          rp: { name: 'wanna-eat', id: window.location.hostname }, // RP 정보 (사이트 도메인)
          user: {
            id: new Uint8Array(16), // 사용자 ID (서버에서 고유하게 할당)
            name: email, // 사용자 이메일 또는 이름
            displayName: 'User', // 사용자 이름
          },
          pubKeyCredParams: [{ type: 'public-key', alg: -7 }], // 공개 키 알고리즘
          authenticatorSelection: {
            userVerification: 'required', // 생체 인증 요구
          },
          timeout: 60000, // 타임아웃 설정 (60초)
        },
      });

      console.log('Attestation received:', attestation);

      // 서버에 패스키 등록 데이터를 보내서 저장
      // await serverRegisterPasskey(attestation);

      setIsPasskeyRegistered(true); // 패스키 등록 완료 상태로 변경
      alert('패스키가 성공적으로 등록되었습니다.');
      return true;
    } catch (e) {
      console.error('Registration error:', e);
      alert('패스키 등록에 실패했습니다.');
      return false;
    }
  };

  const handleNumberButtonClick = async (num) => {
    if (num === '<') {
      setInputNumber('');
      return;
    }

    if (num === '취소') {
      navigate(-1);
      return;
    }

    setInputNumber(inputNumber + num);
    if (inputNumber.length === 5) {
      // 재입력 비밀번호면,
      if (isValidPassword) {
        // 비밀번호가 일치하면,
        if (inputNumber === password) {
          const registPasswordResult = await registPassword(inputNumber + num);
          if (registPasswordResult.status === 200) {
            alert('결제 비밀번호 등록 성공');
            navigate('/customer');
            setRole(ROLE.CUSTOMER);
            return;
          }
          alert('결제 비밀번호 등록 실패');
          setPassword('');
          setInputNumber('');
          setTitle('결제 비밀번호를 등록해주세요');
          setIsValidPassword(false);
        } else {
          alert('비밀번호가 일치하지 않습니다.');
          setPassword('');
          setInputNumber('');
          setTitle('결제 비밀번호를 등록해주세요');
          setIsValidPassword(false);
        }
      }
      // 등록 비밀번호면,
      else {
        setPassword(inputNumber);
        setTitle('결제 비밀번호를 재입력해주세요');
        setInputNumber('');
        setIsValidPassword(true);
      }
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

export default PasswordRegistPage;
