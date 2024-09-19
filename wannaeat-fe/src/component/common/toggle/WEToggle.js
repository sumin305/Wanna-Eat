import styled from '@emotion/styled';
import theme from '../../../style/common/theme';

export const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

export const ToggleBackground = styled.div`
  width: 2.125rem;
  height: 1.063rem;
  border-radius: 0.438rem;
  background-color: ${({ isOn }) =>
    isOn ? theme.color.primary : theme.color.disabled};
  transition: background-color 0.5s ease;
`;

export const ToggleCircle = styled.div`
  position: absolute;
  top: 0.063rem;
  left: ${({ isOn }) => (isOn ? '1.125rem' : '0.063rem')};
  width: 0.938rem;
  height: 0.938rem;
  border-radius: 50%;
  background-color: ${theme.color.white};
  transition: left 0.5s ease;
`;
