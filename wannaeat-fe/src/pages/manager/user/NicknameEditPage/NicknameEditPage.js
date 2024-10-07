import styled from '@emotion/styled';
import theme from 'style/common/theme';
const InputWrapper = styled.div`
  margin: 2rem 0;
`;
const InputTitle = styled.p`
  margin: 1rem;
  font-weight: bold;
  font-size: ${theme.fontSize.px15};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  > * {
    margin: 0 0.5rem;
  }
`;

export { InputWrapper, InputTitle, ButtonWrapper };
