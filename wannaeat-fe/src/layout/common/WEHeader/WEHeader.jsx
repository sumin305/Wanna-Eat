import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useHeaderStore from '../../../stores/header/useHeaderStore';
import {
  HeaderContainer,
  HeaderWrapper,
  HeaderLeft,
  LogoTitle,
  HeaderCenter,
  HeaderRight,
  HeaderImg,
  HeaderTitle,
  IconImg,
} from './WEHeader';

import Logo from '../../../assets/icons/header/logo.svg';
import BackCarrot from '../../../assets/icons/header/back-carrot.svg';
import BackWhite from '../../../assets/icons/header/back-white.svg';

const WEHeader = ({ isCarrot, text, icon, isShowLogo, isShowBackIcon }) => {
  const {
    pageName,
    setIsCarrot,
    setPageName,
    setIsShowLogo,
    activeIcons,
    setActiveIcons,
    setIsShowBackIcon,
  } = useHeaderStore();

  const nav = useNavigate();

  useEffect(() => {
    setIsCarrot(isCarrot);
    setPageName(text);
    setActiveIcons(icon);
    setIsShowLogo(isShowLogo);
    setIsShowBackIcon(isShowBackIcon);
  }, []);

  const handleBackClick = () => {
    nav(-1); // 뒤로가기
  };

  return (
    <HeaderContainer isCarrot={isCarrot}>
      <HeaderWrapper>
        <HeaderLeft>
          {isShowLogo ? (
            <>
              <HeaderImg src={Logo} alt="로고" />
              <LogoTitle isCarrot={isCarrot}>머 물래?</LogoTitle>
            </>
          ) : isShowBackIcon ? (
            <HeaderImg
              src={isCarrot ? BackWhite : BackCarrot}
              alt="뒤로가기"
              onClick={handleBackClick}
            />
          ) : null}
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle
            isShowLogo={isShowLogo}
            isShowBackIcon={isShowBackIcon}
            isCarrot={isCarrot}
          >
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
