import styled from '@emotion/styled';
import theme from '../../../style/common/theme';

export const ToggleContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

export const ToggleText = styled.p`
  font-size: ${theme.fontSize.px9};
  color: white;
  padding: 0 0.8rem;
  position: absolute;
  right: ${({ isOn }) => (isOn ? '2.9rem' : '0.3rem')};
`;

export const ToggleBackground = styled.div`
  display: flex;
  align-items: center;
  width: 6rem;
  height: 1.5rem;
  border-radius: 0.438rem;
  background-color: ${theme.color.disabled};
  transition: background-color 0.5s ease;
`;

export const ToggleCircleText = styled.p`
  color: white;
  font-size: ${theme.fontSize.px9};
`;
export const ToggleCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  left: ${({ isOn }) => (isOn ? '3rem' : '0.04rem')};
  width: 3rem;
  height: 1.5rem;
  border-radius: 0.438rem;
  background-color: ${theme.color.primary};
  transition: left 0.5s ease;
`;
