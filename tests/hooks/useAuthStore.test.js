/**
 * @jest-environment-options {"url": "http://localhost:5173"}
 */
import { renderHook, act, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { useAuthStore } from '../../src/hooks';
import { authSlice } from '../../src/store';
import { calendarApi } from '../../src/api';
import { authenticatedState, initialAuthState, notAuthenticatedState, testUserCredentials } from '../fixtures';

const getMockStore = (initialState = {}) =>
  configureStore({
    reducer: {
      auth: authSlice.reducer
    },
    preloadedState: {
      auth: { ...initialState }
    }
  });

describe('useAuthStore', () => {
  beforeEach(() => localStorage.clear());

  test('should to show initial state', () => {
    const store = getMockStore(initialAuthState);

    const {
      result: { current }
    } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    });

    expect(current).toEqual({
      ...initialAuthState,
      isAuthenticated: false,
      isChecking: false,
      checkAuthToken: expect.any(Function),
      showErrorMessage: expect.any(Function),
      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      startRegister: expect.any(Function)
    });
  });

  test('startLogin should to realize login correctly', async () => {
    const store = getMockStore(notAuthenticatedState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    });

    await act(() => result.current.startLogin(testUserCredentials));

    expect(localStorage.getItem('token')).toBeTruthy();
    expect(localStorage.getItem('token-init-date')).toBeTruthy();

    const { status, errorMessage, isAuthenticated, user } = result.current;

    expect({ status, errorMessage, isAuthenticated, user }).toEqual({
      ...authenticatedState,
      isAuthenticated: true,
      user: {
        name: 'Test User',
        uid: '63ea5e49327327fe54110f67'
      }
    });
  });

  test('startLogin should to fail the login', async () => {
    const store = getMockStore(notAuthenticatedState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    });

    await act(() => result.current.startLogin({ email: 'nacho@nacho.com', password: '123456' }));

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('token-init-date')).toBeNull();

    const { status, errorMessage, isAuthenticated, user } = result.current;

    expect({ status, errorMessage, isAuthenticated, user }).toEqual({
      ...notAuthenticatedState,
      errorMessage: 'Credenciales Incorrectas',
      isAuthenticated: false
    });

    await waitFor(() => expect(result.current.errorMessage).toBeNull());
  });

  test('startRegister should to create user', async () => {
    const store = getMockStore(notAuthenticatedState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    });

    const newUser = {
      name: 'Nacho',
      email: 'nacho@nacho.com',
      password: '123456'
    };

    const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
      data: {
        ok: true,
        name: 'someName',
        uid: 'someUID',
        token: 'someToken'
      }
    });

    await act(() => result.current.startRegister(newUser));

    expect(localStorage.getItem('token')).toBeTruthy();
    expect(localStorage.getItem('token-init-date')).toBeTruthy();

    const { status, errorMessage, isAuthenticated, user } = result.current;

    expect({ status, errorMessage, isAuthenticated, user }).toEqual({
      ...authenticatedState,
      isAuthenticated: true,
      user: {
        uid: 'someUID',
        name: 'someName'
      }
    });

    spy.mockRestore();
  });

  test('startRegister should to fail the create user', async () => {
    const store = getMockStore(notAuthenticatedState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    });

    await act(() => result.current.startRegister(testUserCredentials));

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('token-init-date')).toBeNull();

    const { status, errorMessage, isAuthenticated, user } = result.current;

    expect({ status, errorMessage, isAuthenticated, user }).toEqual({
      ...notAuthenticatedState,
      errorMessage: 'Ya existe un usuario con ese email',
      isAuthenticated: false
    });

    await waitFor(() => expect(result.current.errorMessage).toBeNull());
  });

  test('checkAuthToken should to fail if there is no token', async () => {
    const store = getMockStore(initialAuthState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    });

    await act(() => result.current.checkAuthToken());

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('token-init-date')).toBeNull();

    const { status, errorMessage, isAuthenticated, user } = result.current;

    expect({ status, errorMessage, isAuthenticated, user }).toEqual({
      ...notAuthenticatedState,
      isAuthenticated: false
    });
  });

  test('checkAuthToken should authenticate the user if there is a token', async () => {
    const store = getMockStore(initialAuthState);

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    });

    const { token } = (await calendarApi.post('/auth', testUserCredentials)).data;

    localStorage.setItem('token', token);

    await act(() => result.current.checkAuthToken());

    expect(localStorage.getItem('token')).toBeTruthy();
    expect(localStorage.getItem('token-init-date')).toBeTruthy();

    const { status, errorMessage, isAuthenticated, user } = result.current;

    expect({ status, errorMessage, isAuthenticated, user }).toEqual({
      ...authenticatedState,
      isAuthenticated: true,
      user: {
        name: 'Test User',
        uid: '63ea5e49327327fe54110f67'
      }
    });
  });
});
