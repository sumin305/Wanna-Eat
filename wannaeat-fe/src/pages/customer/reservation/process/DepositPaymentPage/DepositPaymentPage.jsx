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
      console.log(cards);
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

  const handleNextButtonClick = () => {
    navigate('/customer/reservation/fingerprint-auth');
  };

  const test1 = () => {
    joinSsafyAccount();
  };

  const test2 = async () => {
    const result = await getSsafyPayAccount(email);
    console.log(result);
  };

  const test3 = async () => {
    const result = await getMerchantCategories();
    console.log(result);
  };

  // 가맹점 등록
  const test4 = async () => {
    const result = await registerMerchant('수마니가맹점');
    console.log(result);
  };

  // 카드 상품 조회
  const test5 = async () => {
    const result = await getCreditCardList();
    console.log(result);
  };

  // 카드 생성
  const test6 = async () => {
    const result = await createCreditCard();
    console.log(result);
  };

  // 내 카드 목록 조회
  const test7 = async () => {
    const result = await getMyCreditCardList();
    console.log(result);
  };

  // 카드 생성
  const test8 = async () => {
    const result = await createCreditCard();
    console.log(result);
  };

  // 카드 결제
  const test9 = async () => {
    const result = await payByCreditCard(
      selectedCard.cardNo,
      selectedCard.cvc,
      2022,
      depositPrice
    );
    console.log(result);
  };

  // 계좌 상품 목록 조회
  const test10 = async () => {
    const result = await getAccountList();
    console.log(result);
  };

  // 계좌 등록
  const test11 = async () => {
    const result = await createAccount();
    console.log(result);
  };

  const joinSsafyAccount = async () => {
    const result = await createSsafyPayAccount(email);
    console.log(result);
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
        <button size="short" onClick={test1}>
          가입 테스트
        </button>
        <button size="short" onClick={test2}>
          유저 조회 테스트
        </button>
        <button size="short" onClick={test3}>
          카테고리 조회 테스트
        </button>
        <button size="short" onClick={test4}>
          가맹점 등록 테스트
        </button>
        <button size="short" onClick={test5}>
          카드사 조회 테스트
        </button>
        <button size="short" onClick={test6}>
          카드 상품 등록 테스트
        </button>
        <button size="short" onClick={test7}>
          내 카드 상품 조회 테스트
        </button>
        <button size="short" onClick={test8}>
          카드 생성 테스트
        </button>
        <button size="short" onClick={test9}>
          카드 결제 테스트
        </button>
        <button size="short" onClick={test10}>
          계좌 리스트 조회 테스트
        </button>
        <button size="short" onClick={test11}>
          계좌 생성 테스트
        </button>

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
