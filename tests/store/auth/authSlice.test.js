import { authSlice } from '../../../src/store/auth/authSlice';
import {
  authenticatedState,
  checkingState,
  initialAuthState,
  notAuthenticatedState,
  testUserCredentials
} from '../../fixtures';

const { onLogin, onLogout, onChecking, clearErrorMessage } = authSlice.actions;

describe('authSlice', () => {
  test('should to return default state', () => {
    expect(authSlice.getInitialState()).toEqual(initialAuthState);
  });

  test('should make a login', () => {
    let state = authSlice.reducer(initialAuthState, onLogin(testUserCredentials));

    expect(state).toEqual({
      ...authenticatedState,
      user: testUserCredentials
    });
  });

  test('should make the logout', () => {
    let state = authSlice.reducer(authenticatedState, onLogout());

    expect(state).toEqual(notAuthenticatedState);
  });

  test('should make the logout with errorMessage', () => {
    const errorMessage = 'error in login';
    let state = authSlice.reducer(initialAuthState, onLogout(errorMessage));

    expect(state).toEqual({
      ...notAuthenticatedState,
      errorMessage
    });
  });

  test('should make the checking', () => {
    let state = authSlice.reducer(initialAuthState, onChecking());

    expect(state).toEqual(checkingState);
  });

  test('should to clear errorMessage', () => {
    const errorMessage = 'error in login';
    let state = authSlice.reducer(initialAuthState, onLogout(errorMessage));

    state = authSlice.reducer(initialAuthState, clearErrorMessage());

    expect(state.errorMessage).toBeNull();
  });
});
