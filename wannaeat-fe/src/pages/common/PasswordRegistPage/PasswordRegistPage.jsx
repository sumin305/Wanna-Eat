import { useEffect } from 'react';
import styled from '@emotion/styled/macro';
import theme from '../../../style/common/theme';
import { useState } from 'react';
import FingerPrint from 'assets/icons/common/fingerprint.svg';
import useCommonStore, { ROLE } from '../../../stores/common/useCommonStore';
const PasswordRegistPage = () => {
  const { setRole } = useCommonStore();
  const [title, setTitle] = useState('결제 비밀번호를 등록해주세요');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [number, setNumber] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [password, setPassword] = useState('');
  const [inputNumber, setInputNumber] = useState('');
  const randomPassword = () => {
    let newPassword = JSON.parse(JSON.stringify(number));
    newPassword.push('<');
    newPassword.splice(9, 0, '지문');
    let newJSXArr = newPassword.map((num) => (
      <PasswordKey key={num} onClick={() => handleNumberButtonClick(num)}>
        {num === '지문' ? <img src={FingerPrint}></img> : num}
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
  useEffect(() => {
    suffleNumber();
  }, [inputNumber]);

  const suffleNumber = () => {
    setNumber(number.sort(() => Math.random() - 0.5));
  };
  const handleNumberButtonClick = (num) => {
    if (num === '<') {
      setInputNumber('');
      return;
    }

    if (num === '지문') {
      // 지문 인식 페이지로 이동
      return;
    }
    setInputNumber(inputNumber + num);
    if (inputNumber.length === 5) {
      // 재입력 비밀번호면,
      if (isValidPassword) {
        if (inputNumber === password) {
          alert('결제 비밀번호 등록 성공');
          setRole(ROLE.CUSTOMER);
        } else {
          alert('비밀번호가 일치하지 않습니다.');
          setPassword('');
          setInputNumber('');
          setTitle('결제 비밀번호를 등록해주세요');
          setIsValidPassword(false);
        }
      }
      // 등록 비밀번호면,
      else {
        setPassword(inputNumber);
        setTitle('결제 비밀번호를 재입력해주세요');
        setInputNumber('');
        setIsValidPassword(true);
      }
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

export default PasswordRegistPage;
