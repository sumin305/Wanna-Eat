/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { theme } from '../../../../style/common/theme';
import {ModalStyled, TitleStyled, ButtonContainerStyled} from './WEAlertModal'

// 대리우스의 버튼 컴포넌트로 변경 예정
const Button = ({ text, onClick, textColor, backgroundColor}) => (
  <button css={buttonStyle(textColor, backgroundColor)}
  onClick={onClick}>
    {text}
  </button>
)
const WEAlertModal = ({ alertText, cancelText, confirmText, close }) => {
  return (
    <ModalStyled>
      <TitleStyled>{alertText}</TitleStyled>
      <ButtonContainerStyled>
        <Button text={cancelText} onClick={close} textColor={'black'} backgroundColor={'E6EAEE'}/>
        <Button text={confirmText} onClick={close} textColor={'white'} backgroundColor={theme.colors.primary}/>
      </ButtonContainerStyled>
    </ModalStyled>
  );
};

export default WEAlertModal;
