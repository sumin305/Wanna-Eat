import { HeaderContainer, HeaderText } from './WEExtraHeader';

const WEExtraHeader = ({ isExtraCarrot, text }) => {
  return (
    <HeaderContainer isExtraCarrot={isExtraCarrot}>
      <HeaderText isExtraCarrot={isExtraCarrot}>{text}</HeaderText>
    </HeaderContainer>
  );
};

export default WEExtraHeader;
