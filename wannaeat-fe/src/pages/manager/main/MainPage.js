import styled from '@emotion/styled';
import theme from 'style/common/theme.js';

const MainPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 80vh;
  flex-shrink: 0;

  @media (min-width: 480px) {
    height: 80vh;
  }
`;

const GoToSeatDecorateStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  background-color: ${theme.color.primary};
  border-radius: 0 0 0.4375rem 0.4375rem;
`;

const GoToSeatDecorateButtonStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 70%;
  background-color: white;
  border-radius: 11px;
  font-size: ${theme.fontSize.px25};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.color.primary};
  cursor: pointer;
  user-select: none;

  &:active {
    cursor: pointer;
    transform: scale(0.98);
  }
`;

export { MainPageStyled, GoToSeatDecorateStyled, GoToSeatDecorateButtonStyled };
