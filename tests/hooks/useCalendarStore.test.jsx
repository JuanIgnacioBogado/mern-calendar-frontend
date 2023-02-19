import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { useCalendarStore } from '../../src/hooks';
import { authSlice, calendarSlice, uiSlice } from '../../src/store';

const getMockStore = (initialState = {}) =>
  configureStore({
    reducer: {
      auth: authSlice.reducer,
      calendar: calendarSlice.reducer,
      ui: uiSlice.reducer
    },
    preloadedState: {
      ui: { ...initialState }
    }
  });

describe('useCalendarStore', () => {
  test('should to show initial state', () => {
    const store = getMockStore({ isDateModalOpen: false });

    const {
      result: { current }
    } = renderHook(() => useCalendarStore(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    });

    expect(current).toEqual({
      events: [],
      activeEvent: null,
      isDateModalOpen: false,
      onOpenDateModal: expect.any(Function),
      onCloseDateModal: expect.any(Function),
      setActiveEvent: expect.any(Function),
      startDeleteEvent: expect.any(Function),
      startGetEvents: expect.any(Function),
      startNewEvent: expect.any(Function),
      startUpdateEvent: expect.any(Function)
    });
  });

  test('onOpenDateModal should to change in true the isDateModalOpen', () => {
    const store = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook(() => useCalendarStore(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    });

    act(() => result.current.onOpenDateModal());
    expect(result.current.isDateModalOpen).toBeTruthy();
  });

  test('onCloseDateModal should to change in false the isDateModalOpen', () => {
    const store = getMockStore({ isDateModalOpen: true });

    const { result } = renderHook(() => useCalendarStore(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    });

    act(() => result.current.onCloseDateModal());
    expect(result.current.isDateModalOpen).toBeFalsy();
  });
});
