import { useEffect } from 'react';
import {
  getSsafyPayAccount,
  createSsafyPayAccount,
} from 'api/common/ssafyPay/user.js';
import {
  createAccount,
  getMyAccountList,
} from 'api/common/ssafyPay/account.js';
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
import { getFcmToken } from '../../../firebase/firebaseCloudMessaging.js';
import { giveFcmToken } from '../../../api/common/login.js';
import useMyRestaurantStore from 'stores/manager/useMyRestaurantStore';

const LoginPage = () => {
  const navigate = useNavigate();
  const { getUserInfo, setEmail, setSocialType } = useCommonStore();
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
      const userInfo = await getUserInfo();
      if (userInfo === undefined) return;
      setUserInfo(userInfo.email, userInfo.socialType);
      if (userInfo.role === ROLE.GUEST) {
        navigate('/join');
      } else if (userInfo.role === ROLE.CUSTOMER) {
        const fcmToken = await getFcmToken();
        await giveFcmToken(fcmToken);

        // 손님의 userKey 조회
        const accountResult = await getSsafyPayAccount(userInfo.email);
        if (accountResult.status !== 201) {
          console.log('userKey 조회 실패해서 발급합니다.');
          await createSsafyPayAccount(userInfo.email);
        }

        // 손님의 deposit account 조회
        const depositAccountResult = await getMyAccountList();
        if (depositAccountResult.status !== 200) {
          console.log('user Deposit Account 조회 실패해서 발급합니다.');
          await createAccount();
        }
        navigate('/customer');
      } else {
        const fcmToken = await getFcmToken();
        await giveFcmToken(fcmToken);
        // 로컬 스토리지에 restaurantId 저장
        if (userInfo.restaurantId) {
          window.localStorage.setItem('restaurantId', userInfo.restaurantId);
        }
        navigate('/manager');
      }
    };

    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    // 로그인 된 상태라면
    if (searchParams.has('redirectedFromSocialLogin')) {
      // Access token 발급 후, role update
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
