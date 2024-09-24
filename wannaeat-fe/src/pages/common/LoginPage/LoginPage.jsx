import { useEffect } from 'react';
import useCommonStore, { ROLE } from '../../../stores/common/useCommonStore';
import {
  LoginPageContainer,
  LoginPageLogo,
  LoginPageTitle,
  KakaoLoginButton,
  KakaoLoginButtonImg,
  GoogleLoginButton,
  GoogleLoginButtonImg,
  GoogleLoginTitle,
} from './LoginPage';
import Logo from '../../../assets/icons/header/logo-picture.svg';
import kakaoLoginButton from '../../../assets/common/kakao_login_large_wide.png';
import googleLoginLogo from '../../../assets/common/googleLoginLogo.svg';
const LoginPage = () => {
  const { setRole } = useCommonStore();
  const kakaoLink = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_LOGIN_URL}&response_type=code`;
  const googleLink = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=${process.env.REACT_APP_GOOGLE_LOGIN_URL}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;
  const handleKakaoLoginButtonClick = () => {
    console.log(kakaoLink);
    window.location.href = kakaoLink;
  };

  const handleGoogleLoginButtonClick = () => {
    console.log(googleLink);
    window.location.href = googleLink;
  };
  return (
    <LoginPageContainer>
      <LoginPageLogo src={Logo} />
      <LoginPageTitle>머 물래?</LoginPageTitle>
      <KakaoLoginButton onClick={handleKakaoLoginButtonClick}>
        <KakaoLoginButtonImg src={kakaoLoginButton} />
      </KakaoLoginButton>
      <GoogleLoginButton onClick={handleGoogleLoginButtonClick}>
        <GoogleLoginButtonImg src={googleLoginLogo} />
        <GoogleLoginTitle>구글 로그인</GoogleLoginTitle>
      </GoogleLoginButton>
    </LoginPageContainer>
  );
};

export default LoginPage;
