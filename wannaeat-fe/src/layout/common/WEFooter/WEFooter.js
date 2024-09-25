import styled from '@emotion/styled';
import theme from '../../../style/common/theme';
import { ROLE } from '../../../stores/common/useCommonStore';

const FooterContainer = styled.div`
  display: ${({ role }) => {
    if (role === ROLE.GUEST) return 'none';
    else return 'flex';
  }};

  background-color: ${theme.color.white};
  width: 100%;
  height: 10%;
  position: fixed;
  bottom: 0;
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

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 100%;
`;

const FooterImg = styled.img`
  width: 45%;
  height: 45%;
  padding-top: 3%;
  padding-bottom: 4%;
`;

const FooterText = styled.p`
  padding-bottom: 3%;
  text-align: center;
  color: ${({ activeId }) =>
    activeId ? theme.color.primary : theme.color.disabled};
  font-size: ${theme.fontSize.px10};
  font-weight: ${theme.fontWeight.bold};
  padding-bottom: 3%;
`;

export { FooterContainer, FooterWrapper, FooterImg, FooterText };
