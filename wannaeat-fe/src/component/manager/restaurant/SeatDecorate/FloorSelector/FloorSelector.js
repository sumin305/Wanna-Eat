import styled from '@emotion/styled';
import theme from 'style/common/theme.js';

const FloorSelectorStyled = styled.div`
  display: flex;
  justify-content: center;
  margin-block: 0.5rem;
`;

const FloorSelectorButtonStyled = styled.button`
  margin: 0 10px;
  padding: 5px 10px;
  font-size: ${theme.fontSize.px10};
  font-weight: 500;
  background-color: ${({ isActive }) =>
    isActive ? theme.color.primary : 'white'};
  color: ${({ isActive }) => (isActive ? 'white' : 'black')};
  border: none;
  border-radius: 0.625rem;
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  &:active {
    background-color: ${(props) =>
      !props.disabled && (props.activeColor || '#FFAC76')};
    cursor: pointer;
    transform: scale(0.96);
  }

  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px13};
    padding: 10px 20px;
  }
`;

export { FloorSelectorStyled, FloorSelectorButtonStyled };
