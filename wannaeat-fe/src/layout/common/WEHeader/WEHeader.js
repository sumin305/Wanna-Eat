import styled from '@emotion/styled';
import theme from '../../../style/common/theme';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2.25rem;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
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
  width: 1rem;
  height: 1rem;
`;

export { HeaderContainer, HeaderWrapper, HeaderImg, HeaderTitle, IconImg };
