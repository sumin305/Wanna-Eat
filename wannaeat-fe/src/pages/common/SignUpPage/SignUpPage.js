import styled from '@emotion/styled/macro';
import theme from '../../../style/common/theme';

const SignUpPageContainer = styled.div`
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
`;
const SignUpPageHeader = styled.p`
  margin-top: 1rem;
  font-weight: bold;
  width: 88%;
  align-self: center;
  @media (min-width: 480px) {
    margin-top: 2rem;
  }
`;

const SignUpPageHeaderHr = styled.hr`
  border: 1px solid ${theme.color.primary};
  background: ${theme.color.primary};
  height: 0.2px;
  width: 88%;
  justify-self: center;
  margin: 5px 0;
  align-self: center;
`;
const UserModeWrapper = styled.div`
  width: 88%;
  align-self: center;
  margin: 1rem 0;
  display: flex;
`;

const InputContainer = styled.div`
  height: 60vh;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
`;
const InputWrapper = styled.div``;
const InputTitle = styled.p`
  font-size: ${theme.fontSize.px13};
  width: 88%;
  margin: 4px auto;
`;

const TextfieldWrapperWithButton = styled.div`
  display: flex;
  margin: 0 auto;
  width: 90%;
`;

const TextFieldWrapperButton = styled.button`
  background: white;
  border: 1px solid ${theme.color.primary};
  border-radius: 5px;
  width: 3rem;

  &: hover {
    background: ${theme.color.primary};
    color: white;
  }
`;
const TextfieldWrapper = styled.div`
  display: flex;
`;
const UserModeToggle = styled.div``;
const VerificationNumberInputWrapper = styled.div`
  display: flex;
  width: 88%;
  justify-self: center;
  align-self: center;
  margin: 1rem 0;
`;
const VerificationTitle = styled.p`
  margin: 0 0.5rem;
  font-size: ${theme.fontSize.px13};
  align-self: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export {
  SignUpPageContainer,
  SignUpPageHeader,
  SignUpPageHeaderHr,
  UserModeWrapper,
  InputContainer,
  InputWrapper,
  InputTitle,
  TextfieldWrapper,
  TextfieldWrapperWithButton,
  TextFieldWrapperButton,
  UserModeToggle,
  VerificationNumberInputWrapper,
  VerificationTitle,
  ButtonWrapper,
};
