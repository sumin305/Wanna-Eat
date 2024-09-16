import {
  ModalStyled,
  TitleStyled,
  ButtonContainerStyled,
  OneButtonContainerStyled
} from './WEAlertModal';
import WEButton from '../../button/WEButton/WEButton';
import theme from '../../../../style/common/theme';
import useModalStore from '../../../../stores/common/modal/useModalStore';
const WEAlertModal = () => {
  const { alertText, cancelText, confirmText, close, isOneButton } = useModalStore();
  return (
    <ModalStyled>
      <TitleStyled>{alertText}</TitleStyled>
        {
          isOneButton ? 
          (<OneButtonContainerStyled>
         <WEButton size="long" onClick={close}>
              {confirmText}
          </WEButton>
          </OneButtonContainerStyled>) 
          :
          (
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
          )
        }
    </ModalStyled>
  );
};

export default WEAlertModal;
