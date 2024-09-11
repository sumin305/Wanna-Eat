import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
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
  background-color: ${(props) =>
    props.disabled ? '#D4D4D4' : props.backgroundColor || '#FF6528'};

  color: ${(props) => props.color || 'white'};
  border: none;
  font-family: 'Paperlogy-8ExtraBold';
  border-radius: 5px;
  font-weight: 700;
  letter-spacing: 0.05313rem;
  user-select: none;

  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  font-size: ${(props) => {
    if (props.size === 'long') return '1.0625rem';
    if (props.size === 'short') return '1.0625rem';
    return '1.0625rem';
  }};

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
  disabled = false,
  onClick,
}) => {
  return (
    <ButtonStyled
      size={size}
      backgroundColor={backgroundColor}
      color={color}
      activeColor={activeColor}
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
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

// 기본값 설정
Button.defaultProps = {
  size: 'medium',
  disabled: false,
};

export default Button;
