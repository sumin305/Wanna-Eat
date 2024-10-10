import styled from '@emotion/styled';
import theme from 'style/common/theme';

const PasswordInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: ${theme.zIndex.password + 1};
  align-items: center;
  width: 100vw;
  height: 90%;
  grid-template-columns: max-content;
  justify-content: space-between;
  align-items: center;
  justify-items: center;
  @media (min-width: 480px) {
    width: 480px;
  }
`;

export { PasswordInputContainer };
