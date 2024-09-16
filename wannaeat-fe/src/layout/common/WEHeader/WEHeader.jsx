import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useHeaderStore from '../../../stores/header/useHeaderStore';
import {
  HeaderContainer,
  HeaderWrapper,
  HeaderLeft,
  HeaderCenter,
  HeaderRight,
  HeaderImg,
  HeaderTitle,
  IconImg,
} from './WEHeader';

import Logo from '../../../assets/icons/logo.svg';
import BackCarrot from '../../../assets/icons/back-carrot.svg';
import BackWhite from '../../../assets/icons/back-white.svg';

const WEHeader = ({ text, icon, isShowLogo, isShowBackIcon }) => {
  const {
    themeColor,
    pageName,
    setPageName,
    setIsShowLogo,
    activeIcons,
    setActiveIcons,
    setIsShowBackIcon,
  } = useHeaderStore();

  const nav = useNavigate();

  useEffect(() => {
    setPageName(text);
    setActiveIcons(icon);
    setIsShowLogo(isShowLogo);
    setIsShowBackIcon(isShowBackIcon);
  }, []);

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <HeaderLeft>
          {isShowLogo ? (
            <HeaderImg src={Logo} alt="로고" />
          ) : isShowBackIcon ? (
            <HeaderImg src={BackCarrot} alt="뒤로가기" />
          ) : null}
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle isShowLogo={isShowLogo} isShowBackIcon={isShowBackIcon}>
            {pageName}
          </HeaderTitle>
        </HeaderCenter>
        <HeaderRight>
          {activeIcons &&
            activeIcons.map((icon, index) => (
              <IconImg key={index} src={icon} alt="icon" />
            ))}
        </HeaderRight>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default WEHeader;
