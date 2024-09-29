import { ssafyClient } from '../../../utils/http-client';
import moment from 'moment';

const Header = (apiName, userKey = '') => {
  const randomTempSevenNumber = '000' + (Math.random(999999) + 1);
  const randomFourNumber = randomTempSevenNumber.slice(-6);
  const institutionTransactionUniqueNo =
    moment(new Date()).format('YYYYMMDDHHMMSS') + randomFourNumber;
  return {
    apiName: apiName,
    transmissionDate: moment().format('YYYYMMDD'), // 현재 날짜를 'YYYYMMDD' 형식으로 변환
    transmissionTime: moment().format('HHmmss'), // 현재 시간을 'HHmmss' 형식으로 변환 (24시간 형식)
    institutionCode: '00100',
    fintechAppNo: '001',
    apiServiceCode: apiName,
    institutionTransactionUniqueNo: institutionTransactionUniqueNo,
    apiKey: process.env.REACT_APP_SSAFY_PAY_API_KEY,
    ...(userKey !== '' && { userKey: userKey }),
  };
};

// 가맹점 등록 위한 카테고리 조회
export const getMerchantCategories = async () => {
  return await ssafyClient
    .post('/api/v1/edu/creditCard/inquireCategoryList', {
      Header: Header('inquireCategoryList'),
    })
    .then((result) => {
      const categoryId = result.data['REC'].filter(
        (category) => category.categoryName === '생활'
      )[0].categoryId;
      localStorage.setItem('restaurantMerchantCategoryId', categoryId);
    })
    .catch((error) => error);
};

// 가맹점 등록
export const registerMerchant = async (merchantName) => {
  return await ssafyClient.post('/api/v1/edu/creditCard/createMerchant', {
    Header: Header('createMerchant'),
    categoryId: localStorage.getItem('restaurantMerchantCategoryId'),
    merchantName: merchantName,
  });
};

// 카드 상품 조회
export const getCreditCardList = async () => {
  return await ssafyClient
    .post('/api/v1/edu/creditCard/inquireCreditCardList', {
      Header: Header('inquireCreditCardList'),
    })
    .then((result) => result)
    .catch((error) => error);
};

// 카드 생성
export const createCreditCard = async (
  cardUniqueNo = '1001-fc77272400f44a6',
  withdrawalDate = 1
) => {
  if (!localStorage.getItem('userKey')) {
    alert('유저 키가 없습니다.');
    return;
  }

  return await ssafyClient
    .post('/api/v1/edu/creditCard/createCreditCard', {
      Header: Header('createCreditCard', localStorage.getItem('userKey')),
      cardUniqueNo: cardUniqueNo,
      withdrawalAccountNo: localStorage.getItem('accountNo'),
      withdrawalDate: withdrawalDate,
    })
    .then((result) => result)
    .catch((error) => error);
};

// 내 카드 목록 조회
export const getMyCreditCardList = async () => {
  if (!localStorage.getItem('userKey')) {
    alert('유저 키가 없습니다.');
    return;
  }

  return await ssafyClient
    .post('/api/v1/edu/creditCard/inquireSignUpCreditCardList', {
      Header: Header(
        'inquireSignUpCreditCardList',
        localStorage.getItem('userKey')
      ),
    })
    .then((result) => result)
    .catch((error) => error);
};

// 카드 결제
export const payByCreditCard = async (
  cardNo,
  cvc,
  merchantId,
  paymentBalance
) => {
  if (!localStorage.getItem('userKey')) {
    alert('유저 키가 없습니다.');
    return;
  }

  return await ssafyClient
    .post('/api/v1/edu/creditCard/createCreditCardTransaction', {
      Header: Header(
        'createCreditCardTransaction',
        localStorage.getItem('userKey')
      ),
      cardNo: cardNo,
      cvc: cvc,
      merchantId: merchantId,
      paymentBalance: paymentBalance,
    })
    .then((result) => result)
    .catch((error) => error);
};
