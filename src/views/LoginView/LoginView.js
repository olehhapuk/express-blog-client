import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Container,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { LoginForm } from '../../components';
import { authOperations, authSelectors } from '../../redux/auth';

function LoginView() {
  const dispatch = useDispatch();

  function login(data) {
    dispatch(authOperations.login(data));
  }

  const authError = useSelector(authSelectors.getError);

  return (
    <Container>
      {authError && (
        <Alert status="error" borderRadius="lg">
          <AlertIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{authError}</AlertDescription>
        </Alert>
      )}

      <LoginForm onSubmit={login} />
    </Container>
  );
}

export default LoginView;
