import { PasswordInputContainer } from './PasswordAuthPage';
import { payDepositPaymentBySsafyPay } from 'api/common/payment.js';
import { payMenuBySsafyPay } from 'api/common/payment';
import {
  BlackOutLayout,
  PasswordTitle,
  PasswordInputBox,
  PasswordCircle,
  PasswordKeypadWrapper,
  PasswordKey,
} from 'pages/common/PasswordRegistPage/PasswordRegistPage.js';
import { useState, useEffect } from 'react';
import FingerPrint from 'assets/icons/common/fingerprint.svg';
import { useNavigate } from 'react-router-dom';
import useAuthStore from 'stores/customer/useAuthStore';
import useRestaurantStore from 'stores/customer/useRestaurantStore';
import useOrderStore from 'stores/customer/useOrderStore';
import useReservationStore from '../../../../../stores/customer/useReservationStore.js';
import useAlert from '../../../../../utils/alert.js';

const PasswordAuthPage = () => {
  const showAlert = useAlert();
  const [title, setTitle] = useState('결제 비밀번호를 입력해주세요');
  const [inputNumber, setInputNumber] = useState('');
  const [number, setNumber] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const { isSupported, isPasskeyRegistered, setIsAuthenticated } =
    useAuthStore();
  const { depositPerMember, restaurantId } = useRestaurantStore();
  const {
    reservationDate,
    startTime,
    endTime,
    memberCount,
    selectedCard,
    setReservationUrl,
    tableList,
  } = useReservationStore();
  useEffect(() => {
    suffleNumber();
  }, [inputNumber]);
  const { selectedCard: selectedOrderCard, payOrders } = useOrderStore();

  const randomPassword = () => {
    let newPassword = JSON.parse(JSON.stringify(number));
    newPassword.push('<');
    newPassword.splice(9, 0, '취소');
    let newJSXArr = newPassword.map((num) => (
      <PasswordKey key={num} onClick={() => handleNumberButtonClick(num)}>
        {num}
      </PasswordKey>
    ));

    return newJSXArr;
  };
  const passwordCircle = () => {
    let newJSXArr = [];
    for (let i = 0; i < inputNumber.length; i++) {
      newJSXArr.push(<PasswordCircle key={i} color={'white'} />);
    }

    for (let i = 0; i < 6 - inputNumber.length; i++) {
      newJSXArr.push(
        <PasswordCircle key={inputNumber.length + i} color={'gray'} />
      );
    }
    return newJSXArr;
  };

  const suffleNumber = () => {
    setNumber(number.sort(() => Math.random() - 0.5));
  };

  const handleNumberButtonClick = (num) => {
    if (num === '<') {
      setInputNumber(inputNumber.substring(0, inputNumber.length - 1));
      return;
    }

    if (num === '취소') {
      navigate(-1);
      return;
    }
    setInputNumber(inputNumber + num);

    // 비밀번호를 다 입력했을때,
    if (inputNumber.length === 5) {
      setPassword(inputNumber);
      setInputNumber('');

      // 주문 결제인 경우
      const url = new URL(window.location.href);
      const searchParams = url.searchParams;

      console.log(searchParams.has('type'));
      console.log(searchParams.get('type'));
      if (searchParams.has('type') && searchParams.get('type') === 'order') {
        ssafyOrderPayment(searchParams.get('url'), inputNumber + num);
        return;
      }
      // 싸피페이 결제
      ssafyDepositPayment(
        depositPerMember * memberCount === 0
          ? 50000
          : depositPerMember * memberCount,
        inputNumber + num
      );
    }
  };

  const ssafyOrderPayment = async (url, password) => {
    const result = await payMenuBySsafyPay({
      reservationUrl: url,
      paymentMenuRequestDtos: payOrders.map((order) => {
        return {
          menuId: order.menuId,
          orderId: order.orderId,
          menuCount: order.count,
        };
      }),
      cardNo: selectedOrderCard.cardNo,
      cvc: selectedOrderCard.cvc,
      userKey: localStorage.getItem('userKey'),
      userPassword: password,
    });

    console.log(result);
    if (result.status === 200) {
      showAlert('결제 성공.');
    } else {
      showAlert('결제에 실패했습니다.');
    }

    navigate('/customer/order/' + url);
  };
  const ssafyDepositPayment = async (price, password) => {
    const result = await payDepositPaymentBySsafyPay({
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
      cardNo: selectedCard.cardNo,
      cvc: selectedCard.cvc,
      merchantId: 2022,
      userKey: localStorage.getItem('userKey'),
      userPassword: password,
    });
    console.log('결제 결과', result);
    if (result.status === 200) {
      console.log('결제 성공');
      navigate('/customer/reservation/success');
      setReservationUrl(
        process.env.REACT_APP_CLIENT_URL +
          '/customer/order/' +
          result.data.data.reservationInfo.reservationUrl
      );
      setIsAuthenticated(false);
    } else {
      showAlert(result.response.data.message);
    }
  };
  // 생체 인증 (지문 등) 확인 함수
  const handleCheckFingerprint = async () => {
    try {
      const assertion = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array([117, 61, 252, 231, 191, 241, 32, 4]), // 서버에서 생성한 고유한 값 (랜덤 값)
          rpId: window.location.hostname, // 현재 웹사이트 도메인 (RP ID)
          userVerification: 'required', // 생체 인증 강제 (지문 등)
          timeout: 60000, // 타임아웃 설정 (60초)
        },
      });

      console.log('Assertion Received:', assertion);

      // 인증 성공 처리
      setIsAuthenticated(true);
      navigate('/customer/reservation/deposit-payment');
    } catch (e) {
      showAlert('인증에 실패했습니다. 다시 시도해주세요.');
    }
  };
  return (
    <div>
      <BlackOutLayout />
      <PasswordInputContainer>
        <div></div>
        <PasswordTitle>{title}</PasswordTitle>
        <PasswordInputBox>{passwordCircle()}</PasswordInputBox>
        <PasswordKeypadWrapper>{randomPassword()}</PasswordKeypadWrapper>
      </PasswordInputContainer>
    </div>
  );
};

export default PasswordAuthPage;
