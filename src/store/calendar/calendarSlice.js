import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [],
    activeEvent: null
  },
  reducers: {
    setEvents: (state, { payload }) => {
      state.events = payload;
    },
    setActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    addNewEvent: (state, { payload }) => {
      state.events.push(payload);
    },
    updateEvent: (state, { payload }) => {
      state.events = state.events.map(event => (event.id === payload.id ? payload : event));
    },
    deleteEvent: (state, { payload }) => {
      state.events = state.events.filter(({ id }) => id !== payload);
    },
    clearCalendar: state => {
      state.events = [];
      state.activeEvent = null;
    }
  }
});
