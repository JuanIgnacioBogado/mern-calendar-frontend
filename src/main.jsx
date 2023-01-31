// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { CalendarApp } from './CalendarApp';
import { store } from './store';

import './index.css';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <CalendarApp />
  </Provider>
  // </StrictMode>
);
