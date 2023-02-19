export const CalendarEvent = ({ event: { title = '', user } }) => (
  <>
    <strong>{title}</strong>
    <span> - {user?.name}</span>
  </>
);
