import styled from '@emotion/styled';
import theme from '../../../style/common/theme';

const TabbarContainer = styled.div`
  display: flex;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10%;
  box-shadow: 1px 0px 4px 0px ${theme.color.disabled};
  -webkit-tap-highlight-color: transparent;
  background-color: ${theme.color.white};
  p {
    margin: 0;
  }

  @media (min-width: 480px) {
    width: 480px;
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
  width: 45%;
  height: 45%;
  padding-top: 3%;
  padding-bottom: 4%;
`;

const TabText = styled.p`
  color: ${({ activeId }) =>
    activeId ? theme.color.primary : theme.color.disabled};
  text-align: center;
  font-size: ${theme.fontSize.px10};
  font-weight: ${theme.fontWeight.bold};
  padding-bottom: 3%;
`;

export { TabbarContainer, TabWrapper, TabImg, TabText };
