import { create } from 'zustand';
import AlarmOff from 'assets/icons/header/alarm-off.svg';
import AlarmOn from 'assets/icons/header/alarm-on.svg';
import AlarmStack from 'assets/icons/header/alarm-stack.svg';
import AlarmOffWhite from 'assets/icons/header/alarm-off-white.svg';
import AlarmOnWhite from 'assets/icons/header/alarm-on-white.svg';
import AlarmStackWhite from 'assets/icons/header/alarm-stack-white.svg';
import ZzimOff from 'assets/icons/header/zzim-off.svg';
import ZzimOn from 'assets/icons/header/zzim-on.svg';

const icons = [
  AlarmOff,
  AlarmOn,
  AlarmStack,
  AlarmOffWhite,
  AlarmOnWhite,
  AlarmStackWhite,
  ZzimOff,
  ZzimOn,
];

const useHeaderStore = create((set) => ({
  isCarrot: true, // 기본탭바 배경색 기본은 주황색
  isExtraCarrot: false, // 서브탭바 배경색 기본은 흰색
  pageName: '', // 중간에 들어가는 페이지 이름
  isShowBackIcon: false, // 뒤로가기 버튼 유무
  isShowLogo: false, // 로고 유무
  activeIcons: [],
  isShowExtraHeader: false, // 서브탭바 유무
  extraHeaderText: '', // 서브탭바의 텍스트
  isUnderLine: false, // 밑줄 유무
  iconAction: [() => {}], // iconAction array
  setIsCarrot: (isCarrot) => set({ isCarrot: isCarrot }),
  setPageName: (text) => set({ pageName: text }),
  setIsShowLogo: (isShowLogo) => set({ isShowLogo: isShowLogo }),
  setActiveIcons: (iconIndexs) => {
    // 배열인지 확인한 후 처리
    if (Array.isArray(iconIndexs)) {
      set({ activeIcons: iconIndexs.map((index) => icons[index]) });
    } else {
      console.error('iconIndexs is not an array', iconIndexs);
    }
  },
  setIsShowBackIcon: (isShowBackIcon) =>
    set({ isShowBackIcon: isShowBackIcon }),
  setIsShowExtraHeader: (isShowExtraHeader) =>
    set({ isShowExtraHeader: isShowExtraHeader }),
  setExtraHeaderText: (text) => set({ extraHeaderText: text }),
  setIsUnderLine: (isUnderLine) => set({ isUnderLine: isUnderLine }),
  setIconAction: (actions) => set({ iconAction: actions }),
}));

export default useHeaderStore;
