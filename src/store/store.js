import { configureStore } from '@reduxjs/toolkit';

import { calendarSlice, uiSlice, authSlice } from './';

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  }),
  reducer: {
    auth: authSlice.reducer,
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer
  }
});

export const actions = {
  ...authSlice.actions,
  ...calendarSlice.actions,
  ...uiSlice.actions
};
