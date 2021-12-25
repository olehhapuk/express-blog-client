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
import { useEffect } from 'react';

import { authSelectors } from '../../redux/auth';

const validationSchema = Yup.object().shape({
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

function EditForm({ initialData, loading, onSubmit }) {
  const formik = useFormik({
    validationSchema,
    initialValues: {
      firstName: '',
      lastName: '',
      location: '',
      avatarUrl: '',
      githubUrl: '',
      description: '',
      work: '',
      hobby: '',
      birthDate: defaultDate,
    },
    onSubmit: (values) => {
      console.log(values);
      onSubmit({
        ...values,
        birthDate: inputToDate(values.birthDate).toString(),
      });
    },
    validateOnBlur: true,
  });

  useEffect(() => {
    if (!initialData) {
      return;
    }

    formik.setValues({
      firstName: initialData.firstName,
      lastName: initialData.lastName,
      location: initialData.location,
      avatarUrl: initialData.avatarUrl,
      githubUrl: initialData.githubUrl,
      description: initialData.description,
      work: initialData.work,
      hobby: initialData.hobby,
      birthDate: dateToInput(new Date(initialData.birthDate)),
    });
  }, [initialData]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Heading mb={5} textAlign="center">
        Edit Profile
      </Heading>

      <Stack spacing={3}>
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
            type="url"
            autoComplete="photo"
            placeholder="Avatar URL"
            name="avatarUrl"
            value={formik.values.avatarUrl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.avatarUrl && formik.touched.avatarUrl && (
            <FormHelperText>{formik.errors.avatarUrl}</FormHelperText>
          )}
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
          Save
        </Button>
      </Stack>
    </form>
  );
}

export default EditForm;
