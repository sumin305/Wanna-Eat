import React, { useState, useEffect } from 'react';
import MenagerMap from './ManagerMap.jsx'; // 카카오 맵을 그려주는 컴포넌트
import {
  MapModalContainer,
  ModalOverlay,
  ButtonWrapper,
  NoticeText,
} from './MapModal.js';
import WEButton from 'component/common/button/WEButton/WEButton.jsx';

const MapModal = ({ isOpen, onClose, onConfirm }) => {
  const [centerLat, setCenterLat] = useState(37.5665);
  const [centerLng, setCenterLng] = useState(126.978);

  const handleConfirm = () => {
    console.log(centerLat, centerLng);
    onConfirm(centerLat, centerLng); // 확인 버튼을 누르면 위도와 경도를 부모 컴포넌트로 전달
    onClose();
  };

  return (
    isOpen && (
      <ModalOverlay>
        <MapModalContainer className="modal">
          <NoticeText>가게를 아래 마커로 위치해주세요</NoticeText>
          <MenagerMap setCenterLat={setCenterLat} setCenterLng={setCenterLng} />
          <ButtonWrapper>
            <WEButton width="45%" onClick={onClose}>
              취소
            </WEButton>
            <WEButton width="45%" onClick={handleConfirm}>
              확인
            </WEButton>
          </ButtonWrapper>
        </MapModalContainer>
      </ModalOverlay>
    )
  );
};

export default MapModal;
