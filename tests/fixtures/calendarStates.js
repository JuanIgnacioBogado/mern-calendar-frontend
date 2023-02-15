export const events = [
  {
    id: '1',
    start: new Date('2023-02-14 12:00:00'),
    end: new Date('2023-02-14 14:00:00'),
    title: 'title test',
    notes: 'notes test'
  },
  {
    id: '2',
    start: new Date('2023-02-13 12:00:00'),
    end: new Date('2023-02-13 14:00:00'),
    title: 'title test 2',
    notes: 'notes test 2'
  }
];

export const initialCalendarState = {
  events: [],
  activeEvent: null
};

export const calendarWithEventsState = {
  events: [...events],
  activeEvent: null
};

export const calendarWithActiveEventState = {
  events: [...events],
  activeEvent: events[0]
};
