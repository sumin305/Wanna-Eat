import styled from '@emotion/styled';
import theme from '../../../../style/common/theme';

const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background-color: ${(props) => {
    if (props.disabled) return '#D4D4D4';
    if (props.outlined) return 'transparent';
    return props.backgroundColor || '#FF6528';
  }};

  color: ${(props) => {
    if (props.disabled) return 'white';
    if (props.outlined) return '#FF6528';
    return props.color || 'white';
  }};

  font-weight: ${(props) => {
    if (props.size === 'short') return 500;
    return 700;
  }};

  font-size: ${(props) => {
    if (props.size === 'long') return '1.0625rem';
    if (props.size === 'short') return '0.813rem';
    return '1.0625rem';
  }};

  border: ${(props) => {
    if (props.outlined) return '2px solid #FF6528';
    return 'none';
  }};
  border-radius: ${theme.borderRadius.default};

  width: ${(props) => {
    if (props.size === 'long') return '15.1rem';
    if (props.size === 'short') return '5.75rem';
    if (props.size === 'medium') return '11rem';
    return '11rem';
  }};
  height: ${() => {
    return '2.13rem';
  }};

  user-select: none;

  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  transition:
    background-color 0.2s ease,
    transform 0.1s ease;

  &:active {
    background-color: ${(props) =>
      !props.disabled && (props.activeColor || '#FFAC76')};
    cursor: pointer;
    transform: scale(0.98);
  }
`;

export default ButtonStyled;
