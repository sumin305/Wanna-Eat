import React from 'react';
import styled from '@emotion/styled'; // styled-components 대신 @emotion/styled 사용

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;  /* 알림 창보다 낮은 값으로 유지 */
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 80%;  
  max-width: 500px;  /* 최대 너비 500px 설정 */
  max-height: 90vh;
  overflow-y: auto;
`;

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalBackground>
  );
};

export default Modal;
