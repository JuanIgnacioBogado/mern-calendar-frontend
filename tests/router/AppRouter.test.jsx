import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AppRouter } from '../../src/router';
import { useAuthStore } from '../../src/hooks/useAuthStore';

jest.mock('../../src/hooks/useAuthStore');
jest.mock('../../src/calendar/pages/CalendarPage', () => ({
  CalendarPage: () => <h1>Calendar Page</h1>
}));

describe('AppRouter', () => {
  const mockCheckAuthToken = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('should to show loading screen and call checkAuthToken', () => {
    useAuthStore.mockReturnValue({
      isChecking: true,
      checkAuthToken: mockCheckAuthToken
    });

    render(<AppRouter />);

    expect(screen.getByText(/loading/i)).toBeTruthy();
    expect(mockCheckAuthToken).toBeCalled();
  });

  test('should to show login screen if are not authenticated', () => {
    useAuthStore.mockReturnValue({
      isChecking: false,
      isAuthenticated: false,
      checkAuthToken: mockCheckAuthToken
    });

    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
    expect(screen.getByText(/ingreso/i)).toBeTruthy();
    expect(screen.getByText(/registro/i)).toBeTruthy();
    expect(mockCheckAuthToken).toBeCalled();
  });

  test('should to show calendar screen if are authenticated', () => {
    useAuthStore.mockReturnValue({
      isChecking: false,
      isAuthenticated: true,
      checkAuthToken: mockCheckAuthToken
    });

    render(
      <MemoryRouter initialEntries={['/auth/login']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(mockCheckAuthToken).toBeCalled();
    expect(screen.getByText(/calendar page/i)).toBeTruthy();
  });
});
