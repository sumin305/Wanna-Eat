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
  padding: 1rem 0 0 0;
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
  width: 3.5rem;
  flex: 0 0 auto;
  margin: 0 0.625rem;
  font-size: ${theme.fontSize.px15};
  font-weight: ${(props) => (props.active ? 700 : 500)};
  border: none;
  background-color: transparent;
  color: ${(props) =>
    props.active ? theme.color.primary : theme.color.disabled};
  cursor: pointer;
  white-space: nowrap;
`;

const TabWrapper = styled.div`
  margin-right: 0 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TabHr = styled.hr`
  width: 3.8rem;
  height: 2.5px;
  border: none;
  background-color: ${(props) =>
    props.active ? theme.color.primary : theme.color.disabled};
  display: ${(props) => (props.active ? 'block' : 'none')};
  margin: 0.5rem 0.625rem;
  @media (min-width: 480px) {
    width: 3.8rem;
    height: 3px;
  }
`;
const TabUnderline = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 0.25rem;
  background-color: ${theme.color.primary};
  width: ${(props) => props.width}px;
  transform: translateX(${(props) => props.offset + window.innerWidth / 2}px);
`;

export { TabContainer, Tab, TabUnderline, TabHr, TabWrapper };
