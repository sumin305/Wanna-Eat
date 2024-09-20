import styled from '@emotion/styled';
import theme from '../../../../style/common/theme.js';

const TabContainer = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 0.625rem 0;
  max-width: 100vw;
  box-sizing: border-box;
  position: relative;

  @media (min-width: 480px) {
    max-width: 480px;
    justify-self: center;
    box-sizing: border-box;
  }
`;

const Tab = styled.button`
  flex: 0 0 auto;
  padding: 0.625rem 1.25rem;
  margin: 0 0.625rem;
  font-size: 1rem;
  font-weight: ${(props) => (props.active ? 700 : 500)};
  border: none;
  background-color: transparent;
  color: ${(props) =>
    props.active ? theme.color.primary : theme.color.disabled};
  cursor: pointer;
  white-space: nowrap;
`;

const TabUnderline = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 0.25rem;
  background-color: ${theme.color.primary};
  width: ${(props) => props.width}px;
  transform: translateX(${(props) => props.offset}px);
`;

export { TabContainer, Tab, TabUnderline };
