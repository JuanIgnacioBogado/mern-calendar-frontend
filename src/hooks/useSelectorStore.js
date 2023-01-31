import { useSelector } from 'react-redux';

import { useDispatchActions } from './';

export const useSelectorStore = () => {
  const actions = useDispatchActions();
  const state = useSelector(state => state);

  return { ...actions, ...state };
};
