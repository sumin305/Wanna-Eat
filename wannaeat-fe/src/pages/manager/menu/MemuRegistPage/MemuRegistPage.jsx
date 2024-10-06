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
  DecorateButton, // 새로 추가된 꾸미기 버튼
  ButtonContainer // 버튼 컨테이너 임포트
} from './MemuRegistPage.js'; // 스타일 임포트

import PlusImg from '../../../../assets/icons/menu/Plus.svg';
import { getCategoryList, registerMenu, editImage } from '../../../../api/manager/menu/menu.js'; // API 임포트

const MenuRegistPage = ({ onClose }) => {
  const [menuName, setMenuName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); // 선택된 카테고리
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // 업로드된 원본 이미지
  const [processedImage, setProcessedImage] = useState(null); // 꾸민 후의 이미지 (파일로 관리)
  const [previewUrl, setPreviewUrl] = useState(null); // 이미지 미리보기용 URL
  const [categories, setCategories] = useState([]); // 카테고리 목록 상태
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 중 여부 확인 상태 추가

  // 컴포넌트 렌더링 시 카테고리 목록을 API로 불러오기
  useEffect(() => {
    const fetchCategoriesFromAPI = async () => {
      try {
        const fetchedCategories = await getCategoryList(); // restaurantId 필요 없음
        setCategories(fetchedCategories); // 카테고리 데이터를 상태에 저장
        setSelectedCategory(fetchedCategories[0]?.menuCategoryId || ''); // 기본 선택 카테고리 설정
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategoriesFromAPI();
  }, []);

  // 이미지 업로드 핸들러
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file); // 원본 이미지 저장
    setProcessedImage(null); // 꾸민 이미지는 초기화
    setPreviewUrl(URL.createObjectURL(file)); // 이미지 미리보기 URL 설정
  };

  // 이미지 꾸미기 (editImage API 호출)
  const handleImageDecorate = async () => {
    if (!image) {
      alert("이미지를 먼저 업로드하세요.");
      return;
    }

    try {
      // API에서 Blob 형태의 이미지 데이터를 받아옴
      const decoratedImageBlob = await editImage(image);

      // Blob 형태의 데이터를 URL로 변환
      const decoratedImageUrl = URL.createObjectURL(decoratedImageBlob);

      // 수정된 이미지로 미리보기 업데이트 및 파일 저장
      setPreviewUrl(decoratedImageUrl);
      setProcessedImage(decoratedImageBlob); // 꾸민 이미지를 파일로 저장
    } catch (error) {
      console.error('이미지 꾸미기 중 오류가 발생했습니다.', error);
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 이미 제출 중이면 중복 제출 방지
    if (isSubmitting) return;

    const menuData = {
      menuCategoryId: selectedCategory,
      menuName: menuName,
      menuPrice: parseInt(price, 10),
      menuDescription: description,
    };

    try {
      setIsSubmitting(true); // 제출 중 상태로 변경

      // 제출 시 최종 이미지로 처리 (꾸민 이미지가 있으면 그것을 사용)
      const finalImage = processedImage || image;

      await registerMenu(menuData, finalImage); // restaurantId 없이 API 호출
      onClose(); // 모달 닫기
    } catch (error) {
      console.error('메뉴 등록 중 오류가 발생했습니다.', error);
    } finally {
      setIsSubmitting(false); // 제출 완료 후 다시 제출 가능하도록 설정
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
            <option key={category.menuCategoryId} value={category.menuCategoryId}>
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
            style={{ width: '150px' }}  // 인풋 필드의 너비를 줄임
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
            width="200"
            style={{ display: 'block', margin: '10px 0', borderRadius: '8px' }} // 버튼과 라벨 사이에 배치
          />
        )}

        {/* 업로드 버튼과 꾸미기 버튼을 나란히 배치 */}
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

          {/* 꾸미기 버튼 */}
          {image && (
            <DecorateButton onClick={handleImageDecorate}>
              꾸미기
            </DecorateButton>
          )}
        </ButtonContainer>
      </div>

      {/* 확인 및 닫기 버튼 */}
      <CloseButtonContainer>
        <SubmitButton onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? '등록 중...' : '확인'}
        </SubmitButton>
        <CloseButton onClick={onClose}>닫기</CloseButton> {/* 닫기 버튼 추가 */}
      </CloseButtonContainer>
    </FormContainer>
  );
};

export default MenuRegistPage;
