import styled from '@emotion/styled';
import theme from '../../../style/common/theme';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  background-color: ${(props) =>
    props.isCarrot ? theme.color.primary : theme.color.white};

  @media (min-width: 480px) {
    width: 480px;
    align-items: center;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 100%;
  position: relative;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  left: 0;
  width: 20%;
`;

const LogoTitle = styled.h1`
  color: ${(props) =>
    props.isCarrot ? theme.color.white : theme.color.primary};
  font-size: ${theme.fontSize.px9};
  font-weight: ${theme.fontWeight.bold};
  text-align: center;
`;

const HeaderCenter = styled.div`
  display: flex;
  justify-content: ${(props) => {
    return props.children.props.isShowBackIcon ||
      props.children.props.isShowLogo
      ? 'center'
      : 'flex-start';
  }};
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
  position: absolute;
  right: 0;
  width: 10%;
`;

const HeaderImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const HeaderTitle = styled.h1`
  color: ${(props) =>
    props.isCarrot ? theme.color.white : theme.color.primary};
  font-size: ${theme.fontSize.px17};
  font-weight: ${theme.fontWeight.bold};
  text-align: center;
`;

const IconImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
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
