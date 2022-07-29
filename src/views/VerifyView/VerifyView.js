import { useState } from 'react';
import {
  Container,
  Button,
  Stack,
  PinInput,
  PinInputField,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { urls } from '../../constants/urls';
import { authOperations } from '../../redux/auth';

function VerifyView() {
  const [code, setCode] = useState('');
  const [validationError, setValidationError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();

  function verify(e) {
    e.preventDefault();

    const codeTest = new RegExp(/^[0-9]{5,5}$/);
    const valid = codeTest.test(code);
    setValidationError(valid ? null : 'Pattern should be m-000000');
    if (!valid) {
      return;
    }

    const authToken = `m-${code}`;

    setLoading(true);
    axios
      .get(`/auth/token/verificate/${authToken}`)
      .then((res) => {
        console.log(res);
        setSuccess(true);
        dispatch(authOperations.fetchUserData());
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setSuccess(false);
      })
      .finally(() => setLoading(false));
  }

  return (
    <Container maxWidth="container.md">
      <form onSubmit={verify}>
        <Stack alignItems="center">
          <Text fontSize="2xl" fontWeight="semibold">
            Enter your verification code
          </Text>
          <Stack direction="row">
            <Text fontSize="2xl">m-</Text>
            <PinInput
              type="text"
              autoComplete="off"
              name="verificationCode"
              value={code}
              onChange={setCode}
              required
              isInvalid={validationError}
            >
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </Stack>

          {error && !loading && !success && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Verification failed</AlertTitle>
              <AlertDescription>Check your code and try again</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert status="success">
              <AlertIcon />
              <AlertTitle>Verification completed</AlertTitle>
              <AlertDescription>
                Now you can fully experience Express Blog
              </AlertDescription>
            </Alert>
          )}

          {success ? (
            <Button as={Link} to={urls.home} type="button" colorScheme="blue">
              View posts
            </Button>
          ) : (
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={loading}
              disabled={loading}
              loadingText="Verifying"
            >
              Verify
            </Button>
          )}
        </Stack>
      </form>
    </Container>
  );
}

export default VerifyView;
