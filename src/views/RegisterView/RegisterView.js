import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Container,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { RegisterForm } from '../../components';
import { authOperations, authSelectors } from '../../redux/auth';

function RegisterView() {
  const dispatch = useDispatch();

  function register(values) {
    dispatch(authOperations.register(values));
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

      <RegisterForm onSubmit={register} />
    </Container>
  );
}

export default RegisterView;
