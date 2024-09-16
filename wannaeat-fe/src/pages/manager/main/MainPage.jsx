import WEHeader from '../../../layout/common/WEHeader/WEHeader.jsx';
import WEExtraHeader from '../../../layout/common/WEHeader/WEExtraHeader.jsx';
import useHeaderStore from '../../../stores/header/useHeaderStore.js';

const MainPage = () => {
  const { icons } = useHeaderStore();

  return (
    <>
      <WEHeader
        isCarrot={false}
        text="메인페이지"
        icon={[icons[0]]}
        isShowLogo={false}
        isShowBackIcon={true}
      />

      <WEExtraHeader isExtraCarrot={true} text="등록증 스캔" />

      <div>사장님 메인페이지</div>
    </>
  );
};

export default MainPage;
