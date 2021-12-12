import { Container } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { LoginForm } from '../../components';
import { authOperations } from '../../redux/auth';

function LoginView() {
  const dispatch = useDispatch();

  function login(data) {
    dispatch(authOperations.login(data));
  }

  return (
    <Container>
      <LoginForm onSubmit={login} />
    </Container>
  );
}

export default LoginView;
