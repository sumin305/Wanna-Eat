import {
  ModalStyled,
  TitleStyled,
  ButtonContainerStyled,
} from './WEAlertModal';
import WEButton from '../../button/WEButton/WEButton';
import theme from '../../../../style/common/theme';
import useModalStore from '../../../../stores/modal/useModalStore';
const WEAlertModal = () => {
  const { alertText, cancelText, confirmText, close } = useModalStore();
  return (
    <ModalStyled>
      <TitleStyled>{alertText}</TitleStyled>
      <ButtonContainerStyled>
        <WEButton
          size="modal"
          onClick={close}
          backgroundColor={theme.color.gray}
          color={'black'}
        >
          {cancelText}
        </WEButton>
        <WEButton size="modal" onClick={close}>
          {confirmText}
        </WEButton>
      </ButtonContainerStyled>
    </ModalStyled>
  );
};

export default WEAlertModal;
