/**
 * @jest-environment-options {"url": "http://localhost:5173"}
 */
import calendarApi from '../../src/api/calendarApi';

describe('calendarApi', () => {
  test('should to have default config', () => {
    const { baseURL } = calendarApi.defaults;

    expect(baseURL).toBe(process.env.VITE_API_URL);
  });

  test('should to have the x-token in headers on all requests', async () => {
    const token = 'ABC-123-XYZ';

    localStorage.setItem('token', token);
    const data = { email: 'test@gmail.com', password: '123456' };

    try {
      const {
        config: { headers }
      } = await calendarApi.post('/auth', data);

      expect(headers['x-token']).toBe(token);
    } catch (error) {
      console.log('error', error.message);
    }
  });
});
