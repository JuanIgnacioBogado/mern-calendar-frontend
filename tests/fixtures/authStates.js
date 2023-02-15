export const initialAuthState = {
  status: 'not-authenticated', // authenticated, not-authenticated, checking
  user: {},
  errorMessage: null
};

export const authenticatedState = {
  status: 'authenticated', // authenticated, not-authenticated, checking
  user: {
    name: 'Nacho',
    uid: 'ABC123'
  },
  errorMessage: null
};

export const notAuthenticatedState = {
  status: 'not-authenticated', // authenticated, not-authenticated, checking
  user: {},
  errorMessage: null
};

export const checkingState = {
  status: 'checking', // authenticated, not-authenticated, checking
  user: {},
  errorMessage: null
};
