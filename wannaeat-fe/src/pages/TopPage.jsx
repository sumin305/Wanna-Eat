import { React } from 'react';
import WEAlertModal from '../component/common/modal/WEAlertModal/WEAlertModal.jsx';
import WEBlackOutLayout from '../layout/common/WEBlackOutLayout/WEBlackOutLayout.jsx';
import visibleStore from '../stores/modal/visibleStore.js';

const TopPage = () => {
  const { isVisible, open, close } = visibleStore();

  return (
    <div>
      <div>
        <button onClick={open}>모달 띄우기</button>
      </div>
      <div>
        {isVisible && <WEBlackOutLayout close={close}></WEBlackOutLayout>}
        {isVisible && (
          <WEAlertModal
            alertText="삭제하시겠습니까?"
            cancelText="취소"
            confirmText="확인"
            close={close}
          ></WEAlertModal>
        )}
      </div>
    </div>
  );
};

export default TopPage;
