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
