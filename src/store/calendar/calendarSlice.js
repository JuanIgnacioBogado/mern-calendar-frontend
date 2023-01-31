import { createSlice } from '@reduxjs/toolkit';
import addHours from 'date-fns/addHours';

const tempEvent = {
  _id: crypto.randomUUID(),
  title: 'Cumple del jefe',
  notes: 'hay que comprar la torta',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Nacho'
  }
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [tempEvent],
    activeEvent: null
  },
  reducers: {
    setActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    addNewEvent: (state, { payload }) => {
      state.events.push(payload);
    },
    updateEvent: (state, { payload }) => {
      state.events = state.events.map(event => (event._id === payload._id ? payload : event));
    },
    deleteEvent: (state, { payload }) => {
      state.events = state.events.filter(({ _id }) => _id !== payload);
    }
  }
});

// export const { increment } = calendarSlice.actions;
