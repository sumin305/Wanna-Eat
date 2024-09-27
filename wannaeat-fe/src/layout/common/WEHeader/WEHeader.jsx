import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useHeaderStore from '../../../stores/common/useHeaderStore';
import useCommonStore from '../../../stores/common/useCommonStore';
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
  UnderLineStyled,
} from './WEHeader';

import Logo from '../../../assets/icons/header/logo-picture.svg';
import BackCarrot from '../../../assets/icons/header/back-carrot.svg';
import BackWhite from '../../../assets/icons/header/back-white.svg';
const WEHeader = () => {
  const {
    pageName,
    isCarrot,
    activeIcons,
    isShowLogo,
    isShowBackIcon,
    isUnderLine,
  } = useHeaderStore();

  const nav = useNavigate();
  const { role } = useCommonStore();

  const handleClickBack = () => {
    nav(-1); // 뒤로가기
  };

  return (
    <HeaderContainer role={role} isCarrot={isCarrot} isUnderLine={isUnderLine}>
      <HeaderWrapper>
        <HeaderLeft isShowLogo={isShowLogo}>
          {isShowLogo ? (
            <>
              <HeaderImg src={Logo} alt="로고" />
              <LogoTitle isCarrot={isCarrot}>머 물래?</LogoTitle>
            </>
          ) : isShowBackIcon ? (
            <HeaderImg
              src={isCarrot ? BackWhite : BackCarrot}
              alt="뒤로가기"
              onClick={handleClickBack}
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
      {isCarrot === false && isUnderLine && <UnderLineStyled />}
    </HeaderContainer>
  );
};

export default WEHeader;
