import { React } from 'react';
import TopPageStyled from './TopPage.js';
import useModalStore from '../../stores/modal/useModalStore.js';
const TopPage = () => {
  const { open, setModalType, setAlertText, setCancelText, setConfirmText } =
    useModalStore();

  const handleAlertModalButtonClick = () => {
    setModalType('alert');
    setAlertText('삭제하시겠습니까?');
    setCancelText('취소');
    setConfirmText('확인');
    open();
  };

  const handleSheetModalButtonClick = () => {
    setModalType('sheet');
    open();
  };

  return (
    <TopPageStyled>
      <div>
        <button onClick={handleAlertModalButtonClick}>alert 모달 띄우기</button>
        <button onClick={handleSheetModalButtonClick}>sheet 모달 띄우기</button>
      </div>
    </TopPageStyled>
  );
};

export default TopPage;
