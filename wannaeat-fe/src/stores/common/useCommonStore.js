import { create } from 'zustand';
import { getToken } from 'api/common/login';
import { signUp } from 'api/common/join';
import { decodeJWT } from 'utils/decode-token';
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
  fcmToken: '',
  setRole: (value) => set(() => ({ role: value })),
  setEmail: (value) => set(() => ({ email: value })),
  setSocialType: (value) => set(() => ({ socialType: value })),
  setCategories: (categories) => set({ categories: categories }),
  setFcmToken: (token) => set({ fcmToken: token }),

  getUserInfo: async () => {
    // refresh -> access 재발급
    const result = await getToken();
    console.log(result);
    if (result.status !== 200) {
      console.log(result);
      return;
    }
    // 헤더의 토큰 받아온다
    const authToken = result.headers['authorization-wannaeat'];
    if (authToken) {
      // JWT 토큰 decode
      const decodedJWT = decodeJWT(authToken);
      localStorage.setItem('role', decodedJWT.role);
      return decodedJWT;
    } else {
      console.log('Authorization-wannaeat header not found');
    }
  },

  getUserRole: async () => {
    // refresh -> access 재발급
    return localStorage.getItem('role');
  },

  requestSignUp: async (requestUserInfo) => {
    const result = await signUp(requestUserInfo);
    return result;
  },
}));

export default useCommonStore;
