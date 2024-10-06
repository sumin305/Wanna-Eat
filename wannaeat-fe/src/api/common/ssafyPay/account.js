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

// 계좌 리스트 조회
export const getAccountList = async () => {
  return await ssafyClient
    .post('/api/v1/edu/demandDeposit/inquireDemandDepositList', {
      Header: Header('inquireDemandDepositList'),
    })
    .then((result) => result)
    .catch((error) => error);
};

// 계좌 생성
export const createAccount = async () => {
  if (!localStorage.getItem('userKey')) {
    alert('유저 키가 없습니다.');
    return;
  }

  return await ssafyClient
    .post('/api/v1/edu/demandDeposit/createDemandDepositAccount', {
      Header: Header(
        'createDemandDepositAccount',
        localStorage.getItem('userKey')
      ),
      accountTypeUniqueNo: '001-1-83d07e35606342',
    })
    .then((result) => {
      localStorage.setItem('accountNo', result.data.REC.accountNo);
      return result;
    })
    .catch((error) => error);
};

// 내 계좌 목록 조회
export const getMyAccountList = async () => {
  if (!localStorage.getItem('userKey')) {
    alert('유저 키가 없습니다.');
    return;
  }

  return await ssafyClient
    .post('/api/v1/edu/deposit/inquireDepositInfoList', {
      Header: Header('inquireDepositInfoList', localStorage.getItem('userKey')),
    })
    .then((result) => result)
    .catch((error) => error);
};
