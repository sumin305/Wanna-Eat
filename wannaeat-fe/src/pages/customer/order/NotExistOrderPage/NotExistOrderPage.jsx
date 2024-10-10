import { useLocation, useNavigate } from 'react-router-dom';
import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import { NotExistContainer, NotExistText } from './NotExistOrderPage.js';

const NotExistOrderPage = () => {
  const location = useLocation();
  const nav = useNavigate();

  const message = location.state.message.split('.');

  const clickGotoReservation = () => {
    nav('/customer/reservation');
  };

  return (
    <NotExistContainer>
      <NotExistText>{message[0]}</NotExistText>
      <WEButton onClick={clickGotoReservation}>예약하기 페이지로 이동</WEButton>
    </NotExistContainer>
  );
};

export default NotExistOrderPage;
