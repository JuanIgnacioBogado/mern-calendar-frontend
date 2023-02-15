import { calendarSlice } from '../../../src/store/calendar/calendarSlice';
import { calendarWithActiveEventState, calendarWithEventsState, events, initialCalendarState } from '../../fixtures';

const { setActiveEvent, addNewEvent, updateEvent, deleteEvent, setEvents, clearCalendar } = calendarSlice.actions;

describe('calendarSlice', () => {
  test('should to return default state', () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialCalendarState);
  });

  test('should to activate event - setActiveEvent', () => {
    const state = calendarSlice.reducer(calendarWithEventsState, setActiveEvent(events[0]));
    expect(state).toEqual(calendarWithActiveEventState);
  });

  test('should to add the event - addNewEvent', () => {
    const newEvent = {
      id: '3',
      start: new Date('2023-02-14 10:00:00'),
      end: new Date('2023-02-14 12:00:00'),
      title: 'title test 3',
      notes: 'notes test 3'
    };

    const state = calendarSlice.reducer(initialCalendarState, addNewEvent(newEvent));
    expect(state.events).toEqual([newEvent]);
  });

  test('should to update the event - updateEvent', () => {
    const eventUpdated = {
      id: '1',
      start: new Date('2023-02-14 10:00:00'),
      end: new Date('2023-02-14 12:00:00'),
      title: 'title updated',
      notes: 'notes updated'
    };

    const state = calendarSlice.reducer(calendarWithActiveEventState, updateEvent(eventUpdated));
    expect(state.events).toContain(eventUpdated);
  });

  test('should to delete the active event - deleteEvent', () => {
    const state = calendarSlice.reducer(calendarWithActiveEventState, deleteEvent('1'));
    expect(state.events).not.toContain(events[0]);
  });

  test('should to load the events - setEvents', () => {
    const state = calendarSlice.reducer(initialCalendarState, setEvents(events));
    expect(state).toEqual(calendarWithEventsState);
  });

  test('should to clear the events in the calendar - clearCalendar', () => {
    const state = calendarSlice.reducer(calendarWithActiveEventState, clearCalendar());
    expect(state).toEqual(initialCalendarState);
  });
});
