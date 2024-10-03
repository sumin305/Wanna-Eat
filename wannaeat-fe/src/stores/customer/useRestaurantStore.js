import { create } from 'zustand';
import { getRestaurantInfo } from 'api/customer/restaurant';
const useRestaurantStore = create((set) => ({
  restaurant: {},
  restaurantId: -1,
  breakEndTime: '',
  breakStartTime: '',
  depositPerMember: '',
  latitude: 0.0,
  longitude: 0.0,
  maxMemberCount: 0,
  minMemberCount: 0,
  maxReservationTime: '',
  menus: {},
  restaurantAddress: '',
  restaurantBusinessNumber: '',
  restaurantCategoryName: '',
  restaurantCloseTime: '',
  restaurantDescription: '',
  restaurantName: '',
  restaurantOpenTime: '',
  restaurantOwnerName: '',
  restaurantPhone: '',
  restaurantImage: '',
  reservationDetails: [],
  setRestaurantId: (id) => set({ restaurantId: id }),
  setReservationDetails: (details) => set({ reservationDetails: details }),
  setRestaurant: async (id) => {
    const result = await getRestaurantInfo(id);
    console.log(result);

    if (result.status === 200) {
      const restaurant = result.data.data;
      console.log(restaurant);
      set({
        restaurant: restaurant,
        restaurantId: restaurant.restaurantId || -1,
        breakEndTime: restaurant.breakEndTime
          ? restaurant.breakEndTime.substring(0, 5)
          : '',
        breakStartTime: restaurant.breakStartTime
          ? restaurant.breakStartTime.substring(0, 5)
          : '',
        depositPerMember: restaurant.depositPerMember || '',
        latitude: restaurant.latitude || 0,
        longitude: restaurant.longitude || 0,
        maxMemberCount: restaurant.maxMemberCount || 0,
        minMemberCount: restaurant.minMemberCount || 0,
        maxReservationTime: restaurant.maxReservationTime
          ? restaurant.maxReservationTime
          : '',
        menus: restaurant.menuListResponseDto.menusMap || {},
        restaurantAddress: restaurant.restaurantAddress || '',
        restaurantBusinessNumber: restaurant.restaurantBusinessNumber || '',
        restaurantCategoryName: restaurant.restaurantCategoryName || '',
        restaurantCloseTime: restaurant.restaurantCloseTime
          ? restaurant.restaurantCloseTime.substring(0, 5)
          : '',
        restaurantDescription: restaurant.restaurantDescription || '',
        restaurantName: restaurant.restaurantName || 'erw',
        restaurantOpenTime: restaurant.restaurantOpenTime
          ? restaurant.restaurantOpenTime.substring(0, 5)
          : '',
        restaurantOwnerName: restaurant.restaurantOwnerName || '',
        restaurantPhone: restaurant.restaurantPhone || '',
        restaurantImage: restaurant.restaurantImage || '',
      });
    } else {
      console.log('매장 상세 정보 조회 실패');
    }
  },
}));

export default useRestaurantStore;
