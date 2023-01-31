import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { uiSlice } from '../store/ui';
import { calendarSlice } from '../store/calendar';

export const useDispatchActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators({ ...uiSlice.actions, ...calendarSlice.actions }, dispatch), []);
};
