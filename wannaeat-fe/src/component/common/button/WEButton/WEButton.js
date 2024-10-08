import styled from '@emotion/styled';
import theme from 'style/common/theme';

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
    if (props.color) return props.color;
    if (props.disabled) return 'white';
    if (props.outlined) return '#FF6528';
    return props.color || 'white';
  }};

  font-weight: ${(props) => {
    if (props.fontWeight) return props.fontWeight;
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
    if (props.borderColor && props.outlined)
      return '2px solid ' + props.borderColor;
    if (props.miniOutlined) {
      if (props.borderColor) return '1px solid ' + props.borderColor;
      return '1px solid #FF6528';
    }
    if (props.disabled && props.outlined) return '2px solid #D4D4D4';
    if (props.outlined) return '2px solid #FF6528';
    return 'none';
  }};
  border-radius: ${theme.borderRadius.default};

  width: ${(props) => {
    if (props.width) return props.width;

    const sizeMap = {
      long: '93%',
      venti: '63%',
      medium: '43.4%',
      modal: '45%',
      short: '27.2%',
      menu: '23.7%',
    };

    return sizeMap[props.size] || 'none';
  }};

  height: ${(props) => {
    if (props.height) return props.height;

    const sizeMap = {
      long: '6.8vh',
      venti: '6.8vh',
      medium: '6.8vh',
      modal: '5.5vh',
      short: '6.8vh',
      menu: '5vh',
    };

    return sizeMap[props.size] || 'none';
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

  @media (min-width: 480px) {
    width: ${(props) => {
      if (props.width) return props.width;

      const sizeMap = {
        long: '93%',
        venti: '63%',
        medium: '43.4%',
        modal: '45%',
        short: '27.2%',
        menu: '23.7%',
      };

      return sizeMap[props.size] || 'none';
    }};
  }
`;

export default ButtonStyled;
