import { useEffect } from 'react';
import useHeaderStore from '../../../../stores/common/header/useHeaderStore';

const ManagerRegistPage = () => {
  const { setIsCarrot, setActiveIcons, setPageName, setIsUnderLine } =
    useHeaderStore();

  useEffect(() => {
    setIsCarrot(false);
    setActiveIcons([0]);
    setIsUnderLine(true);
    setPageName('매장 정보 입력');
  }, []);

  return <div>안녕하세용</div>;
};

export default ManagerRegistPage;
