import { React } from 'react';
import styled from '@emotion/styled/macro';
import WEAlertModal from '../component/common/modal/WEAlertModal/WEAlertModal.jsx';
import WESheetModal from '../component/common/modal/WESheetModal/WESheetModal.jsx';
import useModalStore from '../stores/modal/useModalStore.js';
const TopPage = () => {

  const {open, setModalType, setAlertText, setCancelText, setConfirmText} = useModalStore();
  const TopPageContainer = styled.div`
  position: fixed;
  background-color: pink;
  @media (min-width: 480px) {
    width: 480px; /* 480px 이상일 경우 */
    justify-content: center;
    position: fixed;
    > * {
        width: 480px; /* 480px 이상일 경우 */
        justify-content: center;

    }
  }
  `;
  
  const handleAlertModalButtonClick = () => {
    setModalType('alert');
    setAlertText('정말로 취소하시겠습니까?');
    setCancelText('아뇨');
    setConfirmText('넹');
    open();
  }

  const handleSheetModalButtonClick = () => {
    setModalType('sheet');
    open();
  }

  return (
    <TopPageContainer>
      <div>
        <button onClick={handleAlertModalButtonClick}>alert 모달 띄우기</button>
        <button onClick={handleSheetModalButtonClick}>sheet 모달 띄우기</button>
      </div>
    </TopPageContainer>
  );
};

export default TopPage;
