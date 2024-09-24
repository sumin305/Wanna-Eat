import styled from '@emotion/styled';
import theme from '../../../style/common/theme';

const MapView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const FindRestaurantButton = styled.span`
  background-color: ${theme.color.white};
  color: ${theme.color.primary};
  font-size: ${theme.fontSize.px10};
  border: 1px solid ${theme.color.primary};
  border-radius: ${theme.borderRadius.default};
  padding: 0.5rem 1rem;
  position: absolute;
  top: 17%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;

export { MapView, FindRestaurantButton };
