import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import theme from '../../../../../style/common/theme';
import { ButtonWrapper } from '../TimeSelectPage/TimeSelectPage';
import Button from '../../../../../component/common/button/WEButton/WEButton';

// 생체 인증 (지문 등) 확인 함수
export const handleCheckFingerprint = async () => {
  try {
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
    return true;
  } catch (e) {
    console.error('Authentication error:', e);
    return false;
  }
};
const FingerprintAuthPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 인증 상태 저장
  const [isSupported, setIsSupported] = useState(false); // WebAuthn 지원 여부 저장
  const [isPasskeyRegistered, setIsPasskeyRegistered] = useState(false); // 패스키 등록 여부 저장

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
          rp: { name: 'Your App Name', id: window.location.hostname }, // RP 정보 (사이트 도메인)
          user: {
            id: new Uint8Array(16), // 사용자 ID (서버에서 고유하게 할당)
            name: 'user@example.com', // 사용자 이메일 또는 이름
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
    } catch (e) {
      console.error('Registration error:', e);
      alert('패스키 등록에 실패했습니다.');
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
      setIsAuthenticated(true); // 인증 성공 상태로 변경
      navigate('/customer/reservation/deposit-payment'); // 인증 성공 시 페이지 이동
    } catch (e) {
      alert('인증에 실패했습니다. 다시 시도해주세요.');
      navigate('/customer/reservation/deposit-payment'); // 인증 성공 시 페이지 이동
    }
  };

  const handleBeforeButtonClick = () => {
    navigate('/customer/reservation/seat-select');
  };

  return (
    <div>
      {/* 패스키 등록 버튼 */}
      <button onClick={handleRegisterPasskey}>패스키 등록하기</button>

      {/* WebAuthn 지원 여부 확인 후 지문 확인 버튼 활성화 */}
      {isSupported ? (
        <button onClick={handleCheckFingerprint}>지문 확인하기</button>
      ) : (
        <p>이 기기는 생체 인증을 지원하지 않습니다.</p>
      )}

      <ButtonWrapper>
        <Button
          onClick={handleBeforeButtonClick}
          size="short"
          color={'black'}
          backgroundColor={theme.color.disabled}
        >
          이전
        </Button>
      </ButtonWrapper>

      {/* 인증 성공 여부 표시 */}
      {isAuthenticated && <p>인증이 성공적으로 완료되었습니다!</p>}
    </div>
  );
};

export default FingerprintAuthPage;
