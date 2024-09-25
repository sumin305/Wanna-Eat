import styled from '@emotion/styled';
import theme from '../../../style/common/theme';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10vh;
  padding: 0.1rem 0;

  background-color: ${(props) =>
    props.isCarrot ? theme.color.primary : theme.color.white};

  @media (min-width: 480px) {
    width: 480px;
    align-items: center;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 100%;
  position: relative;
`;

const HeaderLeft = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: flex-start;
  align-items: center;
  /* left: 0; */
  width: 10%;
  /* padding-left: 10px; */
`;

const LogoTitle = styled.h1`
  text-align: center;
  color: ${(props) =>
    props.isCarrot ? theme.color.white : theme.color.primary};
  font-size: ${theme.fontSize.px11};
  font-weight: ${theme.fontWeight.bold};
  letter-spacing: 0px;

  @media (min-width: 480px) {
    font-size: ${theme.fontSize.px13};
  }
`;

const HeaderCenter = styled.div`
  display: flex;
  justify-content: ${(props) => {
    return props.children.props.isShowBackIcon ||
      props.children.props.isShowLogo
      ? 'center'
      : 'flex-start';
  }};
  align-items: center;
  width: ${(props) => {
    return props.children.props.isShowBackIcon ||
      props.children.props.isShowLogo
      ? '80%'
      : '90%';
  }};
`;

const HeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;
  /* position: absolute; */
  align-items: center;
  /* right: 0; */
  width: 10%;
  /* padding-right: 10px; */
`;

const HeaderImg = styled.img`
  width: 2rem;
  height: 1.5rem;
  margin-top: 0.5rem;
  @media (min-width: 480px) {
    width: 3rem;
    height: 2rem;
  }
`;

const HeaderTitle = styled.h1`
  text-align: center;
  color: ${(props) =>
    props.isCarrot ? theme.color.white : theme.color.primary};
  font-size: ${theme.fontSize.px17};
  font-weight: ${theme.fontWeight.bold};
`;

const IconImg = styled.img`
  width: 1.3rem;
  height: 1.3rem;
`;

export {
  HeaderContainer,
  HeaderWrapper,
  HeaderLeft,
  LogoTitle,
  HeaderCenter,
  HeaderRight,
  HeaderImg,
  HeaderTitle,
  IconImg,
};
