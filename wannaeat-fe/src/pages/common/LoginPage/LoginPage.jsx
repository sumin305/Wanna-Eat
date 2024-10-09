import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getSsafyPayAccount,
  createSsafyPayAccount,
} from 'api/common/ssafyPay/user.js';
import {
  createAccount,
  getMyAccountList,
} from 'api/common/ssafyPay/account.js';
import useCommonStore, { ROLE } from '../../../stores/common/useCommonStore';
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
import { getFcmToken } from '../../../firebase/firebaseCloudMessaging.js';
import { giveFcmToken } from '../../../api/common/login.js';
import Loading from '../../../component/common/loading/Loading.js';

const LoginPage = () => {
  const navigate = useNavigate();
  const { getUserInfo, setEmail, setSocialType } = useCommonStore();
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const kakaoLink = process.env.REACT_APP_KAKAO_LOGIN_URL;
  const googleLink = process.env.REACT_APP_GOOGLE_LOGIN_URL;

  const handleKakaoLoginButtonClick = () => {
    setIsLoading(true); // 로딩 시작
    window.location.replace(kakaoLink);
  };

  const handleGoogleLoginButtonClick = () => {
    setIsLoading(true); // 로딩 시작
    window.location.replace(googleLink);
  };

  const setUserInfo = (email, socialType) => {
    setEmail(email);
    setSocialType(socialType);
  };

  useEffect(() => {
    const getLoginStatus = async () => {
      setIsLoading(true); // 로그인 상태 로딩 시작
      const userInfo = await getUserInfo();
      if (userInfo === undefined) {
        setIsLoading(false); // 로그인 실패 시 로딩 종료
        return;
      }

      setUserInfo(userInfo.email, userInfo.socialType);
      const fcmToken = await getFcmToken();
      await giveFcmToken(fcmToken);

      if (userInfo.role === ROLE.GUEST) {
        navigate('/join');
      } else if (userInfo.role === ROLE.CUSTOMER) {
        const accountResult = await getSsafyPayAccount(userInfo.email);
        if (accountResult.status !== 201) {
          await createSsafyPayAccount(userInfo.email);
        }
        const depositAccountResult = await getMyAccountList();
        if (depositAccountResult.status !== 200) {
          await createAccount();
        }
        navigate('/customer');
      } else {
        if (userInfo.restaurantId) {
          window.localStorage.setItem('restaurantId', userInfo.restaurantId);
        }
        navigate('/manager');
      }
      setIsLoading(false); // 모든 로직 완료 후 로딩 종료
    };

    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    if (searchParams.has('redirectedFromSocialLogin')) {
      getLoginStatus();
    }
  }, [getUserInfo, navigate]);

  return isLoading ? (
    <Loading type="login" />
  ) : (
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
