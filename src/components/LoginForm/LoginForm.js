import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Stack,
  Heading,
  FormControl,
  FormHelperText,
  useBoolean,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { authSelectors } from '../../redux/auth';

const validationSchema = Yup.object().shape({
  username: Yup.string().min(2).required(),
  password: Yup.string().min(6).required(),
});

function LoginForm({ onSubmit }) {
  const formik = useFormik({
    validationSchema,
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit,
    validateOnChange: true,
  });

  const [showPassword, setShowPassword] = useBoolean();

  const loading = useSelector(authSelectors.getLoading);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Heading mb={5} textAlign="center">
        Login
      </Heading>

      <Stack spacing={3}>
        <FormControl
          isInvalid={formik.errors.username && formik.touched.username}
          isRequired
        >
          <Input
            type="text"
            autoComplete="off"
            placeholder="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.errors.username && formik.touched.username && (
            <FormHelperText>{formik.errors.username}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          isInvalid={formik.errors.password && formik.touched.password}
          isRequired
        >
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              autoComplete="off"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            <InputRightElement width="4.5rem">
              <Button
                onClick={setShowPassword.toggle}
                size="sm"
                height="1.75rem"
              >
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          {formik.errors.password && formik.touched.password && (
            <FormHelperText>{formik.errors.password}</FormHelperText>
          )}
        </FormControl>

        <Button type="submit" colorScheme="blue" isLoading={loading}>
          Login
        </Button>
      </Stack>
    </form>
  );
}

export default LoginForm;
