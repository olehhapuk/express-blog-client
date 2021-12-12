import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { authSelectors } from '../redux/auth';
import { urls } from '../constants/urls';

export function AuthRequired({ children }) {
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);
  return isAuthenticated ? children : <Navigate to={urls.login} />;
}

export function PublicOnly({ children }) {
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);
  return isAuthenticated ? <Navigate to={urls.home} /> : children;
}
