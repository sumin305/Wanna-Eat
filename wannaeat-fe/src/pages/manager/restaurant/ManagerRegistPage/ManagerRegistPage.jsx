import { useEffect } from 'react';
import useHeaderStore from '../../../../stores/common/header/useHeaderStore';
import { ManagerRegistPageStyled } from './ManagerRegistPage.js';
import WETextField from 'component/common/textfield/WETextfield/WETextfield.jsx';

const ManagerRegistPage = () => {
  const { setIsCarrot, setPageName, setIsUnderLine } = useHeaderStore();

  useEffect(() => {
    setIsCarrot(false);
    setIsUnderLine(true);
    setPageName('매장 정보 입력');
  }, []);

  return (
    <ManagerRegistPageStyled>
      <WETextField />
    </ManagerRegistPageStyled>
  );
};

export default ManagerRegistPage;
