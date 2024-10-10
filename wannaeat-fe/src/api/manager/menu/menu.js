import { clientInstance, authClientInstance } from 'utils/http-client';

// 모든 메뉴 조회
export const getMenu = async () => {
  const restaurantId = window.localStorage.getItem('restaurantId');

  try {
    const result = await clientInstance.get(`api/public/restaurants/${restaurantId}/menus`);
    return result.data;
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }
};

// 카테고리 등록 API
export const registerCategory = async (menuCategoryName) => {
  const restaurantId = window.localStorage.getItem('restaurantId');

  try {
    const result = await authClientInstance.post(`/api/menu-categories`, {
      restaurantId,
      menuCategoryName,
    });
    return result.data;
  } catch (error) {
    console.error('Error registering category:', error);
    throw error;
  }
};

// 카테고리 조회 API
export const getCategoryList = async () => {
  const restaurantId = window.localStorage.getItem('restaurantId');

  try {
    const result = await clientInstance.get(`/api/public/restaurants/${restaurantId}/menu-categories`);
    return result.data?.data?.menuCategories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// 카테고리 수정 API
export const editMenuCategory = async (menuCategoryId, menuCategoryName) => {
  try {
    const result = await authClientInstance.patch(`/api/menu-categories/${menuCategoryId}`, { menuCategoryName });
    return result.data;
  } catch (error) {
    console.error('Error editing category:', error);
    throw error;
  }
};

// 카테고리 삭제 API
export const removeMenuCategory = async (menuCategoryId) => {
  try {
    const result = await authClientInstance.delete(`/api/menu-categories/${menuCategoryId}`);
    return result.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

// 메뉴 등록 API
export const registerMenu = async (menuData, menuImage) => {
  const restaurantId = window.localStorage.getItem('restaurantId');

  const formData = new FormData();
  const menuDataWithRestaurantId = {
    ...menuData,
    restaurantId,
  };

  formData.append(
    'menuRegisterRequestDto',
    new Blob([JSON.stringify(menuDataWithRestaurantId)], { type: 'application/json' })
  );

  // menuImage가 Blob일 경우 File로 변환
  if (menuImage) {
    let imageFile;
    if (menuImage instanceof Blob && !(menuImage instanceof File)) {
      // Blob에서 File로 변환 (파일명과 타입 지정)
      imageFile = new File([menuImage], 'decorated_image.png', { type: 'image/png' });
    } else {
      imageFile = menuImage;
    }

    // 이미지 파일이 허용된 타입이면 formData에 추가
    if (['image/jpeg', 'image/png', 'image/gif'].includes(imageFile.type)) {
      formData.append('menuImage', imageFile);
    } else {
      console.warn('Unsupported image format');
    }
  }

  try {
    const result = await authClientInstance.post(`/api/menus`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 40000,
    });
    return result.data;
  } catch (error) {
    console.error('Error registering menu:', error);
    throw error;
  }
};


// 메뉴 수정
export const updateMenu = async (menuId, menuData, menuImage) => {
  const restaurantId = window.localStorage.getItem('restaurantId');

  const menuDataWithRestaurantId = {
    ...menuData,
    restaurantId,
  };

  const formData = new FormData();
  formData.append(
    'menuEditRequestDto',
    new Blob([JSON.stringify(menuDataWithRestaurantId)], { type: 'application/json' })
  );

  if (menuImage && ['image/jpeg', 'image/png', 'image/gif'].includes(menuImage.type)) {
    formData.append('menuImage', menuImage);
  } else {
    console.warn('Unsupported image format');
  }

  try {
    const result = await authClientInstance.patch(`/api/menus/${menuId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return result.data;
  } catch (error) {
    console.error('Error updating menu:', error);
    throw error;
  }
};

// 메뉴 삭제 API
export const deleteMenu = async (menuId) => {
  try {
    const result = await authClientInstance.delete(`/api/menus/${menuId}`);
    return result.data;
  } catch (error) {
    console.error('Error deleting menu:', error);
    throw error;
  }
};

// 이미지 처리 API 호출
export const editImage = async (imageFile) => {
  const ngrokBaseUrl = process.env.REACT_APP_NGROK_BASE_URL;

  if (!ngrokBaseUrl) {
    console.error('ngrok URL이 설정되지 않았습니다.');
    return;
  }

  const formData = new FormData();
  formData.append('file', imageFile);

  try {
    const result = await clientInstance.post(`${ngrokBaseUrl}/edit-image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      responseType: 'blob',
      timeout: 10000000,
    });

    return result.data;
  } catch (error) {
    console.error('Error editing image:', error);
    throw error;
  }
};
