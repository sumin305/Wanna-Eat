import styled from '@emotion/styled';
import theme from '../../../../style/common/theme';

const TextfieldStyled = styled.input`
  width: ${theme.width.textfield};
  height: ${theme.height.textfield};
  border: 1px solid
    ${(props) => (props.error ? theme.color.warning : '#606060')};
  font-weight: 500;
  color: ${(props) => (props.error ? theme.color.warning : '#606060')};
  padding: 0.625rem 1.5rem;
  font-size: ${theme.fontSize.px11};

  box-sizing: border-box;

  outline: none;

  &:focus {
    border: 1px solid ${theme.color.primary};
    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.5);
    color: ${theme.color.primary};
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

const ErrorMessageStyled = styled.div`
  color: ${theme.color.warning};
  font-size: 0.75rem;
`;

const ErrorMessageDivStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.313rem;
  margin-left: 0.213rem;

  svg {
    width: 0.88542rem;
    height: 0.88542rem;
    margin-right: 0.19rem;
  }
`;

export default { TextfieldStyled, ErrorMessageStyled, ErrorMessageDivStyled };
