import { useLocation, useNavigate } from 'react-router-dom';

const NotExistOrderPage = () => {
  const location = useLocation();
  const nav = useNavigate();

  const clickGotoReservation = () => {
    nav('/customer/reservation');
  };

  return (
    <>
      <div>{location.state.message}</div>
      <button onClick={clickGotoReservation}>예약하기 페이지로 이동</button>
    </>
  );
};

export default NotExistOrderPage;
