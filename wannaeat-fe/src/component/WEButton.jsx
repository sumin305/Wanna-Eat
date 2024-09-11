import styled from '@emotion/styled';
import PropTypes from 'prop-types';

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

  font-family: 'Paperlogy-8ExtraBold';
  font-weight: 700;
  letter-spacing: 0.05313rem;
  font-size: ${(props) => {
    if (props.size === 'long') return '1.0625rem';
    if (props.size === 'short') return '1.0625rem';
    return '1.0625rem';
  }};

  border: ${(props) => {
    if (props.outlined) return '2px solid #FF6528';
    return 'none';
  }};
  border-radius: 5px;

  width: ${(props) => {
    if (props.size === 'long') return '15.1rem';
    if (props.size === 'short') return '5.75rem';
    if (props.size === 'medium') return '11rem';
    return '11rem';
  }};
  height: ${(props) => {
    if (props.size === 'long') return '2.13rem';
    if (props.size === 'short') return '2.5rem';
    if (props.size === 'medium') return '2.5rem';
    return '2.5rem';
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

const Button = ({
  children,
  size = 'medium',
  backgroundColor,
  color,
  activeColor,
  outlined = false,
  disabled = false,
  onClick,
}) => {
  return (
    <ButtonStyled
      size={size}
      backgroundColor={backgroundColor}
      color={color}
      activeColor={activeColor}
      outlined={outlined}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </ButtonStyled>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['long', 'short', 'medium']),
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  activeColor: PropTypes.string,
  outlined: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  size: 'medium',
  outlined: false,
  disabled: false,
};

export default Button;
