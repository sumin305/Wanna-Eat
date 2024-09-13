import styled from '@emotion/styled';
import theme from '../../../style/common/theme';

const TabbarContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3.125rem;
  box-shadow: 1px 0px 4px 0px ${theme.color.disabled};
  -webkit-tap-highlight-color: transparent;
  background-color: white;
  z-index: 800;
  p {
    margin: 0;
  }

  @media (min-width: 480px) {
    width: 480px; /* 480px 이상일 경우 */
    justify-content: center;
  }
`;

const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;
`;

const TabImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  padding-top: 0.3rem;
  padding-bottom: 0.073rem;
`;

const TabText = styled.p`
  color: ${({ activeId }) =>
    activeId ? theme.color.primary : theme.color.disabled};
  text-align: center;
  font-size: ${theme.fontSize.px10};
  font-weight: ${theme.fontWeight.bold};
  padding-bottom: 0.364rem;
`;

export { TabbarContainer, TabWrapper, TabImg, TabText };
