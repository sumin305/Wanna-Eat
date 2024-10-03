import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import { useNavigate } from 'react-router-dom';

const OrderSheetBox = ({ reservationUrl }) => {
  const nav = useNavigate();

  const clickGotoPay = () => {
    nav(`/customer/pay/${reservationUrl}`);
  };

  return (
    <>
      <div>결제할 메뉴</div>
      <WEButton onClick={clickGotoPay}>결제하기</WEButton>
    </>
  );
};

export default OrderSheetBox;
