import { HashRouter } from 'react-router-dom';

import { AppRouter } from './router';

export const CalendarApp = () => {
  return (
    <HashRouter>
      <AppRouter />
    </HashRouter>
  );
};
