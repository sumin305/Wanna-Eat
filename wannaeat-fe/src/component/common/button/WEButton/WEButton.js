import styled from '@emotion/styled';
import theme from '../../../../style/common/theme';

const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

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
    if (props.size === 'modal') return 500;
    return 700;
  }};

  font-size: ${(props) => {
    if (props.fontSize) return props.fontSize;

    const sizeMap = {
      long: theme.fontSize.px17,
      venti: theme.fontSize.px17,
      medium: theme.fontSize.px17,
      modal: theme.fontSize.px13,
      short: theme.fontSize.px17,
      menu: theme.fontSize.px13,
    };

    return sizeMap[props.size] || theme.fontSize.px17;
  }};

  border: ${(props) => {
    if (props.disabled && props.outlined) return '2px solid #D4D4D4';
    if (props.outlined) return '2px solid #FF6528';
    return 'none';
  }};
  border-radius: ${theme.borderRadius.default};

  width: ${(props) => {
    if (props.width) return props.width;

    const sizeMap = {
      long: '93%',
      venti: '11rem',
      medium: '7.5625rem',
      modal: '5.25rem',
      short: '4.75rem',
      menu: '4.125rem',
    };

    return sizeMap[props.size] || '16.1875rem';
  }};

  height: ${(props) => {
    if (props.height) return props.height;

    const sizeMap = {
      long: '2.5rem',
      venti: '2.5rem',
      medium: '2.5rem',
      modal: '2rem',
      short: '2.5rem',
      menu: '1.8125rem',
    };

    return sizeMap[props.size] || '2.5rem';
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

  margin: 0 auto;
`;

export default ButtonStyled;
