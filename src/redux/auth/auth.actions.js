import { createAction } from '@reduxjs/toolkit';

export const loginRequest = createAction('auth/loginRequest');
export const loginSuccess = createAction('auth/loginSuccess');
export const loginError = createAction('auth/loginError');

export const registerRequest = createAction('auth/registerRequest');
export const registerSuccess = createAction('auth/registerSuccess');
export const registerError = createAction('auth/registerError');

export const fetchUserDataRequest = createAction('auth/fetchUserDataRequest');
export const fetchUserDataSuccess = createAction('auth/fetchUserDataSuccess');
export const fetchUserDataError = createAction('auth/fetchUserDataError');

export const logout = createAction('auth/logout');
