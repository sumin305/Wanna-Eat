import styled from '@emotion/styled';
import theme from '../../../style/common/theme';

const BlackOutLayoutStyled = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: ${theme.zIndex.blackLayout};
  background-color: rgba(0, 0, 0, 0.65);
  width: 100%;
  height: 100%;

  @media (min-width: 480px) {
    width: 480px;
    justify-content: center;
  }
`;

export default BlackOutLayoutStyled;
