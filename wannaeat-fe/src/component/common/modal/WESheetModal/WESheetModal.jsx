/** @jsxImportSource @emotion/react */
import Button from '../../button/WEButton/WEButton';
import SheetModalContainer from './WESheetModal.js';
import {
  HrStyled,
  ModalTitleStyled,
  ModalContentWrapper,
} from '../../../../component/common/modal/WEModal.js';
import useModalStore from '../../../../stores/common/useModalStore.js';
import theme from '../../../../style/common/theme.js';

const WESheetModal = () => {
  const { close, title, confirmText, children, handleButtonClick } =
    useModalStore();
  return (
    <SheetModalContainer>
      <ModalContentWrapper>
        <ModalTitleStyled fontSize={theme.fontSize.px15}>
          {title}
        </ModalTitleStyled>
        <HrStyled></HrStyled>
        <div>{children || <div>내용이 없습니다.</div>}</div>
      </ModalContentWrapper>
      <Button
        size="long"
        onClick={handleButtonClick ? handleButtonClick : close}
      >
        {confirmText}
      </Button>
    </SheetModalContainer>
  );
};

export default WESheetModal;
