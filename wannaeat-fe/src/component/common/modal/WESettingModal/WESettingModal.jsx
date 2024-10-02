import useModalStore from '../../../../stores/common/useModalStore.js';
import { css } from '@emotion/react';
import Button from '../../button/WEButton/WEButton';
import { SettingModalContainer, ButtonWrapper } from './WESettingModal';
import {
  HrStyled,
  ModalTitleStyled,
  ModalContentWrapper,
} from '../../../../component/common/modal/WEModal.js';
import theme from '../../../../style/common/theme.js';

const WESettingModal = () => {
  const { title, children, handleButtonClick } = useModalStore();

  return (
    <SettingModalContainer>
      <ModalContentWrapper>
        <ModalTitleStyled fontSize={theme.fontSize.px13}>
          {title}
        </ModalTitleStyled>
        <HrStyled></HrStyled>
        <div>{children || <div>내용이 없습니다.</div>}</div>
      </ModalContentWrapper>
      <ButtonWrapper>
        <Button size="long" onClick={handleButtonClick}>
          확인
        </Button>
      </ButtonWrapper>
    </SettingModalContainer>
  );
};

export default WESettingModal;
