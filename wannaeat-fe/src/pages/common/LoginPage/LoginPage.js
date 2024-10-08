import styled from '@emotion/styled/macro';
import theme from '../../../style/common/theme';

const LoginPageContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  width: 100%;
  height: 100%;
  background: ${theme.color.primary};
`;

const LoginPageLogo = styled.img`
  grid-row: 3;
  width: 14rem;
  margin: 0 auto;
`;

const LoginPageTitle = styled.p`
  grid-row: 4;
  font-size: 3.75rem;
  font-weight: 900;
  color: white;
  margin: 0 auto;
`;

const KakaoLoginButton = styled.button`
  grid-row: 6;
  border: none;
  background: none;
  color: black;
`;

const KakaoLoginButtonImg = styled.img`
  width: 18rem;
  @media (min-width: 480px) {
    width: 20rem;
  }
`;

const GoogleLoginButton = styled.button`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  margin: 0 auto;
  grid-row: 7;
  border: none;
  border-radius: 0.313rem;
  background: white;
  color: black;
  width: 18rem;
  height: 2.8rem;
  padding: 0 0.5rem;

  @media (min-width: 480px) {
    width: 20rem;
    height: 3rem;
  }
`;

const GoogleLoginButtonImg = styled.img`
  width: 1.5rem;

  @media (min-width: 480px) {
    width: 2rem;
  }
`;

const GoogleLoginTitle = styled.p`
  margin-left: 1rem;
  font-size: 0.9rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-style: normal;
  white-space: nowrap;
  @media (min-width: 480px) {
    font-size: 1rem;
  }
`;

export {
  LoginPageContainer,
  LoginPageLogo,
  LoginPageTitle,
  KakaoLoginButton,
  KakaoLoginButtonImg,
  GoogleLoginButton,
  GoogleLoginButtonImg,
  GoogleLoginTitle,
};
