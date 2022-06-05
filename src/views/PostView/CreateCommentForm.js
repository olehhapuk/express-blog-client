import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Textarea,
  Button,
  Stack,
  FormControl,
  FormHelperText,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { authSelectors } from '../../redux/auth';

const validationSchema = Yup.object().shape({
  text: Yup.string().min(2).required(),
});

function CreateCommentForm({ onSubmit, inputRef }) {
  const formik = useFormik({
    validationSchema,
    initialValues: {
      text: '',
    },
    validateOnBlur: false,
    onSubmit: ({ text }) => onSubmit(text),
  });

  const isAuthenticated = useSelector(authSelectors.isAuthenticated);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <FormControl
          isInvalid={formik.errors.text && formik.touched.text}
          isRequired
        >
          <Textarea
            ref={inputRef}
            autoComplete="off"
            placeholder="New comment..."
            name="text"
            value={formik.values.text}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            disabled={!isAuthenticated}
          />
          {formik.errors.text && formik.touched.text && (
            <FormHelperText>{formik.errors.text}</FormHelperText>
          )}
        </FormControl>

        <Button type="submit" colorScheme="blue" disabled={!isAuthenticated}>
          Create
        </Button>
      </Stack>
    </form>
  );
}

export default CreateCommentForm;
