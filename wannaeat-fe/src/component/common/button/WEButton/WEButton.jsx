import ButtonStyled from './WEButton.js';

const Button = ({
  children,
  size,
  width,
  height,
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
      width={width}
      height={height}
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
  size: 'long',
  outlined: false,
  disabled: false,
};

export default Button;
