import { useEffect } from 'react';
import useHeaderStore from 'stores/common/useHeaderStore';

const MenuSelectPage = () => {
  const {
    setIsCarrot,
    setPageName,
    setIsShowLogo,
    setIsShowBackIcon,
    setActiveIcons,
  } = useHeaderStore();

  useEffect(() => {
    setIsCarrot(true);
    setPageName('메뉴선택');
    setIsShowLogo(false);
    setIsShowBackIcon(true);
    setActiveIcons([3]);
  }, []);
  return <div>메뉴 선택 페이지</div>;
};

export default MenuSelectPage;
