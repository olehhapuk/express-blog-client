import { Container } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { RegisterForm } from '../../components';
import { authOperations } from '../../redux/auth';

function RegisterView() {
  const dispatch = useDispatch();

  function register(values) {
    dispatch(authOperations.register(values));
  }

  return (
    <div>
      <Container>
        <RegisterForm onSubmit={register} />
      </Container>
    </div>
  );
}

export default RegisterView;
