import { create } from 'zustand';
import { getToken } from '../../api/common/login';
export const ROLE = {
  CUSTOMER: 'CUSTOMER',
  MANAGER: 'MANAGER',
  GUEST: 'GUEST',
};
const useCommonStore = create((set) => ({
  role: ROLE.GUEST, //기본값은 customer
  email: '',
  socialType: '',
  categories: [], // 음식 카테고리

  setRole: (value) => set(() => ({ role: value })),
  setEmail: (value) => set(() => ({ email: value })),
  setSocialType: (value) => set(() => ({ socialType: value })),
  setCategories: (categories) => set({ categories: categories }),
  getUserRole: async () => {
    const result = await getToken();
    if (result.status !== 200) return;
    console.log('result', result);
    const authToken = result.headers['authorization-wannaeat'];
    if (authToken) {
      // 로컬 스토리지에 저장
      localStorage.setItem('Authorization-wannaeat', authToken);

      const base64Payload = authToken.split('.')[1];
      console.log('Authorization-wannaeat token stored:', authToken);

      const base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/');
      const decodedJWT = JSON.parse(
        decodeURIComponent(
          window
            .atob(base64)
            .split('')
            .map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        )
      );

      set({ role: decodedJWT.role });
      set({ email: decodedJWT.email });
      set({ socialType: decodedJWT.socialType });

      return decodedJWT.role;
    } else {
      console.log('Authorization-wannaeat header not found');
    }
  },
}));

export default useCommonStore;
