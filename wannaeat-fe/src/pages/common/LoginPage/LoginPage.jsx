import { useEffect } from 'react';
import { getToken } from '../../../api/common/login.js';
import useCommonStore, { ROLE } from '../../../stores/common/useCommonStore';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/icons/header/logo-picture.svg';
import kakaoLoginButton from '../../../assets/common/kakao_login_large_wide.png';
import googleLoginLogo from '../../../assets/common/googleLoginLogo.svg';
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

const LoginPage = () => {
  const navigate = useNavigate();
  const { getUserRole, setEmail, setSocialType } = useCommonStore();
  const kakaoLink = process.env.REACT_APP_KAKAO_LOGIN_URL;
  const googleLink = process.env.REACT_APP_GOOGLE_LOGIN_URL;

  const handleKakaoLoginButtonClick = () => {
    window.location.replace(kakaoLink);
  };

  const handleGoogleLoginButtonClick = () => {
    window.location.replace(googleLink);
  };

  // oauth에서 받아온 회원정보 업데이트
  const setUserInfo = (email, socialType) => {
    setEmail(email);
    setSocialType(socialType);
  };

  useEffect(() => {
    const getLoginStatus = async () => {
      const userInfo = await getUserRole();

      if (userInfo === undefined) return;

      setUserInfo(userInfo.email, userInfo.socialType);
      if (userInfo.role === ROLE.GUEST) {
        navigate('/join');
      } else if (userInfo.role === ROLE.CUSTOMER) {
        navigate('/customer');
      } else {
        navigate('/manager');
      }
    };

    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    // const parseUrl = url.replace(`${process.env.REACT_APP_CLIENT_URL}`, '');

    // 로그인 된 상태라면
    if (searchParams.has('redirectedFromSocialLogin')) {
      // Access token 발급 후, role update
      console.log('role update');
      getLoginStatus();
    }
  }, []);

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
