import useModalStore from '../../../stores/common/modal/useModalStore.js';
import WEAlertModal from './WEAlertModal/WEAlertModal.jsx';
import WESheetModal from './WESheetModal/WESheetModal.jsx';
import WESettingModal from './WESettingModal/WESettingModal.jsx';
import styled from '@emotion/styled/macro';
import theme from '../../../style/common/theme.js';
const WEModal = () => {
  const { modalType, isModalVisible } = useModalStore();

  const ModalStyled = styled.div`
    position: relative;
    z-index: ${theme.zIndex.modal};
    display: ${({ isModalVisible }) => {
      if (!isModalVisible) return 'none';
      else return 'grid';
    }};
  `;

  return (
    <ModalStyled isModalVisible={isModalVisible}>
      {modalType === 'alert' ? <WEAlertModal isOneButton={false} /> : <></>}
      {modalType === 'sheet' ? <WESheetModal /> : <></>}
      {modalType === 'setting' ? <WESettingModal /> : <></>}
    </ModalStyled>
  );
};

export default WEModal;
