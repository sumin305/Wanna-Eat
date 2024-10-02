import WETab from 'component/common/tab/WETab/WETab.jsx';
import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import useOrderStore from 'stores/customer/useOrderStore';
import { useState } from 'react';
import CartIcon from 'assets/icons/order/cart.svg';

const MenuSelectBox = () => {
  const nav = useNavigate();
  const params = useParams();
  const reservationUrl = params.url;
  const { allMenusData } = useOrderStore();
  const [activeTab, setActiveTab] = useState(0);

  // 카테고리 추출
  const tabs = allMenusData.menuListByCategoryResponseDtos.map(
    (category) => category.menuCategoryName
  );

  // 선택한 카테고리에 따른 메뉴
  const currentMenuDetails =
    allMenusData.menuListByCategoryResponseDtos[activeTab]
      ?.menuDetailResponseDtos;

  const clickGotoOrder = () => {
    nav(`/customer/order/${reservationUrl}`);
  };

  console.log(allMenusData);

  return (
    <>
      <WETab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {tabs[activeTab]}
      {currentMenuDetails &&
        currentMenuDetails.map((menu, index) => (
          <div key={index}>
            <p>{menu.menuImage}</p>
            <p>{menu.menuName}</p>
            <p>{menu.menuPrice}</p>
            <p>{menu.menuDescription}</p>
            <img src={CartIcon} alt="담기 아이콘" />
          </div>
        ))}

      <WEButton onClick={clickGotoOrder}>주문내역보기</WEButton>
    </>
  );
};

export default MenuSelectBox;
