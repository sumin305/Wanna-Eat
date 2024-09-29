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
import CardImage1 from '../../../../../assets/customer/card.png';
import CardImage2 from '../../../../../assets/customer/card2.png';
import CardImage3 from '../../../../../assets/customer/card3.png';
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
  const cardImages = [
    { index: 0, image: CardImage1 },
    { index: 1, image: CardImage2 },
    { index: 2, image: CardImage3 },
  ];
  const [goToSlide, setGoToSlide] = useState(null);

  useEffect(() => {
    setDepositPrice(
      depositPerMember * memberCount === 0
        ? 50000
        : depositPerMember * memberCount
    );

    // 회원 카드 정보 조회
  }, []);
  const slides = cardImages.map((card) => ({
    key: card.index,
    content: (
      <img
        src={card.image}
        onClick={() => setGoToSlide(card.index)}
        alt={`Card ${card.index}`}
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
  const test9 = async () => {};
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
          카드 상품 조회 테스트
        </button>
        <button size="short" onClick={test8}>
          카드 생성 테스트
        </button>
        <button size="short" onClick={test9}>
          카드 결제 테스트
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
