import { useEffect } from 'react';
import { getToken } from '../../../api/common/login.js';
import useCommonStore, { ROLE } from '../../../stores/common/useCommonStore';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const { setRole } = useCommonStore();
  const kakaoLink = process.env.REACT_APP_LOCAL_KAKAO_LOGIN_URL;
  const googleLink = `https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=${process.env.REACT_APP_GOOGLE_LOGIN_URL}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;
  const handleKakaoLoginButtonClick = () => {
    console.log(kakaoLink);
    window.location.href = kakaoLink;
  };

  const handleGoogleLoginButtonClick = () => {
    console.log(googleLink);
    window.location.href = googleLink;
  };

  useEffect(() => {
    console.log(window.location);
    console.log(window.location.href);
    let url = window.location.href;
    let parseUrl = url.replace(`${process.env.REACT_APP_CLIENT_URL}`, '');
    console.log(parseUrl);
    // 로그인 된 상태라면
    if (parseUrl === '?redirectedFromSocialLogin=true') {
      // 회원가입 여부 판단
      getReissue();
      console.log('OAuth 로그인 되었음.');

      // navigate('/join');
    }
  }, []);

  const getReissue = async () => {
    const response = await getToken();
    console.log(response);
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
