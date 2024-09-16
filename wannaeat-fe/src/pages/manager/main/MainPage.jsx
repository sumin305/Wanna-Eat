import WEHeader from '../../../layout/common/WEHeader/WEHeader.jsx';
import useHeaderStore from '../../../stores/header/useHeaderStore.js';

const MainPage = () => {
  const { icons } = useHeaderStore();

  return (
    <>
      <WEHeader
        text="메인페이지"
        icon={[icons[0]]}
        isShowLogo={false}
        isShowBackIcon={true}
      />
      <div>사장님 메인페이지</div>
    </>
  );
};

export default MainPage;
