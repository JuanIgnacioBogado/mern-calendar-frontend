import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDateModalOpen: false,
    isLoading: false
  },
  reducers: {
    onOpenDateModal: state => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: state => {
      state.isDateModalOpen = false;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    }
  }
});
