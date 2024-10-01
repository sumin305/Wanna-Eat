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
import CardImage1 from '../../../../../assets/customer/카카오페이카드.png';
import CardImage2 from '../../../../../assets/customer/농협카드.png';
import CardImage3 from '../../../../../assets/customer/신한카드.png';
import CardImage4 from '../../../../../assets/customer/우리카드.png';
import CardImage5 from '../../../../../assets/customer/국민카드.png';

import {
  getMerchantCategories,
  registerMerchant,
  getCreditCardList,
  createCreditCard,
  getMyCreditCardList,
  payByCreditCard,
} from 'api/common/ssafyPay/card.js';

import {
  createSsafyPayAccount,
  getSsafyPayAccount,
} from 'api/common/ssafyPay/user.js';

import { getAccountList, createAccount } from 'api/common/ssafyPay/account.js';
import { payDepositPaymentByKakaoPay } from 'api/common/payment.js';
import Carousel from 'react-spring-3d-carousel';
import { config } from 'react-spring';
import { useState, useEffect } from 'react';
import useCommonStore from '../../../../../stores/common/useCommonStore.js';
const DepositPaymentPage = () => {
  const navigate = useNavigate();
  const { email } = useCommonStore();
  const { depositPerMember, restaurantName } = useRestaurantStore();
  const { memberCount } = useReservationStore();
  const [depositPrice, setDepositPrice] = useState(0);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const cardImages = {
    카카오페이카드: CardImage1,
    농협카드: CardImage2,
    신협카드: CardImage3,
    우리카드: CardImage4,
    KB국민카드: CardImage5,
  };
  const [goToSlide, setGoToSlide] = useState(null);

  useEffect(() => {
    // 회원 카드 정보 조회
    const fetchCards = async () => {
      const result = await getMyCreditCardList();
      const cards = result.data.REC;
      setCards([...cards, { cardIssuerName: '카카오페이카드', cardNo: '0' }]);
    };
    setDepositPrice(
      depositPerMember * memberCount === 0
        ? 50000
        : depositPerMember * memberCount
    );
    fetchCards();
  }, []);
  const slides = cards.map((card, index) => ({
    key: index,
    content: (
      <img
        onClick={() => {
          setGoToSlide(index);
          setSelectedCard(card);
        }}
        width="144px"
        height="229px"
        src={cardImages[card.cardIssuerName]}
        alt={`Card ${card.cardNo}`}
      />
    ),
  }));

  const handleBeforeButtonClick = () => {
    navigate(-1);
  };

  const handleNextButtonClick = async () => {
    if (!selectedCard) {
      setSelectedCard(cards[0]);
    }

    // 카카오페이 결제
    if (selectedCard.cardNo === '0') {
      await payDepositPaymentByKakaoPay({});
      return;
    }

    // 싸피페이 결제
    const result = await payByCreditCard(
      selectedCard.cardNo,
      selectedCard.cvc,
      2022,
      depositPrice
    );

    if (result.status === 200) {
      alert('결제 성공');
    }

    navigate('/customer/reservation/fingerprint-auth');
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
