// import WETab from 'component/common/tab/WETab/WETab.jsx';
import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import { useNavigate, useParams } from 'react-router-dom';

const MenuSelectBox = () => {
  const nav = useNavigate();
  const params = useParams();
  const reservationUrl = params.url;

  const clickGotoOrder = () => {
    nav(`/customer/order/${reservationUrl}`);
  };

  return (
    <>
      <div>메뉴선택박스</div>
      {/* <WETab /> */}
      <WEButton onClick={clickGotoOrder}>주문내역보기</WEButton>
    </>
  );
};

export default MenuSelectBox;
