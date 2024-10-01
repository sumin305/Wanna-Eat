import { useEffect } from 'react';
import useHeaderStore from 'stores/common/useHeaderStore';
const MyZzimPage = () => {
  const { setPageName, setIsShowBackIcon, setActiveIcons } = useHeaderStore();

  useEffect(() => {
    setPageName('내가 찜한 식당');
    setIsShowBackIcon(true);
    setActiveIcons([]);
  }, []);
  return <div>내가 찜한 식당 페이지 입니다</div>;
};
export default MyZzimPage;
