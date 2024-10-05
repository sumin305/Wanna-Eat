import React, { useState, useEffect } from 'react';
import { getMenu, deleteMenu } from '../../../../api/manager/menu/menu.js'; // deleteMenu API 추가
import deleteImg from '../../../../assets/icons/menu/Delete.svg'; // 이미지 경로 수정
import editImg from '../../../../assets/icons/menu/Edit.svg'; // 이미지 경로 수정
import PlustImg from '../../../../assets/icons/menu/Plus.svg'; // 이미지 경로 수정
import SettingImg from '../../../../assets/icons/menu/Setting.svg'; // 이미지 경로 수정
import MenuRegistPage from '../MemuRegistPage/MemuRegistPage.jsx'; // MenuRegistPage 임포트
import MenuEditPage from '../MenuEditPage/MenuEditPage.jsx'; // MenuEditPage 임포트
import MenuCategoryPage from '../MenuCategoryPage/MenuCategoryPage.jsx'; // MenuCategoryPage 임포트
import Modal from './Modal.js'; // Modal 컴포넌트 임포트

import {
  MenuPageContainer,
  MenuCategoryTabs,
  MenuTab,
  MenuItems,
  MenuItem,
  MenuImage,
  MenuInfo,
  MenuTitle,
  MenuDescription,
  MenuPrice,
  MenuIcons,
  MenuIcon,
  AddButton,
  SettingButton, // 스타일 파일에 설정 버튼 추가
} from './MenuViewPage.js'; // 스타일 파일 임포트

const MenuViewPage = () => {
  const [menuData, setMenuData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // 메뉴 등록 모달 상태
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 메뉴 수정 모달 상태
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false); // 카테고리 모달 상태
  const [menuUpdated, setMenuUpdated] = useState(false); // 메뉴가 업데이트되었는지 여부 상태 추가
  const [editMenuData, setEditMenuData] = useState(null); // 수정할 메뉴 데이터

  // 메뉴 데이터를 가져오는 함수
  const fetchMenuData = () => {
    setLoading(true);
    getMenu()
      .then((response) => {
        if (response.data) {
          const allCategories = response.data.menuListByCategoryResponseDtos;
          setMenuData([
            { menuCategoryName: '전체', menuDetailResponseDtos: [] },
            ...allCategories,
          ]);
          setSelectedCategory('전체');
        }
      })
      .catch((error) => {
        console.error('Error fetching menu data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // 메뉴 데이터를 가져오는 useEffect
  useEffect(() => {
    fetchMenuData();
  }, [menuUpdated]); // 메뉴가 업데이트될 때마다 useEffect가 재실행되도록

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!menuData || menuData.length === 0) {
    return <div>No menus available</div>;
  }

  const filteredMenu =
    selectedCategory === '전체'
      ? menuData.flatMap((category) => category.menuDetailResponseDtos)
      : menuData.find(
          (category) => category.menuCategoryName === selectedCategory
        )?.menuDetailResponseDtos;

  const categoriesWithoutAll = menuData.filter(
    (category) => category.menuCategoryName !== '전체'
  );

  const handleEditMenu = (menu) => {
    setEditMenuData(menu); // 수정할 메뉴 데이터 설정
    setIsEditModalOpen(true); // 메뉴 수정 모달 열기
  };

  // 메뉴 삭제 핸들러
  const handleDeleteMenu = async (menuId) => {
    try {
      await deleteMenu(menuId); // API를 통해 메뉴 삭제
      setMenuUpdated((prev) => !prev); // 메뉴가 삭제되면 업데이트 상태 변경
    } catch (error) {
      console.error('메뉴 삭제 중 오류가 발생했습니다.', error);
    }
  };

  return (
    <MenuPageContainer>
      {/* 카테고리 탭과 설정 버튼 */}
      <MenuCategoryTabs>
        {menuData.map((category, index) => (
          <MenuTab
            key={index}
            active={selectedCategory === category.menuCategoryName}
            onClick={() => setSelectedCategory(category.menuCategoryName)}
          >
            {category.menuCategoryName}
          </MenuTab>
        ))}
        <SettingButton onClick={() => setIsCategoryModalOpen(true)}>
          <img
            src={SettingImg}
            alt="Settings"
            style={{ width: '24px', height: '24px' }} // 설정 이미지 크기 조정
          />
        </SettingButton>
      </MenuCategoryTabs>

      {/* 선택된 카테고리의 메뉴 항목 */}
      <MenuItems>
        {filteredMenu &&
          filteredMenu.map((menu) => (
            <MenuItem key={menu.menuId}>
              <MenuIcons>
                <MenuIcon src={editImg} alt="Edit" onClick={() => handleEditMenu(menu)} />
                <MenuIcon src={deleteImg} alt="Delete" onClick={() => handleDeleteMenu(menu.menuId)} />
              </MenuIcons>

              <MenuImage src={menu.menuImage} alt={menu.menuName} />
              <MenuInfo>
                <MenuTitle>{menu.menuName}</MenuTitle>
                <MenuPrice>{menu.menuPrice}원</MenuPrice>
                <MenuDescription>{menu.menuDescription}</MenuDescription>
              </MenuInfo>
            </MenuItem>
          ))}
      </MenuItems>

      {/* 하단 오른쪽에 + 버튼 추가 */}
      <AddButton onClick={() => setIsModalOpen(true)}>
        <img
          src={PlustImg}
          alt="Add"
          style={{ width: '100%', height: '100%' }}
        />
      </AddButton>

      {/* 메뉴 등록 모달 */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <MenuRegistPage
          onClose={() => {
            setIsModalOpen(false); // 모달 닫기
            setMenuUpdated((prev) => !prev); // 메뉴가 업데이트되었음을 알림
          }}
        />
      </Modal>

      {/* 메뉴 수정 모달 */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <MenuEditPage
          menuData={editMenuData}
          onClose={() => {
            setIsEditModalOpen(false); // 모달 닫기
            setMenuUpdated((prev) => !prev); // 메뉴가 업데이트되었음을 알림
          }}
        />
      </Modal>

      {/* 카테고리 설정 모달 */}
      <Modal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      >
        <MenuCategoryPage
          categories={categoriesWithoutAll}
          onClose={() => setIsCategoryModalOpen(false)}
        />
      </Modal>
    </MenuPageContainer>
  );
};

export default MenuViewPage;
