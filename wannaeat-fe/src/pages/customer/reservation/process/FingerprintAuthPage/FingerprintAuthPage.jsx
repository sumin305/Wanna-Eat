import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import theme from '../../../../../style/common/theme';
import { ButtonWrapper } from '../TimeSelectPage/TimeSelectPage';
import Button from '../../../../../component/common/button/WEButton/WEButton';

const FingerprintAuthPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // 인증 상태 저장
  const [isSupported, setIsSupported] = useState(false); // WebAuthn 지원 여부 저장

  useEffect(() => {
    // WebAuthn 기능이 지원되는지 확인
    if (window.PublicKeyCredential) {
      setIsSupported(true);
    } else {
      alert('이 브라우저는 생체 인증을 지원하지 않습니다.');
    }
  }, []);

  // 생체 인증 (지문 등) 확인 함수
  const handleCheckButtonClick = async () => {
    try {
      if (!isSupported) {
        alert('이 기기는 지문 인식을 지원하지 않습니다.');
        return;
      }

      // WebAuthn을 통해 생체 인증 수행
      const assertion = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array([117, 61, 252, 231, 191, 241, 32, 4]), // 서버에서 생성한 고유한 값 (랜덤 값)
          rpId: window.location.hostname, // 현재 웹사이트 도메인 (RP ID)
          userVerification: 'required',  // 생체 인증 강제 (지문 등)
          timeout: 60000,  // 타임아웃 설정 (60초)
        },
      });

      console.log('Assertion Received:', assertion);

      // 인증 성공 처리
      setIsAuthenticated(true); // 인증 성공 상태로 변경
      navigate('/customer/reservation/success'); // 인증 성공 시 페이지 이동

    } catch (e) {
      console.log('Authentication error:', e);
      alert('인증에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleBeforeButtonClick = () => {
    navigate('/customer/reservation/seat-select');
  };

  return (
    <div>
      {/* WebAuthn 지원 여부 확인 후 지문 확인 버튼 활성화 */}
      {isSupported ? (
        <button onClick={handleCheckButtonClick}>지문 확인하기</button>
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