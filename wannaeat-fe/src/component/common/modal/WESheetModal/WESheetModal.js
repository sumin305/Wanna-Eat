import styled from '@emotion/styled';
import theme from '../../../../style/common/theme';

const SheetModalContainer = styled.div`
  background-color: ${theme.color.white};
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0.5rem 0;
  border-top-left-radius: ${theme.borderRadius.default};
  border-top-right-radius: ${theme.borderRadius.default};

  // 모달의 내용이 많을 경우 스크롤 추가
  max-height: 80%; // 최대 높이를 80%로 제한
  overflow-y: auto; // 내용이 많으면 스크롤 생성

  @media (min-width: 480px) {
    width: 480px;
    justify-self: center;
  }
`;

export default SheetModalContainer;
