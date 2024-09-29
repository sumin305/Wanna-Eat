import { ssafyClient } from '../../../utils/http-client';
import moment from 'moment';

const currentDate = moment(new Date()).format('YYYYMMDD');
const currentTime = moment(new Date()).format('HHmmss');

const Header = (apiName, userKey = '') => {
  const randomTempSevenNumber = '000' + (Math.random(999999) + 1);
  const randomFourNumber = randomTempSevenNumber.slice(-6);
  const institutionTransactionUniqueNo =
    moment(new Date()).format('YYYYMMDDHHmmss') + randomFourNumber;
  return {
    apiName: apiName,
    transmissionDate: currentDate,
    transmissionTime: currentTime,
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
  withdrawalAccountNo = '3333-3333-3333-3333',
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
      withdrawalAccountNo: withdrawalAccountNo,
      withdrawalDate: withdrawalDate,
    })
    .then((result) => result)
    .catch((error) => error);
};
