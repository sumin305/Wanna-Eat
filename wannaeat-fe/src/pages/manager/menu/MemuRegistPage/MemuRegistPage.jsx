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
  DecorateButton,
  ButtonContainer,
  ImageContainer,
} from './MemuRegistPage.js';

import PlusImg from '../../../../assets/icons/menu/Plus.svg';
import {
  getCategoryList,
  registerMenu,
  editImage,
} from '../../../../api/manager/menu/menu.js'; // API 임포트
import useAlert from '../../../../utils/alert.js';

const MenuRegistPage = ({ onClose }) => {
  const showAlert = useAlert();
  const [menuName, setMenuName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isDecorating, setIsDecorating] = useState(false);

  useEffect(() => {
    const fetchCategoriesFromAPI = async () => {
      try {
        const fetchedCategories = await getCategoryList();
        setCategories(fetchedCategories);
        setSelectedCategory(fetchedCategories[0]?.menuCategoryId || '');
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategoriesFromAPI();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setProcessedImage(null);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleImageDecorate = async () => {
    if (!image) {
      showAlert('이미지를 먼저 업로드하세요.');
      return;
    }

    setIsDecorating(true);

    try {
      const decoratedImageBlob = await editImage(image);
      const decoratedImageUrl = URL.createObjectURL(decoratedImageBlob);

      setPreviewUrl(decoratedImageUrl);
      setProcessedImage(decoratedImageBlob);
    } catch (error) {
      console.error('이미지 꾸미기 중 오류가 발생했습니다.', error);
    } finally {
      setIsDecorating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const menuData = {
      menuCategoryId: selectedCategory,
      menuName: menuName,
      menuPrice: parseInt(price, 10),
      menuDescription: description,
    };

    try {
      setIsSubmitting(true);
      const finalImage = processedImage || image;
      await registerMenu(menuData, finalImage);
      onClose();
    } catch (error) {
      console.error('메뉴 등록 중 오류가 발생했습니다.', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (previewUrl) {
      setIsHighlighted(true);
      const timer = setTimeout(() => setIsHighlighted(false), 800);
      return () => clearTimeout(timer);
    }
  }, [previewUrl]);

  return (
    <FormContainer>
      <div>
        <InputLabel>메뉴명</InputLabel>
        <InputField
          type="text"
          value={menuName}
          onChange={(e) => setMenuName(e.target.value)}
          placeholder="메뉴명을 입력하세요"
        />
      </div>

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

      <div>
        <InputLabel>상세 정보</InputLabel>
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="상세 정보를 입력하세요"
        />
      </div>

      <div>
        {previewUrl && (
          <ImageContainer className={isHighlighted ? 'highlight' : ''}>
            <img
              src={previewUrl}
              alt="미리보기"
              width="200"
              style={{ display: 'block' }}
            />
          </ImageContainer>
        )}

        <ButtonContainer>
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

          {image && (
            <DecorateButton
              onClick={handleImageDecorate}
              disabled={isDecorating}
            >
              {isDecorating ? '맛있어지는 중!!' : 'AI 보정'}
            </DecorateButton>
          )}
        </ButtonContainer>
      </div>

      <CloseButtonContainer>
        <CloseButton onClick={onClose}>닫기</CloseButton>
        <SubmitButton onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? '등록 중...' : '확인'}
        </SubmitButton>
      </CloseButtonContainer>
    </FormContainer>
  );
};

export default MenuRegistPage;
