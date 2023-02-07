import { calendarApi } from '../api';
import { useSelectorStore } from './';

import parseISO from 'date-fns/parseISO';

const parseEvent = ({ start, end, ...event }) => ({ start: parseISO(start), end: parseISO(end), ...event });
const parseUser = (_id, name) => ({ user: { _id, name } });

export const useCalendarStore = () => {
  const {
    auth: {
      user: { uid, name }
    },
    addNewEvent,
    calendar,
    deleteEvent,
    onOpenDateModal,
    onCloseDateModal,
    setActiveEvent,
    setEvents,
    setIsLoading,
    ui,
    updateEvent
  } = useSelectorStore();

  const startGetEvents = async () => {
    setIsLoading(true);
    try {
      const { events } = (await calendarApi.get('/events')).data;
      setEvents(events.map(parseEvent));
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewEvent = async newEvent => {
    setIsLoading(true);
    try {
      const { event } = (await calendarApi.post('/events', newEvent)).data;
      addNewEvent({
        ...parseEvent(event),
        ...parseUser(uid, name)
      });
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startUpdateEvent = async ({ id, ...updatedEvent }) => {
    setIsLoading(true);
    try {
      const { event } = (await calendarApi.put(`/events/${id}`, updatedEvent)).data;
      updateEvent({
        ...parseEvent(event),
        ...parseUser(uid, name)
      });
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startDeleteEvent = async id => {
    setIsLoading(true);
    try {
      await calendarApi.delete(`/events/${id}`);
      deleteEvent(id);
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    ...calendar,
    ...ui,
    onOpenDateModal,
    onCloseDateModal,
    setActiveEvent,
    startDeleteEvent,
    startGetEvents,
    startNewEvent,
    startUpdateEvent
  };
};
