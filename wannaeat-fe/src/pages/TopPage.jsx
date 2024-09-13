import { React } from 'react';
import styled from '@emotion/styled/macro';
import WEAlertModal from '../component/common/modal/WEAlertModal/WEAlertModal.jsx';
import WESheetModal from '../component/common/modal/WESheetModal/WESheetModal.jsx';
const TopPage = ({isModalVisible, open}) => {

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
  
  return (
    <TopPageContainer>
      <div>
        <button onClick={open}>모달 띄우기</button>
      </div>
      <div>

        {/* WEAlertModal 테스트 */}
        {/* {isVisible && (
          <WEAlertModal
            alertText="삭제하시겠습니까?"
            cancelText="취소"
            confirmText="확인"
            close={close}
          ></WEAlertModal>
        )} */}

        {/* WESheetModal 테스트 */}
        {
          isModalVisible && (
            <WESheetModal title='식당 필터링'></WESheetModal>
          )
        }
      </div>
    </TopPageContainer>
  );
};

export default TopPage;
