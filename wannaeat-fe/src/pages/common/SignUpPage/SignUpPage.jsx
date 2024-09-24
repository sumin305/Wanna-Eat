import {
  SignUpPageContainer,
  SignUpPageHeader,
  UserModeTitle,
  UserModeWrapper,
} from './SignUpPage.js';
const SignUpPage = () => {
  return (
    <SignUpPageContainer>
      <SignUpPageHeader>추가 정보 입력</SignUpPageHeader>
      <UserModeWrapper>
        <UserModeTitle>사용자 모드</UserModeTitle>
      </UserModeWrapper>
    </SignUpPageContainer>
  );
};

export default SignUpPage;
