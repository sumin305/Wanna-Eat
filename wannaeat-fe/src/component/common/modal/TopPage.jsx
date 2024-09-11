import { React, useState } from 'react';
import WEAlertModal from './WEAlertModal/WEAlertModal';
import WEBlackOutStyle from './WEBlackOutStyle';
import visibleStore from './visibleStore';

const TopPage = () => {
  const {isVisible, open, close}= visibleStore();

  return (
    <div>
      <div>
        <button onClick={open}>모달 띄우기</button>
      </div>
      <div>
        {isVisible && (
          <WEBlackOutStyle close={close}></WEBlackOutStyle>
        )}
        {isVisible && (
          <WEAlertModal
            alertText='삭제하시겠습니까?'
            cancelText='취소'
            confirmText='확인'
            open={open} close={close}
          ></WEAlertModal>
        )}
      </div>
    </div>
  );
};

export default TopPage;

