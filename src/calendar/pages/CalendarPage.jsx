import { useEffect } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { getMessagesES, localizer } from '../../helpers';

import { CalendarEvent, CalendarModal, FabAddNew, Navbar } from '../';

import { useCalendarStore } from '../../hooks';

const defaultView = localStorage.getItem('defaultView') || 'week';

export const CalendarPage = () => {
  const { onOpenDateModal, setActiveEvent, events, startGetEvents } = useCalendarStore();

  const eventPropGetter = (event, start, end, isSelected) => ({
    style: {
      backgroundColor: '#347cf7',
      borderRadius: 0,
      opacity: 0.8,
      color: 'white'
    }
  });

  const onView = view => localStorage.setItem('defaultView', view);

  useEffect(() => {
    startGetEvents();
  }, []);

  return (
    <div className="animate__animated animate__fadeIn animate__faster">
      <Navbar />

      <Calendar
        {...{
          defaultView,
          eventPropGetter,
          events,
          localizer,
          onView
        }}
        culture="es"
        startAccessor="start"
        endAccessor="end"
        onDoubleClickEvent={() => onOpenDateModal()}
        onSelectEvent={setActiveEvent}
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        components={{ event: CalendarEvent }}
      />

      <CalendarModal />
      <FabAddNew />
    </div>
  );
};
