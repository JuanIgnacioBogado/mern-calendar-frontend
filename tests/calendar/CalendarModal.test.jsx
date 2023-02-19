import { render, screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { CalendarModal } from '../../src/calendar/components/CalendarModal';
import { uiSlice } from '../../src/store';
import { calendarWithActiveEventState, events } from '../fixtures/calendarStates';
import { useCalendarStore } from '../../src/hooks/useCalendarStore';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer
  }
});

jest.mock('../../src/hooks/useCalendarStore');

describe('CalendarModal', () => {
  const mockStartDeleteEvent = jest.fn();
  const mockOnCloseDateModal = jest.fn();

  useCalendarStore.mockReturnValue({
    ...calendarWithActiveEventState,
    isDateModalOpen: true,
    startDeleteEvent: mockStartDeleteEvent,
    onCloseDateModal: mockOnCloseDateModal
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should to show the component correctly', () => {
    render(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    );

    const btnDelete = screen.getByRole('button', { name: /borrar/i });

    fireEvent.click(btnDelete);

    expect(mockStartDeleteEvent).toBeCalledWith(events[0].id);
    expect(mockOnCloseDateModal).toBeCalled();
  });
});
