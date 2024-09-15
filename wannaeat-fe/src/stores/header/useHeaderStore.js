import { create } from 'zustand';
import AlarmOff from '../../assets/icons/alarm-off.svg';
import AlarmOn from '../../assets/icons/alarm-on.svg';
import AlarmStack from '../../assets/icons/alarm-stack.svg';
import ZzimOff from '../../assets/icons/zzim-off.svg';
import ZzimOn from '../../assets/icons/zzim-on.svg';

const useHeaderStore = create((set) => ({
  themeColor: 'theme.color.primary', // 기본값은 주황색
  height: '4rem',
  pageName: '',
  isShowBackIcon: true, // 뒤로가기는 기본적으로 있음
  isShowLogo: false, // 로고는 기본적으로 없음
  icons: [AlarmOff, AlarmOn, AlarmStack, ZzimOff, ZzimOn],
  activeIcons: [],
  isShowIcon: true, // 아이콘은 기본으로 있음
  setThemeColor: (color) => set({ themeColor: color }),
  setPageName: (text) => set({ pageName: text }),
  setIsShowLogo: (isShowLogo) => set({ isShowLogo: isShowLogo }),
  setActiveIcons: (icons) => set({ activeIcons: icons }),
  setIsBackIcon: (isBackIcon) => set({ isBackIcon: isBackIcon }),
  setIsShowIcon: (isShowIcon) => set({ isShowIcon: isShowIcon }),
}));
export default useHeaderStore;
