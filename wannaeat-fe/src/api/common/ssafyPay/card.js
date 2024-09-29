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
