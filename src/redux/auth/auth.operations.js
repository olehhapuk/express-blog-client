import axios from 'axios';

import { authActions as actions, authSelectors as selectors } from './';

function setToken(token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

function clearToken() {
  axios.defaults.headers.common.Authorization = null;
}

export const login = (data) => (dispatch) => {
  dispatch(actions.loginRequest());

  axios({
    method: 'POST',
    url: '/auth/login',
    data,
  })
    .then((res) => {
      setToken(res.data.token);
      dispatch(actions.loginSuccess(res.data));
    })
    .catch((error) => {
      dispatch(actions.loginError(error.message));
    });
};

export const register = (data) => (dispatch) => {
  dispatch(actions.registerRequest());

  axios({
    method: 'POST',
    url: '/auth/register',
    data,
  })
    .then((res) => {
      setToken(res.data.token);
      dispatch(actions.registerSuccess(res.data));
    })
    .catch((error) => {
      dispatch(actions.registerError(error.message));
    });
};

export const fetchUserData = () => (dispatch, getState) => {
  const token = selectors.getToken(getState());
  if (!token) {
    return;
  }

  setToken(token);

  dispatch(actions.fetchUserDataRequest());

  axios({
    method: 'GET',
    url: '/auth/me',
  })
    .then((res) => {
      dispatch(actions.fetchUserDataSuccess(res.data));
    })
    .catch((error) => {
      clearToken();
      dispatch(actions.fetchUserDataError(error.response.data.message));
    });
};
