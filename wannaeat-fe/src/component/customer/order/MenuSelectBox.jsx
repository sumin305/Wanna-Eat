import WETab from 'component/common/tab/WETab/WETab.jsx';
import WEButton from 'component/common/button/WEButton/WEButton.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import useOrderStore from 'stores/customer/useOrderStore';
import { useState } from 'react';

const MenuSelectBox = () => {
  const nav = useNavigate();
  const params = useParams();
  const reservationUrl = params.url;
  const { allMenusData } = useOrderStore();
  const [activeTab, setActiveTab] = useState(0);

  // allMenusData가 로드되었는지 확인하고 방어 코드 추가
  if (!allMenusData || !allMenusData.menuListByCategoryResponseDtos) {
    return <div>메뉴 데이터를 불러오는 중입니다...</div>;
  }

  // 카테고리 추출
  const tabs = allMenusData.menuListByCategoryResponseDtos.map(
    (category) => category.menuCategoryName
  );

  // 선택한 카테고리에 따른 메뉴
  const currentMenuDetails =
    allMenusData.menuListByCategoryResponseDtos[activeTab]
      .menuDetailResponseDtos;

  const clickGotoOrder = () => {
    nav(`/customer/order/${reservationUrl}`);
  };

  console.log(allMenusData);

  return (
    <>
      <div>메뉴선택박스</div>
      <WETab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {currentMenuDetails.map((menu, index) => (
        <div key={index}>
          <p>{menu.menuImage}</p>
          <p>{menu.menuName}</p>
          <p>{menu.menuPrice}</p>
          <p>{menu.menuDescription}</p>
        </div>
      ))}

      <WEButton onClick={clickGotoOrder}>주문내역보기</WEButton>
    </>
  );
};

export default MenuSelectBox;
