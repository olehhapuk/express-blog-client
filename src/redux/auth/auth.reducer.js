import { createReducer } from '@reduxjs/toolkit';
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authActions as actions } from './';

const tokenReducer = createReducer(null, {
  [actions.loginSuccess]: (_, { payload }) => payload.token,
  [actions.registerSuccess]: (_, { payload }) => payload.token,
  [actions.fetchUserDataError]: () => null,
  [actions.logout]: () => null,
});

const userReducer = createReducer(null, {
  [actions.loginSuccess]: (_, { payload }) => payload.user,
  [actions.registerSuccess]: (_, { payload }) => payload.user,
  [actions.fetchUserDataSuccess]: (_, { payload }) => payload,
  [actions.logout]: () => null,
});

const loadingReducer = createReducer(false, {
  // Fetch user data
  [actions.fetchUserDataRequest]: () => true,
  [actions.fetchUserDataSuccess]: () => false,
  [actions.fetchUserDataError]: () => false,
  // Login
  [actions.loginRequest]: () => true,
  [actions.loginSuccess]: () => false,
  [actions.loginError]: () => false,
  // Register
  [actions.registerRequest]: () => true,
  [actions.registerSuccess]: () => false,
  [actions.registerError]: () => false,
});

const errorReducer = createReducer(null, {
  [actions.fetchUserDataError]: (_, { payload }) => payload,
  [actions.fetchUserDataRequest]: () => null,
  [actions.loginError]: (_, { payload }) => payload,
  [actions.loginRequest]: () => null,
});

export default persistCombineReducers(
  {
    key: 'auth',
    storage,
    whitelist: ['token', 'user'],
  },
  {
    token: tokenReducer,
    user: userReducer,
    loading: loadingReducer,
    error: errorReducer,
  }
);
