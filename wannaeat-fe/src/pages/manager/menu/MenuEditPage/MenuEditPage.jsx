import React, { useState, useEffect } from 'react';
import {
  FormContainer,
  InputLabel,
  InputField,
  TextArea,
  Select,
  UploadButton,
  SubmitButton,
  PriceContainer,
  CloseButtonContainer,
  CloseButton,
} from '../MemuRegistPage/MemuRegistPage.js'; // 스타일 임포트

import PlusImg from '../../../../assets/icons/menu/Plus.svg';
import {
  getCategoryList,
  updateMenu, // API 임포트
} from '../../../../api/manager/menu/menu.js'; // API 임포트

const MenuEditPage = ({ menuData, onClose }) => {
  const [menuName, setMenuName] = useState(menuData.menuName || '');
  const [selectedCategory, setSelectedCategory] = useState(
    menuData.menuCategoryId || ''
  );
  const [price, setPrice] = useState(menuData.menuPrice || '');
  const [description, setDescription] = useState(menuData.menuDescription || '');
  const [image, setImage] = useState(null); // 선택한 새로운 이미지
  const [previewUrl, setPreviewUrl] = useState(menuData.menuImage || null); // 기존 이미지 URL
  const [categories, setCategories] = useState([]); // 카테고리 목록 상태

  // 카테고리 목록을 API로 불러오기
  useEffect(() => {
    const fetchCategoriesFromAPI = async () => {
      try {
        const fetchedCategories = await getCategoryList();
        setCategories(fetchedCategories);
        if (!menuData.menuCategoryId && fetchedCategories.length > 0) {
          setSelectedCategory(fetchedCategories[0].menuCategoryId);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategoriesFromAPI();
  }, [menuData]);

  // 이미지 업로드 핸들러
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // 이미지 상태에 파일을 저장
      setPreviewUrl(URL.createObjectURL(file)); // 미리보기용 URL 설정
      console.log('Image file selected:', file); // 이미지 파일 확인
    } else {
      console.log('No image file selected');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedMenuData = {
      menuCategoryId: selectedCategory,
      menuName: menuName,
      menuPrice: parseInt(price, 10),
      menuDescription: description,
    };
  
    try {
      // 이미지가 없을 때 null을 전달할 수 있도록 처리
      const imageToSend = image ? image : null;
  
      // updateMenu 호출
      await updateMenu(menuData.menuId, updatedMenuData, imageToSend); 
      onClose(); // 모달 닫기
    } catch (error) {
      console.error('메뉴 수정 중 오류가 발생했습니다.', error);
    }
  };

  return (
    <FormContainer>
      {/* 메뉴명 입력 */}
      <div>
        <InputLabel>메뉴명</InputLabel>
        <InputField
          type="text"
          value={menuName}
          onChange={(e) => setMenuName(e.target.value)}
          placeholder="메뉴명을 입력하세요"
        />
      </div>

      {/* 카테고리 선택 */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <InputLabel>카테고리</InputLabel>
      </div>
      <div>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option
              key={category.menuCategoryId}
              value={category.menuCategoryId}
            >
              {category.menuCategoryName}
            </option>
          ))}
        </Select>
      </div>

      {/* 가격 입력 */}
      <PriceContainer>
        <InputLabel>가격</InputLabel>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <InputField
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="가격을 입력하세요"
            style={{ width: '150px' }}
          />
          <span style={{ marginLeft: '10px' }}>원</span>
        </div>
      </PriceContainer>

      {/* 상세 정보 입력 */}
      <div>
        <InputLabel>상세 정보</InputLabel>
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="상세 정보를 입력하세요"
        />
      </div>

      {/* 사진 업로드 */}
      <div>
        <InputLabel>사진</InputLabel>

        {/* 이미지 미리보기 */}
        {previewUrl && (
          <img
            src={previewUrl}
            alt="미리보기"
            width="100"
            style={{ display: 'block', margin: '10px 0', borderRadius: '8px' }}
          />
        )}

        <UploadButton as="label">
          <img
            src={PlusImg}
            alt="사진 추가"
            style={{ width: '50px', height: '50px' }}
          />
          <input
            type="file"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
        </UploadButton>
      </div>

      {/* 확인 및 닫기 버튼 */}
      <CloseButtonContainer>
        <SubmitButton onClick={handleSubmit}>확인</SubmitButton>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </CloseButtonContainer>
    </FormContainer>
  );
};

export default MenuEditPage;
