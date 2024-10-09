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
  cursor: pointer;

  &:hover {
    transform: scale(1.05); /* 버튼 커지는 효과 */
    transition: transform 0.2s ease-in-out;
  }
`;

const KakaoLoginButtonImg = styled.img`
  width: 18rem;

  @media (min-width: 480px) {
    width: 20rem;
  }
`;

const GoogleLoginButton = styled.button`
  display: inline-grid; /* inline-grid로 변경 */
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: center; /* 가운데 정렬 */
  margin: 0 auto;
  grid-row: 7;
  border: none;
  border-radius: 0.313rem;
  background: white;
  color: black;
  width: 18rem;
  height: 2.8rem;
  padding: 0 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  /* CSS 우선순위 강화 */
  &:hover {
    background-color: #f5f5f5 !important; /* !important 사용하여 우선순위 증가 */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    transform: scale(1.05); /* 살짝 확대 효과 추가 */
  }

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
