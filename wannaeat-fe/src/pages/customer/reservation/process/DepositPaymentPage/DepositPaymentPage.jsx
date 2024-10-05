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
import { getMyCreditCardList } from 'api/common/ssafyPay/card.js';

import { CardNameText } from 'pages/customer/user/CardManagePage/CardManagePage.js';
import Carousel from 'react-spring-3d-carousel';
import { config } from 'react-spring';
import { useState, useEffect } from 'react';
import useCommonStore from '../../../../../stores/common/useCommonStore.js';
import { cardMaps } from 'assets';
import useAuthStore from 'stores/customer/useAuthStore';
import { payDepositPaymentByKakaoPay } from 'api/common/payment.js';

const DepositPaymentPage = () => {
  const navigate = useNavigate();
  const { depositPerMember, restaurantId } = useRestaurantStore();
  const [depositPrice, setDepositPrice] = useState(0);
  const [cards, setCards] = useState([]);
  const [goToSlide, setGoToSlide] = useState(null);
  const [selectedardIndex, setSelectedCardIndex] = useState(0);
  const {
    selectedCard,
    setSelectedCard,
    memberCount,
    reservationDate,
    startTime,
    endTime,
  } = useReservationStore();

  useEffect(() => {
    setSelectedCard(cards[selectedardIndex]);
  }, [selectedCard]);

  useEffect(() => {
    // 회원 카드 정보 조회
    const fetchCards = async () => {
      const result = await getMyCreditCardList();
      if (result.status !== 200) {
        alert('카드 목록 조회 실패');
      }
      const cards = result.data.REC;
      setCards([...cards, { cardName: '카카오페이카드', cardNo: '0' }]);
    };
    setDepositPrice(
      depositPerMember * memberCount === 0
        ? 50000
        : depositPerMember * memberCount
    );
    fetchCards();

    // 카카오페이 후 redirect 되었을 경우,
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
    setSelectedCardIndex(index);
    setSelectedCard(card);
  };

  const handleBeforeButtonClick = () => {
    navigate(-1);
  };

  const kakaoPayment = async (price) => {
    const result = await payDepositPaymentByKakaoPay({
      price: price,
      restaurantId: restaurantId,
      reservationRegisterRequestDto: {
        restaurantId: restaurantId,
        reservationDate: reservationDate,
        reservationStartTime: startTime,
        reservationEndTime: endTime,
        memberCnt: memberCount,
        tableList: [],
      },
    });

    console.log(result);
    if (result.status !== 200) {
      alert('결제에 실패했습니다.');
    }

    window.location.href = result.data.data.next_redirect_mobile_url;
    return;
  };

  // 결제 버튼 클릭
  const handleNextButtonClick = async () => {
    if (!selectedCard) {
      setSelectedCard(cards[0]);
    }

    // 카카오페이 시
    if (selectedCard && selectedCard.cardNo === '0') {
      kakaoPayment(
        depositPerMember * memberCount === 0
          ? 50000
          : depositPerMember * memberCount
      );
      return;
    }

    // 싸피페이 시
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
