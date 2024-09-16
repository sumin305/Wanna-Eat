import { create } from 'zustand';
import AlarmOff from '../../assets/icons/alarm-off.svg';
import AlarmOn from '../../assets/icons/alarm-on.svg';
import AlarmStack from '../../assets/icons/alarm-stack.svg';
import ZzimOff from '../../assets/icons/zzim-off.svg';
import ZzimOn from '../../assets/icons/zzim-on.svg';

const useHeaderStore = create((set) => ({
  isCarrot: true, // 기본값은 주황색
  pageName: '', // 중간에 들어가는 페이지 이름
  isShowBackIcon: false, // 뒤로가기 버튼 유무
  isShowLogo: false, // 로고 유무
  icons: [AlarmOff, AlarmOn, AlarmStack, ZzimOff, ZzimOn], // 헤더 오른쪽에 들어갈 아이콘들
  activeIcons: [],
  setIsCarrot: (isCarrot) => set({ isCarrot: isCarrot }),
  setPageName: (text) => set({ pageName: text }),
  setIsShowLogo: (isShowLogo) => set({ isShowLogo: isShowLogo }),
  setActiveIcons: (icons) => set({ activeIcons: icons }),
  setIsShowBackIcon: (isShowBackIcon) =>
    set({ isShowBackIcon: isShowBackIcon }),
}));
export default useHeaderStore;
