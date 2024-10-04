import WETab from 'component/common/tab/WETab/WETab.jsx';
import WEButton from 'component/common/button/WEButton/WEButton.jsx';
// import { useNavigate, useParams } from 'react-router-dom';
// import useOrderStore from 'stores/customer/useOrderStore';
// import { useState } from 'react';
// import CartIcon from 'assets/icons/order/cart.svg';
// import useChatStore from 'stores/customer/useChatStore';

// const MenuSelectBox = () => {
//   const nav = useNavigate();
//   const params = useParams();
//   const reservationUrl = params.url;
//   const { allMenusData } = useOrderStore();
//   const { stompClient, isConnected } = useChatStore();
//   const [activeTab, setActiveTab] = useState(0);
//   const myReservationParticipantId = 1;
//   const increment = 1; // 증가 갯수는 1로 설정

//   // 카테고리 추출
//   const tabs = allMenusData.menuListByCategoryResponseDtos.map(
//     (category) => category.menuCategoryName
//   );

//   // 선택한 카테고리에 따른 메뉴
//   const currentMenuDetails =
//     allMenusData.menuListByCategoryResponseDtos[activeTab]
//       ?.menuDetailResponseDtos;

//   const clickGotoOrder = () => {
//     nav(`/customer/order/${reservationUrl}`);
//   };

//   const handleCartIconClick = (menuId) => {
//     const cartRegisterRequestDto = {
//       reservationUrl: reservationUrl,
//       reservationParticipantId: myReservationParticipantId,
//       menuId: menuId,
//       menuPlusMinus: increment,
//     };

//     if (stompClient && isConnected) {
//       try {
//         stompClient.send(
//           `api/public/sockets/carts/register`,
//           {},
//           JSON.stringify(cartRegisterRequestDto)
//         );
//         console.log('장바구니 업데이트 내용:', cartRegisterRequestDto);
//       } catch (error) {
//         console.log('장바구니 업데이트 실패', error);
//       }
//     } else {
//       console.log('웹소켓 연결 실패');
//       alert('웹소켓 연결에 실패했습니다.');
//     }
//   };

//   return (
//     <>
//       <WETab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
//       {tabs[activeTab]}
//       {currentMenuDetails &&
//         currentMenuDetails.map((menu, menuId) => (
//           <div key={menuId}>
//             <p>{menu.menuImage}</p>
//             <p>{menu.menuName}</p>
//             <p>{menu.menuPrice}</p>
//             <p>{menu.menuDescription}</p>
//             <img
//               src={CartIcon}
//               alt="담기 아이콘"
//               onClick={() => handleCartIconClick(menu.menuId)}
//             />
//           </div>
//         ))}

//       <WEButton onClick={clickGotoOrder}>주문내역보기</WEButton>
//     </>
//   );
// };

// export default MenuSelectBox;
