import { uiSlice } from '../../../src/store/ui/uiSlice';

const { onCloseDateModal, onOpenDateModal, setIsLoading } = uiSlice.actions;

describe('uiSlice', () => {
  test('should to return default state', () => {
    expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();
    expect(uiSlice.getInitialState().isLoading).toBeFalsy();
  });

  test('should to change isDateModalOpen and onCloseDateModal correctly', () => {
    let state = uiSlice.getInitialState();

    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBeTruthy();

    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBeFalsy();
  });

  test('should to change setIsLoading correctly', () => {
    let state = uiSlice.getInitialState();

    state = uiSlice.reducer(state, setIsLoading(true));
    expect(state.isLoading).toBeTruthy();

    state = uiSlice.reducer(state, setIsLoading(false));
    expect(state.isLoading).toBeFalsy();
  });
});
