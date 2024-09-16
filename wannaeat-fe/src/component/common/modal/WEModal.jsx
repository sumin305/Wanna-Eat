import useModalStore from '../../../stores/common/modal/useModalStore.js';
import WEAlertModal from './WEAlertModal/WEAlertModal.jsx';
import WESheetModal from './WESheetModal/WESheetModal.jsx';
import WESettingModal from './WESettingModal/WESettingModal.jsx';
import styled from '@emotion/styled/macro';
import theme from '../../../style/common/theme.js'
const WEModal = () => {
  const { modalType } = useModalStore()

  const ModalStyled = styled.div`
    position: relative;
    display: grid;
    z-index: ${theme.zIndex.modal};
  `;

  return (
    <ModalStyled>
      {modalType === 'alert' ? <WEAlertModal /> : <></>}
      {modalType === 'sheet' ? <WESheetModal /> : <></>}
      {modalType === 'setting' ? <WESettingModal/> : <></>}
    </ModalStyled>
  );
};

export default WEModal;
