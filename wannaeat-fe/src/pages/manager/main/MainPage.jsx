import { useEffect } from 'react';
import WEHeader from '../../../layout/common/WEHeader/WEHeader.jsx';
import WEExtraHeader from '../../../layout/common/WEHeader/WEExtraHeader.jsx';
import useHeaderStore from '../../../stores/common/useHeaderStore.js';

const MainPage = () => {
  const {
    setPageName,
    setIsCarrot,
    setActiveIcons,
    setIsUnderLine,
    setIsShowLogo,
  } = useHeaderStore();

  useEffect(() => {
    setIsCarrot(true);
    setActiveIcons([0]);
    setIsUnderLine(false);
    setIsShowLogo(true);
    setPageName('');
  }, []);

  return (
    <>
      <div>사장님 메인페이지</div>
    </>
  );
};

export default MainPage;
