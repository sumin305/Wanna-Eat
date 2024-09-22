import { create } from 'zustand';
import moment from 'moment';
const useTimeSelectStore = create((set) => ({
  isLunch: true,
  selectedDate: moment(new Date()).format('MM.DD'),
  selectedStartTime: '00:00',
  selectedEndTime: '00:00',
  selectedHeadCount: 0,
  selectedTimes: [],
  selectedSeatNumber: 0,
  lunchTimes: ['10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30'],
  dinnerTimes: ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'],
  setIsLunch: (isLunch) => set({ isLunch: isLunch }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedStartTime: (time) => set({ selectedStartTime: time }),
  setSelectedEndTime: (time) => set({ selectedEndTime: time }),
  setSelectedHeadCount: (count) => set({ selectedHeadCount: count }),
  setLunchTimes: (times) => set({ lunchTimes: times }),
  setDinnerTimes: (times) => set({ dinnerTimes: times }),
  setSelectedTimes: (times) => set({ selectedTimes: times }),
  setSelectedSeatNumber: (num) => set({selectedSeatNumber: num})
}));

export default useTimeSelectStore;
