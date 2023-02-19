import { render, screen, fireEvent } from '@testing-library/react';

import { CalendarModal } from '../../src/calendar/components/CalendarModal';
import { calendarWithActiveEventState, events } from '../fixtures/calendarStates';
import { useCalendarStore } from '../../src/hooks/useCalendarStore';

jest.mock('../../src/hooks/useCalendarStore');

describe('CalendarModal', () => {
  const mockStartDeleteEvent = jest.fn();
  const mockOnCloseDateModal = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('should to show the component correctly and to do delete event', () => {
    useCalendarStore.mockReturnValue({
      ...calendarWithActiveEventState,
      isDateModalOpen: true,
      startDeleteEvent: mockStartDeleteEvent,
      onCloseDateModal: mockOnCloseDateModal
    });

    render(<CalendarModal />);

    const btnDelete = screen.getByRole('button', { name: /borrar/i });

    expect(btnDelete.classList).toContain('btn');
    expect(btnDelete.classList).toContain('btn-outline-danger');
    expect(btnDelete.classList).toContain('w-100');

    fireEvent.click(btnDelete);

    expect(mockStartDeleteEvent).toBeCalledWith(events[0].id);
    expect(mockOnCloseDateModal).toBeCalled();
  });
});
