import styled from '@emotion/styled';
import theme from 'style/common/theme';

// 모달 컨테이너
export const MapModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  max-width: 360px; // 크기를 조정하세요
  width: 80%; // 반응형을 위해 가로 폭은 80%
  height: 80%; // 높이도 80%로 설정하여 충분한 공간 확보
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000; // 다른 요소 위에 표시되도록 z-index 설정
  @media (min-width: 480px) {
    > * {
      justify-content: center;
      max-width: 360px;
    }
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 배경
  z-index: 999; // 모달 뒤에 표시되도록 z-index 설정
`;

export const NoticeText = styled.p`
  font-size: ${theme.fontSize.px16};
  text-align: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
