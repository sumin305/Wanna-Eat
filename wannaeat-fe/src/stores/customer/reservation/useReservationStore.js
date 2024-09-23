import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import moment from 'moment';
const useReservationStore = create(
  persist(
    (set) => ({
      isLunch: true,
      selectedDate: moment(new Date()).format('YYYY-MM-DD'),
      selectedStartTime: '00:00',
      selectedEndTime: '00:00',
      selectedHeadCount: 0,
      selectedTimes: [],
      lunchTimes: [
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
      ],
      dinnerTimes: [
        '18:00',
        '18:30',
        '19:00',
        '19:30',
        '20:00',
        '20:30',
        '21:00',
      ],
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
      selectedCategory: null, // 선택한 카테고리
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
    }),
    {
      name: 'reservation-storage', // 로컬스토리지 키 이름
      storage: localStorage, // 상태를 로컬스토리지에 저장
    }
  )
);

export default useReservationStore;
