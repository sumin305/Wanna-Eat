import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useHeaderStore from '../../../../../stores/common/header/useHeaderStore';

const RestaurantDetailPage = () => {
  const params = useParams();
  const {
    setIsCarrot,
    pageName,
    setPageName,
    setIsShowLogo,
    setActiveIcons,
    setIsShowBackIcon,
    activeIcons,
    isShowBackIcon,
  } = useHeaderStore();

  useEffect(() => {
    setIsCarrot(true);
    setPageName('서래갈매기 한밭대점'); // 나중에 가게이름
    setIsShowLogo(false);
    setIsShowBackIcon(true);
    setActiveIcons([3]);
  }, []);
  console.log(isShowBackIcon);

  return <div> {params.id}번 가게 상세페이지</div>;
};

export default RestaurantDetailPage;
