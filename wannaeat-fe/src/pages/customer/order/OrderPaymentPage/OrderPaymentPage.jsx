import { useNavigate, useParams } from 'react-router-dom';
import { payMenuByKakaoPay } from 'api/common/payment';
import { useEffect, useState } from 'react';
import useOrderStore from 'stores/customer/useOrderStore';
import { getMyCreditCardList } from 'api/common/ssafyPay/card.js';
import { CardNameText } from 'pages/customer/user/CardManagePage/CardManagePage.js';
import {
  DepositPaymentPageContainer,
  DepositInfoContainer,
  DepositPriceInfoWrapper,
  DepositPriceInfo,
  DepositPriceText,
  CardSelectBoxStyled,
} from './OrderPaymentPage.js';
import Carousel from 'react-spring-3d-carousel';
import { cardMaps } from 'assets';
import theme from 'style/common/theme';
import Button from 'component/common/button/WEButton/WEButton.jsx';
import { ButtonWrapper } from 'pages/customer/reservation/process/TimeSelectPage/TimeSelectPage.js';
import { config } from 'react-spring';
import useAlert from '../../../../utils/alert.js';

const OrderPaymentPage = () => {
  const showAlert = useAlert();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [goToSlide, setGoToSlide] = useState(null);
  const [selectedardIndex, setSelectedCardIndex] = useState(0);
  const { selectedCard, setSelectedCard, payPrice, payOrders, setIsAllPaid } =
    useOrderStore();
  const params = useParams();
  // 화면 렌더링될때 호출되는 함수 // 카드 조회
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

    const role = localStorage.getItem('role');
    if (role !== 'CUSTOMER') {
      console.log('손님이 아닙니다.');
      setCards([{ cardName: '카카오페이카드', cardNo: '0' }]);
      return;
    }

    fetchCards();
  }, []);

  useEffect(() => {
    setSelectedCard(cards[selectedardIndex]);
  }, [selectedCard]);

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
  const kakaoPayment = async () => {
    console.log('ordersToSend', payOrders);
    const result = await payMenuByKakaoPay({
      reservationUrl: params.url,
      paymentMenuRequestDtos: payOrders.map((order) => {
        return {
          menuId: order.menuId,
          orderId: order.orderId,
          menuCount: order.count,
        };
      }),
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
    console.log(cards);
    console.log(selectedCard);
    if (!selectedCard) {
      setSelectedCard(cards[0]);
    }

    // 카카오페이 시
    if (
      (cards && cards.length == 1) ||
      (selectedCard && selectedCard.cardNo === '0')
    ) {
      kakaoPayment();
      return;
    }

    // 싸피페이 시
    navigate('/customer/password-auth?type=order&url=' + params.url);
  };

  return (
    <DepositPaymentPageContainer>
      <DepositInfoContainer>
        <DepositPriceInfoWrapper>
          <DepositPriceInfo type={'number'}>
            {payPrice.toLocaleString()}
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

export default OrderPaymentPage;
