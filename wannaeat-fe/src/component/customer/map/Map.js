import styled from '@emotion/styled';

const MapView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const FindRestaurantButton = styled.button`
  background-color: #007bff; /* 원하는 색상으로 변경 */
  color: #ffffff; /* 텍스트 색상을 흰색으로 */
  font-size: 14px;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  position: absolute;
  top: 18%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  cursor: pointer;

  &:hover {
    background-color: #0056b3; /* 호버 시 색상 변경 */
  }
`;

export { MapView, FindRestaurantButton };
