import { useNavigate } from 'react-router-dom';
import WEStep from '../../../../../component/customer/reservation/WEStep/WEStep.jsx';
import { ButtonWrapper } from '../TimeSelectPage/TimeSelectPage.js';
import theme from '../../../../../style/common/theme.js';
import Button from '../../../../../component/common/button/WEButton/WEButton.jsx';
import useRestaurantStore from 'stores/customer/useRestaurantStore';
import useReservationStore from '../../../../../stores/customer/useReservationStore.js';
import {
  DepositPaymentPageContainer,
  DepositInfoContainer,
  DepositPriceInfoWrapper,
  DepositPriceInfo,
  DepositPriceText,
  CardSelectBoxStyled,
} from './DepositPaymentPage.js';
import {
  getMyCreditCardList,
  payByCreditCard,
} from 'api/common/ssafyPay/card.js';

import { CardNameText } from 'pages/customer/user/CardManagePage/CardManagePage.js';
import { handleCheckFingerprint } from '../FingerprintAuthPage/FingerprintAuthPage.jsx';
import { payDepositPaymentByKakaoPay } from 'api/common/payment.js';
import Carousel from 'react-spring-3d-carousel';
import { config } from 'react-spring';
import { useState, useEffect } from 'react';
import useCommonStore from '../../../../../stores/common/useCommonStore.js';
import { cardMaps } from 'assets';
import useAuthStore from 'stores/customer/useAuthStore';

const DepositPaymentPage = () => {
  const navigate = useNavigate();
  const { email } = useCommonStore();
  const { depositPerMember, restaurantName } = useRestaurantStore();
  const { memberCount } = useReservationStore();
  const [depositPrice, setDepositPrice] = useState(0);

  const [cards, setCards] = useState([]);

  const [goToSlide, setGoToSlide] = useState(null);
  const {
    isSupported,
    isPasskeyRegistered,
    setIsSupported,
    setIsPasskeyRegistered,
    setIsAuthenticated,
    isAuthenticated,
    selectedCard,
    setSelectedCard,
  } = useAuthStore();
  const {
    reservationDate,
    startTime,
    endTime,
    setReservationDate,
    setStartTime,
    setEndTime,
    selectedTimes,
  } = useReservationStore();

  useEffect(() => {
    // 회원 카드 정보 조회
    const fetchCards = async () => {
      const result = await getMyCreditCardList();
      const cards = result.data.REC;
      setCards([...cards, { cardName: '카카오페이카드', cardNo: '0' }]);
    };
    setDepositPrice(
      depositPerMember * memberCount === 0
        ? 50000
        : depositPerMember * memberCount
    );

    const kakaoPayment = async () => {
      await payDepositPaymentByKakaoPay({});
      return;
    };

    const ssafyPayment = async () => {
      const result = await payByCreditCard(
        selectedCard.cardNo,
        selectedCard.cvc,
        2022,
        depositPerMember * memberCount === 0
          ? 50000
          : depositPerMember * memberCount
      );
      console.log('결제 결과', result);

      if (result.status === 200) {
        alert('결제 성공');
        navigate('/customer/reservation/success');
        setIsAuthenticated(false);
      } else {
        alert('결제에 실패했습니다.');
      }
    };

    fetchCards();
    console.log(reservationDate);
    // 인증 성공
    if (isAuthenticated) {
      // 카카오페이 결제
      if (selectedCard.cardNo === '0') {
        kakaoPayment();
      } else {
        // 싸피페이 결제
        ssafyPayment();
      }
    }
  }, []);

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

  const handleCardClick = (index, card) => {
    setGoToSlide(index);
    setSelectedCard(card);
  };

  const handleBeforeButtonClick = () => {
    navigate(-1);
  };

  const handleNextButtonClick = async () => {
    if (!selectedCard) {
      setSelectedCard(cards[0]);
    }

    navigate('/customer/password-auth');
  };
  return (
    <DepositPaymentPageContainer>
      <WEStep index={2} />
      <div>
        <DepositInfoContainer>
          <DepositPriceInfoWrapper>
            <DepositPriceInfo type={'number'}>
              {depositPrice.toLocaleString()}
            </DepositPriceInfo>
            <DepositPriceInfo>원</DepositPriceInfo>
          </DepositPriceInfoWrapper>
          <DepositPriceText>결제해주세요.</DepositPriceText>
        </DepositInfoContainer>
        <CardSelectBoxStyled>
          <Carousel
            slides={slides}
            goToSlide={goToSlide}
            animationConfig={config.gentle}
          />
        </CardSelectBoxStyled>
      </div>
      <ButtonWrapper>
        <Button
          onClick={handleBeforeButtonClick}
          size="short"
          color={'black'}
          backgroundColor={theme.color.disabled}
        >
          취소
        </Button>
        <Button onClick={handleNextButtonClick} size="venti">
          결제
        </Button>
      </ButtonWrapper>
    </DepositPaymentPageContainer>
  );
};

export default DepositPaymentPage;
