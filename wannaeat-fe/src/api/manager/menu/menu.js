import { clientInstance, authClientInstance } from 'utils/http-client';

// 모든 메뉴 조회
export const getMenu = async () => {
  return await clientInstance
    .get('api/public/restaurants/1/menus')
    .then((result) => result.data)  // Promise 결과를 반환
    .catch((error) => error);  // 오류가 발생하면 error를 반환
};

// 카테고리 등록 API
export const registerCategory = async (menuCategoryName) => {

  const restaurantId = 1; // restaurantId를 하드코딩

  return await authClientInstance
    .post(`/api/menu-categories`, {
      restaurantId,
      menuCategoryName,
    })
    .then((result) => result.data)  // Promise 결과를 반환
    .catch((error) => {
      console.error('Error registering category:', error);
      throw error;  // 오류가 발생하면 에러를 던짐
    });
};

// 카테고리 조회 API
export const getCategoryList = async () => {

  const restaurantId = 1; // restaurantId를 하드코딩

  return await clientInstance
    .get(`/api/public/restaurants/${restaurantId}/menu-categories`)
    .then((result) => {
      return result.data.data.menuCategories;  // 필요한 데이터를 반환
    })
    .catch((error) => {
      console.error('Error fetching categories:', error);
      throw error;  // 오류가 발생하면 에러를 던짐
    });
};

// 카테고리 수정 API
export const editMenuCategory = async (menuCategoryId, menuCategoryName) => {
  return await authClientInstance
    .patch(`/api/menu-categories/${menuCategoryId}`, {
      menuCategoryName,
    })
    .then((result) => result.data)
    .catch((error) => {
      console.error('Error editing category:', error);
      throw error;  // 오류가 발생하면 에러를 던짐
    });
};

// 카테고리 삭제 API
export const removeMenuCategory = async (menuCategoryId) => {
  return await authClientInstance
    .delete(`/api/menu-categories/${menuCategoryId}`)
    .then((result) => result.data)
    .catch((error) => {
      console.error('Error deleting category:', error);
      throw error;  // 오류가 발생하면 에러를 던짐
    });
};

// 메뉴 등록 API
export const registerMenu = async (menuData, menuImage) => {
  const restaurantId = 1; // restaurantId를 하드코딩

  const formData = new FormData();
  const menuDataWithRestaurantId = {
    ...menuData,
    restaurantId,  // 하드코딩된 restaurantId 추가
  };

  formData.append("menuRegisterRequestDto", new Blob([JSON.stringify(menuDataWithRestaurantId)], { type: "application/json" }));

  if (menuImage) {
    formData.append("menuImage", menuImage);  // 이미지 파일 추가
  }

  return await authClientInstance
    .post(`/api/menus`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((result) => result.data)
    .catch((error) => {
      console.error('Error registering menu:', error);
      throw error;  // 오류가 발생하면 에러를 던짐
    });
};

// 메뉴 수정
export const updateMenu = async (menuId, menuData, menuImage) => {
  const restaurantId = 1; // restaurantId를 하드코딩

  // restaurantId를 추가한 메뉴 데이터 생성
  const menuDataWithRestaurantId = {
    ...menuData,
    restaurantId, // restaurantId를 항상 포함
  };

  // FormData 생성
  const formData = new FormData();

  // JSON 데이터를 Blob으로 추가
  formData.append(
    "menuEditRequestDto",
    new Blob([JSON.stringify(menuDataWithRestaurantId)], { type: "application/json" })
  );

  // 이미지가 있을 경우에만 FormData에 추가
  if (menuImage) {
    formData.append("menuImage", menuImage); // 이미지 파일 추가
  }

  try {
    // API 요청
    const result = await authClientInstance.patch(`/api/menus/${menuId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // multipart/form-data로 전송
      },
    });
    return result.data; // API 호출 성공 시 결과 반환
  } catch (error) {
    // 오류 발생 시 로그 출력 및 에러 던짐
    console.error('Error updating menu:', error);
    throw error;  // 오류가 발생하면 에러를 던짐
  }
};

// 메뉴 삭제 API
export const deleteMenu = async (menuId) => {
  try {
    const result = await authClientInstance.delete(`/api/menus/${menuId}`);
    return result.data;
  } catch (error) {
    console.error('Error deleting menu:', error);
    throw error; // 오류 발생 시 에러 던짐
  }
};
