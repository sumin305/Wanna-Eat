import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyCreditCardList } from 'api/common/ssafyPay/card.js';
import Carousel from 'react-spring-3d-carousel';
import {
  CardManagePageContainer,
  CardSelectBoxStyled,
  ButtonWrapper,
  CardNameText,
} from './CardManagePage.js';
import Button from '../../../../component/common/button/WEButton/WEButton';
import useHeaderStore from 'stores/common/useHeaderStore.js';
import { cardMaps } from 'assets';
import useAuthStore from 'stores/customer/useAuthStore.js';
import useMyInfoStore from '../../../../stores/customer/useMyInfoStore.js';
import useAlert from '../../../../utils/alert.js';

const CardManagePage = () => {
  const showAlert = useAlert();
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [goToSlide, setGoToSlide] = useState(null);
  const navigate = useNavigate();
  const { setPageName, setIsShowBackIcon, setActiveIcons } = useHeaderStore();
  const { isSupported, setIsPasskeyRegistered } = useAuthStore();
  const { email, nickname } = useMyInfoStore();

  const handleCardRegistButtonClick = () => {
    navigate('/customer/card-regist');
  };

  const handleCardClick = (index, card) => {
    setGoToSlide(index);
    setSelectedCard(card);
  };

  const handleFingerPrintRegistButtonClick = () => {
    showAlert('지문 등록!');
    handleRegisterPasskey();
  };
  const slides = cards.map((card, index) => ({
    key: index,
    content: (
      <div>
        <img
          onClick={() => handleCardClick(index, card)}
          width="144px"
          height="229px"
          src={cardMaps[card.cardName]}
          alt={`Card ${card.cardNo}`}
        />
        <CardNameText>{card.cardName}</CardNameText>
      </div>
    ),
  }));
  // 패스키 등록 함수
  const handleRegisterPasskey = async () => {
    try {
      const attestation = await navigator.credentials.create({
        publicKey: {
          challenge: new Uint8Array(32), // 서버에서 생성한 고유한 challenge 값 필요
          rp: { name: 'wanna-eat', id: window.location.hostname }, // RP 정보 (사이트 도메인)
          user: {
            id: new Uint8Array(16), // 사용자 ID (서버에서 고유하게 할당)
            name: nickname || 'unknown-user', // 사용자 이메일, undefined 방지
            displayName: nickname || 'Unknown User', // 사용자 이름
          },
          pubKeyCredParams: [{ type: 'public-key', alg: -7 }], // 공개 키 알고리즘
          encryptedKey: {
            userVerification: 'required', // 생체 인증 요구
          },
          timeout: 60000, // 타임아웃 설정 (60초)
        },
      });

      console.log('Attestation received:', attestation);
      // 서버에 패스키 등록 데이터를 보내서 저장
      // await serverRegisterPasskey(attestation);

      setIsPasskeyRegistered(true); // 패스키 등록 완료 상태로 변경
      showAlert('결제 패스키가 성공적으로 등록되었습니다.');
      return true;
    } catch (e) {
      console.error('Registration error:', e);
      showAlert('결제 패스키 등록에 실패했습니다.');
      return false;
    }
  };
  useEffect(() => {
    // 회원 카드 정보 조회
    const fetchCards = async () => {
      const result = await getMyCreditCardList();
      const cards = result.data.REC;
      setCards([...cards, { cardName: '카카오페이카드', cardNo: '0' }]);
    };
    fetchCards();
    setPageName('카드 관리');
    setIsShowBackIcon(true);
    setActiveIcons([]);
  }, []);

  return (
    <CardManagePageContainer>
      <ButtonWrapper>
        <Button
          size="long"
          outlined={'true'}
          onClick={handleCardRegistButtonClick}
        >
          카드 추가하기
        </Button>
        <Button
          size="long"
          outlined={'true'}
          onClick={handleFingerPrintRegistButtonClick}
        >
          지문 등록하기
        </Button>
      </ButtonWrapper>
      <CardSelectBoxStyled>
        <Carousel slides={slides} goToSlide={goToSlide} />
      </CardSelectBoxStyled>
    </CardManagePageContainer>
  );
};
export default CardManagePage;
