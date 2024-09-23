import { useNavigate } from 'react-router-dom';
const FingerprintAuthPage = () => {
  const navigate = useNavigate();
  const handleRegisterButtonClick = async () => {
    try {
      await navigator.credentials.create({
        publicKey: {
          challenge: new Uint8Array([117, 61, 252, 231, 191, 241, 32, 4]),
          rp: { id: 'j11b302.p.ssafy.io', name: 'wanna-eat' }, // 명시적으로 도메인 설정
          user: {
            id: new Uint8Array([79, 252, 83, 72, 214, 7, 89, 26]),
            name: 'sumin',
            displayName: 'sumin',
          },
          pubKeyCredParams: [
            { type: 'public-key', alg: -7 }, // ES256 알고리즘 (ECDSA with SHA-256)
            { type: 'public-key', alg: -257 }, // RS256 알고리즘 (RSASSA-PKCS1-v1_5 with SHA-256)
          ],
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleCheckButtonClick = async () => {
    try {
      await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array([117, 61, 252, 231, 191, 241, 32, 4]),
          rpId: 'j11b302.p.ssafy.io',
          allowCredentials: [
            {
              type: 'public-key',
              id: new Uint8Array([64, 66, 25, 78, 168, 226, 174, 23]),
            },
          ],
          userVerification: 'required',
          timeout: 60000, // 타임아웃 설정 (60초)
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <button onClick={handleRegisterButtonClick}>지문 등록하기</button>
      <button onClick={handleCheckButtonClick}>지문 확인하기</button>
    </div>
  );
};

export default FingerprintAuthPage;
