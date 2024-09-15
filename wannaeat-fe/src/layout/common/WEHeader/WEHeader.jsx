import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useHeaderStore from '../../../stores/header/useHeaderStore';
import {
  HeaderContainer,
  HeaderWrapper,
  HeaderImg,
  HeaderTitle,
  IconImg,
} from './WEHeader';

import Logo from '../../../assets/icons/logo.svg';
import BackCarrot from '../../../assets/icons/back-carrot.svg';
import BackWhite from '../../../assets/icons/back-white.svg';

const WEHeader = ({ text, icon }) => {
  const {
    themeColor,
    pageName,
    setPageName,
    isShowLogo,
    activeIcons,
    setActiveIcons,
    isShowIcon,
    isShowBackIcon,
  } = useHeaderStore();

  const nav = useNavigate();

  useEffect(() => {
    setPageName(text);
    setActiveIcons(icon);
  }, [pageName]);

  return (
    <HeaderContainer>
      <HeaderWrapper>
        {isShowLogo ? (
          <HeaderImg src={Logo} alt="로고" />
        ) : (
          <HeaderImg src={BackCarrot} alt="뒤로가기" />
        )}
        <HeaderTitle>{pageName}</HeaderTitle>
        {isShowIcon &&
          activeIcons.map((icon, index) => (
            <IconImg key={index} src={icon} alt={icon.alt} />
          ))}
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default WEHeader;
