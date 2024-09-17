import { useEffect } from 'react';
import WEHeader from '../../../layout/common/WEHeader/WEHeader.jsx';
import WEExtraHeader from '../../../layout/common/WEHeader/WEExtraHeader.jsx';
import useHeaderStore from '../../../stores/header/useHeaderStore.js';

const MainPage = () => {
  const { icons, isShowExtraHeader, setIsShowExtraHeader } = useHeaderStore();

  useEffect(() => {
    setIsShowExtraHeader(true); //페이지가 로드될 때 ExtraHeader 보여줌
    return () => setIsShowExtraHeader(false); //페이지가 언마운트될 때 ExtraHeader 숨김
  }, [setIsShowExtraHeader]);

  return (
    <>
      <WEHeader
        isCarrot={false}
        text="메인페이지"
        icon={[icons[2]]}
        isShowLogo={false}
        isShowBackIcon={true}
      />

      {isShowExtraHeader && (
        <WEExtraHeader isExtraCarrot={true} text="등록증" />
      )}

      <div>사장님 메인페이지</div>
    </>
  );
};

export default MainPage;
