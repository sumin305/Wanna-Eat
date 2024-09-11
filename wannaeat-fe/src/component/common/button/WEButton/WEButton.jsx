import ButtonStyled from './WEButton.js';

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

Button.defaultProps = {
  size: 'medium',
  outlined: false,
  disabled: false,
};

export default Button;
