export const CalendarEvent = ({ event: { title = '', user } }) => {
  return (
    <>
      <strong>{title}</strong>
      <span> - {user?.name}</span>
    </>
  );
};
