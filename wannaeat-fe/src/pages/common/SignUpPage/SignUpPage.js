import styled from '@emotion/styled/macro';
import theme from '../../../style/common/theme';

const SignUpPageContainer = styled.div`
  margin: 1rem 0;
  display: grid;
`;
const SignUpPageHeader = styled.p`
  font-weight: bold;
  width: 88%;
  justify-self: center;
`;

const SignUpPageHeaderHr = styled.hr`
  border: 1px solid ${theme.color.disabled};
  background: ${theme.color.disabled};
  height: 0.5px;
  width: 88%;
  justify-self: center;
  margin: 5px 0;
`;
const UserModeWrapper = styled.div`
  margin: 1rem 0;
`;

const InputWrapper = styled.div`
  margin: 1rem 0;
`;
const InputTitle = styled.p`
  font-size: ${theme.fontSize.px13};
  width: 88%;
  margin: 0 auto;
`;

const TextfieldWrapper = styled.div``;
const UserModeToggle = styled.div``;
const VerificationNumberInputWrapper = styled.div`
  display: flex;
  width: 88%;
  justify-self: center;
  margin: 1rem 0 0.5rem 0;
`;
const VerificationTitle = styled.p`
  margin: 0 0.5rem;
  font-size: ${theme.fontSize.px13};
  align-self: center;
`;

export {
  SignUpPageContainer,
  SignUpPageHeader,
  SignUpPageHeaderHr,
  UserModeWrapper,
  InputWrapper,
  InputTitle,
  TextfieldWrapper,
  UserModeToggle,
  VerificationNumberInputWrapper,
  VerificationTitle,
};
