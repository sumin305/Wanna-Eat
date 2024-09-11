import {ModalStyled, TitleStyled, ButtonContainerStyled} from './WEAlertModal'
import WEButton from '../../button/WEButton/WEButton'

const WEAlertModal = ({ alertText, cancelText, confirmText, close }) => {
  return (
    <ModalStyled>
      <TitleStyled>{alertText}</TitleStyled>
      <ButtonContainerStyled>
        <WEButton size="short" onClick={close} backgroundColor={'E6EAEE'} color={'black'}>{cancelText}</WEButton>
        <WEButton size="short" onClick={close}>{confirmText}</WEButton>
      </ButtonContainerStyled>
    </ModalStyled>
  );
};

export default WEAlertModal;
