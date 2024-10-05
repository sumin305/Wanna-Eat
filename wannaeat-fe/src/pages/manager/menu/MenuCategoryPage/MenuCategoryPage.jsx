import React, { useState, useEffect } from 'react';
import CategoryPlustImg from '../../../../assets/icons/menu/PlusCategory.svg'; // 이미지 경로 수정
import EditImg from '../../../../assets/icons/menu/Edit.svg'; // 이미지 경로 수정
import DeleteImg from '../../../../assets/icons/menu/Delete.svg'; // 이미지 경로 수정
import { registerCategory, getCategoryList, editMenuCategory, removeMenuCategory } from '../../../../api/manager/menu/menu.js'; // 삭제 API 임포트

import {
  CategoryModalContainer,
  CategoryList,
  CategoryItem,
  CloseButton,
  IconButton,
  AddCategoryButton,
  NewCategoryInput,
  CompleteButton,
} from './MenuCategoryPage.js';

const MenuCategoryPage = ({ restaurantId, onClose }) => {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [editCategoryId, setEditCategoryId] = useState(null); // 수정 중인 카테고리 ID
  const [editCategoryName, setEditCategoryName] = useState(''); // 수정 중인 카테고리 이름

  // 카테고리 목록을 불러오는 함수
  const fetchCategories = async () => {
    try {
      const menuCategories = await getCategoryList(restaurantId);
      setCategoryList(menuCategories || []); // 불러온 카테고리 목록을 상태로 설정
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // 컴포넌트가 렌더링될 때 카테고리 목록을 불러옴
  useEffect(() => {
    fetchCategories();
  }, [restaurantId]);

  const handleAddCategory = async () => {
    if (newCategoryName.trim()) {
      try {
        await registerCategory(newCategoryName);
        await fetchCategories(); // 카테고리를 다시 가져옴
        setNewCategoryName(''); // 입력 필드 초기화
        setIsAddingCategory(false); // 입력창 닫기
      } catch (error) {
        console.error('Error adding category:', error);
      }
    } else {
      console.error('카테고리명이 입력되지 않았습니다.');
    }
  };

  const handleEditCategory = (categoryId, categoryName) => {
    setEditCategoryId(categoryId);  // 수정할 카테고리 ID 설정
    setEditCategoryName(categoryName);  // 수정할 카테고리 이름 설정
  };

  const handleSaveEditCategory = async () => {
    if (editCategoryName.trim()) {
      try {
        await editMenuCategory(editCategoryId, editCategoryName); // 카테고리 수정 API 호출
        await fetchCategories(); // 수정 후 카테고리 목록 다시 불러오기
        setEditCategoryId(null); // 수정 모드 종료
        setEditCategoryName(''); // 수정 필드 초기화
      } catch (error) {
        console.error('Error editing category:', error);
      }
    }
  };

  // 바로 삭제 처리
  const handleDeleteCategory = async (categoryId) => {
    try {
      await removeMenuCategory(categoryId); // 카테고리 삭제 API 호출
      await fetchCategories(); // 삭제 후 카테고리 목록 다시 불러오기
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <CategoryModalContainer>
      <h2>카테고리 설정</h2>
      <CategoryList>
        {categoryList.map((category) => (
          <CategoryItem key={category.menuCategoryId}>
            {/* 수정 모드일 때 input 창으로 변경 */}
            {editCategoryId === category.menuCategoryId ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <NewCategoryInput
                  type="text"
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                  placeholder="카테고리 이름 수정"
                />
                <CompleteButton onClick={handleSaveEditCategory}>완료</CompleteButton>
              </div>
            ) : (
              <>
                {/* 카테고리 이름 */}
                {category.menuCategoryName}

                {/* 수정 및 삭제 버튼 */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <IconButton onClick={() => handleEditCategory(category.menuCategoryId, category.menuCategoryName)}>
                    <img src={EditImg} alt="Edit" style={{ width: '20px', height: '20px' }} />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteCategory(category.menuCategoryId)}>
                    <img src={DeleteImg} alt="Delete" style={{ width: '20px', height: '20px' }} />
                  </IconButton>
                </div>
              </>
            )}
          </CategoryItem>
        ))}

        {/* 카테고리 추가 입력 창과 완료 버튼 */}
        {isAddingCategory && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
            <NewCategoryInput
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="새 카테고리 이름"
            />
            <CompleteButton onClick={handleAddCategory}>완료</CompleteButton>
          </div>
        )}
      </CategoryList>

      {/* 카테고리 추가 버튼 */}
      <AddCategoryButton onClick={() => setIsAddingCategory(true)}>
        <img src={CategoryPlustImg} alt="Add Category" style={{ width: '30px', height: '30px' }} />
      </AddCategoryButton>

      <CloseButton onClick={onClose}>닫기</CloseButton>
    </CategoryModalContainer>
  );
};

export default MenuCategoryPage;
