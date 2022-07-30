import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Stack,
  HStack,
  Heading,
  Textarea,
  FormHelperText,
  FormControl,
  useBoolean,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import { authSelectors } from '../../redux/auth';

const validationSchema = Yup.object().shape({
  username: Yup.string().min(2).required(),
  password: Yup.string().min(6).required(),
  repeatPassword: Yup.string()
    .min(6)
    .oneOf([Yup.ref('password'), null], "Passwords does'nt match")
    .required(),
  firstName: Yup.string().min(2).required(),
  lastName: Yup.string().min(2).required(),
  location: Yup.string().optional(),
  avatarUrl: Yup.string().url().optional(),
  githubUrl: Yup.string().url().optional(),
  description: Yup.string().min(3).optional(),
  work: Yup.string().min(3).optional(),
  hobby: Yup.string().min(3).optional(),
  birthDate: Yup.date().optional(),
});

function dateToInput(date) {
  const dates = date.toLocaleDateString('uk').split('.');
  return `${dates[2]}-${dates[1]}-${dates[0]}`;
}

function inputToDate(inputDate) {
  const dates = inputDate.split('-');
  return new Date(`${dates[1]}-${dates[2]}-${dates[0]}`);
}

const defaultDate = dateToInput(new Date());

function RegisterForm({ onSubmit }) {
  const [avatar, setAvatar] = useState(null);

  const formik = useFormik({
    validationSchema,
    initialValues: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      firstName: '',
      lastName: '',
      location: '',
      githubUrl: '',
      description: '',
      work: '',
      hobby: '',
      birthDate: defaultDate,
    },
    onSubmit: (values) => {
      const formData = new FormData();

      for (const key of Object.keys(values)) {
        formData.append(key, values[key]);
      }

      formData.set('birthDate', inputToDate(values.birthDate).toString());
      formData.append('avatar', avatar);

      onSubmit(formData);
    },
    validateOnBlur: true,
  });

  const [showPassword, setShowPassword] = useBoolean();
  const [showRepeatPassword, setShowRepeatPassword] = useBoolean();

  const loading = useSelector(authSelectors.getLoading);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Heading mb={5} textAlign="center">
        Register
      </Heading>

      <Stack spacing={3}>
        <FormControl
          isInvalid={formik.errors.username && formik.touched.username}
          isRequired
        >
          <Input
            type="text"
            autoComplete="username"
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
          isInvalid={formik.errors.email && formik.touched.email}
          isRequired
        >
          <Input
            type="email"
            autoComplete="email"
            placeholder="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.errors.username && formik.touched.username && (
            <FormHelperText>{formik.errors.username}</FormHelperText>
          )}
        </FormControl>

        <HStack align="flex-start">
          <FormControl
            isInvalid={formik.errors.password && formik.touched.password}
            isRequired
          >
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
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

          <FormControl
            isInvalid={
              formik.errors.repeatPassword && formik.touched.repeatPassword
            }
            isRequired
          >
            <InputGroup>
              <Input
                type={showRepeatPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Repeat password"
                name="repeatPassword"
                value={formik.values.repeatPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              <InputRightElement width="4.5rem">
                <Button
                  onClick={setShowRepeatPassword.toggle}
                  size="sm"
                  height="1.75rem"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            {formik.errors.repeatPassword && formik.touched.repeatPassword && (
              <FormHelperText>{formik.errors.repeatPassword}</FormHelperText>
            )}
          </FormControl>
        </HStack>

        <HStack align="flex-start">
          <FormControl
            isInvalid={formik.errors.firstName && formik.touched.firstName}
            isRequired
          >
            <Input
              type="text"
              autoComplete="given-name"
              placeholder="First name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.errors.firstName && formik.touched.firstName && (
              <FormHelperText>{formik.errors.firstName}</FormHelperText>
            )}
          </FormControl>

          <FormControl
            isInvalid={formik.errors.lastName && formik.touched.lastName}
            isRequired
          >
            <Input
              type="text"
              autoComplete="family-name"
              placeholder="Last name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.errors.lastName && formik.touched.lastName && (
              <FormHelperText>{formik.errors.lastName}</FormHelperText>
            )}
          </FormControl>
        </HStack>

        <FormControl
          isInvalid={formik.errors.location && formik.touched.location}
        >
          <Input
            type="text"
            autoComplete="country-name"
            placeholder="Location"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.location && formik.touched.location && (
            <FormHelperText>{formik.errors.location}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          isInvalid={formik.errors.avatarUrl && formik.touched.avatarUrl}
        >
          <Input
            type="file"
            placeholder="Avatar"
            name="avatar"
            onChange={(e) => setAvatar(e.target.files[0])}
            required
          />
        </FormControl>

        <FormControl
          isInvalid={formik.errors.githubUrl && formik.touched.githubUrl}
        >
          <Input
            type="url"
            autoComplete="url"
            placeholder="Github URL"
            name="githubUrl"
            value={formik.values.githubUrl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.githubUrl && formik.touched.githubUrl && (
            <FormHelperText>{formik.errors.githubUrl}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          isInvalid={formik.errors.description && formik.touched.description}
        >
          <Textarea
            placeholder="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.description && formik.touched.description && (
            <FormHelperText>{formik.errors.description}</FormHelperText>
          )}
        </FormControl>

        <FormControl isInvalid={formik.errors.work && formik.touched.work}>
          <Input
            type="text"
            autoComplete="organization-title"
            placeholder="Work"
            name="work"
            value={formik.values.work}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.work && formik.touched.work && (
            <FormHelperText>{formik.errors.work}</FormHelperText>
          )}
        </FormControl>

        <FormControl isInvalid={formik.errors.hobby && formik.touched.hobby}>
          <Input
            type="text"
            autoComplete="off"
            placeholder="Hobby"
            name="hobby"
            value={formik.values.hobby}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.hobby && formik.touched.hobby && (
            <FormHelperText>{formik.errors.hobby}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          isInvalid={formik.errors.birthDate && formik.touched.birthDate}
        >
          <Input
            type="date"
            placeholder="Birthday"
            name="birthDate"
            value={formik.values.birthDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.birthDate && formik.touched.birthDate && (
            <FormHelperText>{formik.errors.birthDate}</FormHelperText>
          )}
        </FormControl>

        <Button type="submit" colorScheme="blue" isLoading={loading}>
          Register
        </Button>
      </Stack>
    </form>
  );
}

export default RegisterForm;
