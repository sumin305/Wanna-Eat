import { create } from 'zustand';
import AlarmOff from '../../assets/icons/alarm-off.svg';
import AlarmOn from '../../assets/icons/alarm-on.svg';
import AlarmStack from '../../assets/icons/alarm-stack.svg';
import ZzimOff from '../../assets/icons/zzim-off.svg';
import ZzimOn from '../../assets/icons/zzim-on.svg';

const useHeaderStore = create((set) => ({
  isCarrot: true, // 기본탭바 배경색 기본은 주황색
  isExtraCarrot: false, // 서브탭바 배경색 기본은 흰색
  pageName: '', // 중간에 들어가는 페이지 이름
  isShowBackIcon: false, // 뒤로가기 버튼 유무
  isShowLogo: false, // 로고 유무
  icons: [AlarmOff, AlarmOn, AlarmStack, ZzimOff, ZzimOn], // 헤더 오른쪽에 들어갈 아이콘들
  activeIcons: [],
  isShowExtraHeader: false, // 서브탭바 유무
  extraHeaderText: '', // 서브탭바의 텍스트
  setIsCarrot: (isCarrot) => set({ isCarrot: isCarrot }),
  setPageName: (text) => set({ pageName: text }),
  setIsShowLogo: (isShowLogo) => set({ isShowLogo: isShowLogo }),
  setActiveIcons: (icons) => set({ activeIcons: icons }),
  setIsShowBackIcon: (isShowBackIcon) =>
    set({ isShowBackIcon: isShowBackIcon }),
  setIsShowExtraHeader: (isShowExtraHeader) =>
    set({ isShowExtraHeader: isShowExtraHeader }),
  setExtraHeaderText: (text) => set({ extraHeaderText: text }),
}));

export default useHeaderStore;
