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
import { cardMaps } from 'assets';
import {
  payDepositPaymentByKakaoPay,
  payDepositPaymentSuccessByKakaoPay,
} from 'api/common/payment.js';
import useAlert from '../../../../../utils/alert.js';

const DepositPaymentPage = () => {
  const navigate = useNavigate();
  const { depositPerMember, restaurantId, setRestaurantName } =
    useRestaurantStore();
  const [depositPrice, setDepositPrice] = useState(0);
  const [cards, setCards] = useState([]);
  const [goToSlide, setGoToSlide] = useState(null);
  const showAlert = useAlert();
  const [selectedardIndex, setSelectedCardIndex] = useState(0);
  const {
    selectedCard,
    setSelectedCard,
    memberCount,
    reservationDate,
    startTime,
    endTime,
    tableList,
    setReservationDate,
    setStartTime,
    setEndTime,
    setReservationUrl,
    setTableList,
    setMemberCount,
  } = useReservationStore();

  useEffect(() => {
    setSelectedCard(cards[selectedardIndex]);
  }, [selectedCard]);

  useEffect(() => {
    // 회원 카드 정보 조회
    const fetchCards = async () => {
      const result = await getMyCreditCardList();
      if (result.status !== 200) {
        setCards([{ cardName: '카카오페이카드', cardNo: '0' }]);
        return;
      }
      const cards = result.data.REC;
      setCards([...cards, { cardName: '카카오페이카드', cardNo: '0' }]);
    };

    setDepositPrice(
      depositPerMember * memberCount === 0
        ? 50000
        : depositPerMember * memberCount
    );

    // 카카오페이 성공 시 재요청
    const reRequestKakaoPay = async (paymentId, pgToken, type) => {
      const result = await payDepositPaymentSuccessByKakaoPay(
        paymentId,
        pgToken,
        type
      );

      if (result.status === 200) {
        const reservationInfo = result.data.data.reservationInfo;
        setReservationDate(reservationInfo.reservationDate);
        setRestaurantName(reservationInfo.restaurantName);
        setMemberCount(reservationInfo.memberCnt);
        setStartTime(reservationInfo.reservationStartTime);
        setEndTime(reservationInfo.reservationEndTime);
        setTableList(reservationInfo.tableList);
        setReservationUrl(
          process.env.REACT_APP_CLIENT_URL +
            '/customer/order/' +
            reservationInfo.reservationUrl
        );
        navigate('/customer/reservation/success');
        showAlert('결제를 성공했습니다.');
      } else {
        showAlert('결제에 실패했습니다.');
      }
    };
    fetchCards();

    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    // 카카오페이 후 redirect 되었을 경우,
    if (searchParams.has('status')) {
      // 결제 성공
      if (searchParams.get('status') === 'success') {
        const paymentId = searchParams.get('payment_id');
        const pgToken = searchParams.get('pg_token');
        const type = searchParams.get('type');

        reRequestKakaoPay(paymentId, pgToken, type);
      } else if (searchParams.get('status') === 'fail') {
        showAlert('결제에 실패했습니다.');
      } else if (searchParams.get('status') === 'cancel') {
        showAlert('결제가 취소되었습니다.');
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
        tableList: tableList,
      },
    });

    console.log(result);
    if (result.status !== 200) {
      showAlert('결제에 실패했습니다.');
      return;
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
    if (
      (cards && cards.length == 1) ||
      (selectedCard && selectedCard.cardNo === '0')
    ) {
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
