import styled from '@emotion/styled';
import theme from '../../../../style/common/theme';

const TextfieldWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.width ? props.width : theme.width.textfield)};
  margin: 0 auto;
`;

const TextfieldStyled = styled.input`
  height: ${(props) => (props.height ? props.height : theme.height.textfield)};
  border: 1px solid
    ${(props) => (props.error ? theme.color.warning : theme.color.disabled)};
  font-weight: 500;
  color: ${(props) =>
    props.color || (props.error ? theme.color.warning : theme.color.info)};
  padding: 0.625rem 0.938rem;
  font-size: ${theme.fontSize.px11};
  border-radius: 0.3rem;
  box-sizing: border-box;

  outline: none;

  &:focus {
    border: 1px solid
      ${(props) => (props.error ? theme.color.warning : theme.color.primary)};
    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.5);
    color: ${(props) =>
      props.error ? theme.color.warning : theme.color.primary};
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
  width: fit-content;
  height: 1.3rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.313rem;
  margin-left: 0.213rem;

  visibility: ${(props) => (props.error ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.error ? 1 : 0)};
  transition: opacity 0.3s ease;

  svg {
    width: 0.88542rem;
    height: 0.88542rem;
    margin-right: 0.19rem;
  }
`;

export default {
  TextfieldWrapperStyled,
  TextfieldStyled,
  ErrorMessageStyled,
  ErrorMessageDivStyled,
};
