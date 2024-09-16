import { useEffect } from 'react';
import useHeaderStore from '../../../stores/header/useHeaderStore';
import { HeaderContainer, HeaderText } from './WEExtraHeader';

const WEExtraHeader = ({ isExtraCarrot, text }) => {
  const { extraHeaderText, setExtraHeaderText } = useHeaderStore();

  useEffect(() => {
    setExtraHeaderText(text);
  }, []);

  return (
    <HeaderContainer isExtraCarrot={isExtraCarrot}>
      <HeaderText isExtraCarrot={isExtraCarrot}>{extraHeaderText}</HeaderText>
    </HeaderContainer>
  );
};

export default WEExtraHeader;
