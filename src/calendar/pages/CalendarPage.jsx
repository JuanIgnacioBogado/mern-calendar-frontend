import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { getMessagesES, localizer } from '../../helpers';

import { CalendarEvent, CalendarModal, FabAddNew, Navbar } from '../';

import { useSelectorStore } from '../../hooks';

const defaultView = localStorage.getItem('defaultView') || 'week';

export const CalendarPage = () => {
  const {
    onOpenDateModal,
    setActiveEvent,
    calendar: { events }
  } = useSelectorStore();

  const eventPropGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#347cf7',
      borderRadius: 0,
      opacity: 0.8,
      color: 'white'
    };
    return { style };
  };

  const onView = view => localStorage.setItem('defaultView', view);

  return (
    <>
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
        onDoubleClickEvent={onOpenDateModal}
        onSelectEvent={setActiveEvent}
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        components={{ event: CalendarEvent }}
      />

      <CalendarModal />
      <FabAddNew />
    </>
  );
};
