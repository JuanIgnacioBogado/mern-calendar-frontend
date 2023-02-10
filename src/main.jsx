import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { CalendarApp } from './CalendarApp';
import { store } from './store';

import './index.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CalendarApp />
  </Provider>
);
