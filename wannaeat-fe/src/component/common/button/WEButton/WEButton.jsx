import ButtonStyled from './WEButton.js';

const Button = ({
  children,
  size = 'long',
  width,
  height,
  backgroundColor,
  fontSize,
  color,
  activeColor,
  outlined = false,
  disabled = false,
  onClick,
  miniOutlined,
  fontWeight,
  borderColor,
}) => {
  return (
    <ButtonStyled
      size={size}
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      fontSize={fontSize}
      color={color}
      activeColor={activeColor}
      outlined={outlined}
      disabled={disabled}
      onClick={onClick}
      miniOutlined={miniOutlined}
      fontWeight={fontWeight}
      borderColor={borderColor}
    >
      {children}
    </ButtonStyled>
  );
};

export default Button;
