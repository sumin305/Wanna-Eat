import { React } from 'react';
import TopPageStyled from './TopPage.js';
import useModalStore from '../../stores/modal/useModalStore.js';

const TopPage = () => {
  const {
    open,
    setModalType,
    setTitle,
    setAlertText,
    setCancelText,
    setConfirmText,
  } = useModalStore();

  const handleAlertModalButtonClick = () => {
    setModalType('alert');
    setAlertText('삭제하시겠습니까?');
    setCancelText('취소');
    setConfirmText('확인');
    open();
  };

  const handleSheetModalButtonClick = () => {
    setModalType('sheet');
    setTitle('식당 필터링');
    open();
  };

  const handleSettingModalButtonClick = () => {
    setModalType('setting');
    setTitle('매장 크기와 층 수를 선택해 주세요');
    open();
  };

  return (
    <TopPageStyled>
      <div>
        <button onClick={handleAlertModalButtonClick}>alert 모달 띄우기</button>
        <button onClick={handleSheetModalButtonClick}>sheet 모달 띄우기</button>
        <button onClick={handleSettingModalButtonClick}>
          setting 모달 띄우기
        </button>
      </div>
    </TopPageStyled>
  );
};

export default TopPage;
