import styled from '@emotion/styled';
import theme from '../../../style/common/theme';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 7%;
  background-color: ${theme.color.white};
  top: 0;
  left: 0;
  z-index: 1000;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 100%;
`;

const HeaderImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const HeaderTitle = styled.h1`
  color: ${theme.color.primary};
  font-size: ${theme.fontSize.px17};
  font-weight: ${theme.fontWeight.bold};
  text-align: center;
`;

const IconImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

export { HeaderContainer, HeaderWrapper, HeaderImg, HeaderTitle, IconImg };
