import styled from '@emotion/styled';
import theme from '../../../../style/common/theme';

const TextfieldStyled = styled.input`
  width: ${theme.width.textfield};
  height: ${theme.height};
  border: 1px solid ${props => (props.error ? theme.color.warning : '#606060')};
  font-weight: 500;
  color: ${props => (props.error ? theme.color.warning : '#606060')};
  padding: 10px 24px;
  font-size: ${theme.fontSize.px11};

  outline: none;

  &:focus {
    border: 1px solid ${theme.color.primary}; 
    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.50);
    color: ${theme.color.primary};
  }
`;

export default TextfieldStyled;
