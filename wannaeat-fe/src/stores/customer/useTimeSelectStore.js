import { create } from 'zustand';

const useTimeSelectStore = create((set) => ({
  selectedDate: '09.06',
  selectedStartTime: '19:00',
  selectedEndTime: '20:00',
  selectedHeadCount: 2,
  lunchTimes: ['10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30'],
  dinnerTimes: ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '12:00'],
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedStartTime: (time) => set({ selectedStartTime: time }),
  setSelectedEndTime: (time) => set({ selectedEndTime: time }),
  setSelectedHeadCount: (count) => set({ selectedHeadCount: count }),
  setLunchTimes: (times) => set({ lunchTimes: times }),
  setDinnerTimes: (times) => set({ dinnerTimes: times }),
}));

export default useTimeSelectStore;
