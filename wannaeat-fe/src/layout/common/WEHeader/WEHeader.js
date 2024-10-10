import styled from '@emotion/styled';
import theme from '../../../style/common/theme';
import { ROLE } from '../../../stores/common/useCommonStore';

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
  flex-direction: ${(props) => {
    return props.isShowLogo ? 'column' : 'row';
  }};
  justify-content: flex-start;
  align-items: center;
  width: ${(props) => {
    return props.isShowLogo ? '20%' : '10%';
  }};
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
  align-items: center;
  width: 10%;
`;

const HeaderImg = styled.img`
  width: 2rem;
  height: 1.5rem;
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
  width: 2.2rem;
  height: 2.2rem;
`;

const UnderLineStyled = styled.hr`
  border: 1px solid ${theme.color.primary};
  background: ${theme.color.primary};
  height: 0.2px;
  width: 88%;
  justify-self: center;
  margin: 5px 0;
  align-self: center;
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
  UnderLineStyled,
};
