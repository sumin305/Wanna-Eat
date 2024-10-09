import { useNavigate } from 'react-router-dom';
import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import { OrderEndContainer, OrderEndText } from './OrderSuccessPage.jsx';

const OrderSuccessPage = () => {
  const nav = useNavigate();
  const clickGotoHome = () => {
    nav('/');
  };

  return (
    <>
      <OrderEndContainer>
        <OrderEndText>방문해주셔서 감사합니다</OrderEndText>
        <WEButton onClick={clickGotoHome}>메인화면으로 이동</WEButton>
      </OrderEndContainer>
    </>
  );
};

export default OrderSuccessPage;
