import { create } from 'zustand';
import moment from 'moment';
const useReservationStore = create((set) => ({
  isLunch: true,
  selectedDate: new Date(), // 현재 날짜 및 시간으로 초기화
  selectedStartTime: '',
  selectedEndTime: '',
  selectedHeadCount: '',
  selectedTimes: [],
  lunchTimes: ['10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30'],
  dinnerTimes: ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'],
  durationTimes: [
    '30분',
    '1시간',
    '1시간 30분',
    '2시간',
    '2시간 30분',
    '3시간',
    '3시간 30분',
    '4시간',
  ],
  selectedDurationTime: '', // 머무는 시간
  selectedCategory: '', // 선택한 카테고리
  setIsLunch: (isLunch) => set({ isLunch: isLunch }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedStartTime: (time) => set({ selectedStartTime: time }),
  setSelectedEndTime: (time) => set({ selectedEndTime: time }),
  setSelectedHeadCount: (count) => set({ selectedHeadCount: count }),
  setLunchTimes: (times) => set({ lunchTimes: times }),
  setDinnerTimes: (times) => set({ dinnerTimes: times }),
  setSelectedTimes: (times) => set({ selectedTimes: times }),
  setSelectedDurationTime: (times) => set({ selectedDurationTime: times }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));

export default useReservationStore;
