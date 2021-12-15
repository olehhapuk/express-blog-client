import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Textarea,
  Button,
  Stack,
  FormControl,
  FormHelperText,
} from '@chakra-ui/react';

const validationSchema = Yup.object().shape({
  text: Yup.string().min(2).required(),
});

function CreateCommentForm({ onSubmit }) {
  const formik = useFormik({
    validationSchema,
    initialValues: {
      text: '',
    },
    validateOnBlur: false,
    onSubmit: ({ text }) => onSubmit(text),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <FormControl
          isInvalid={formik.errors.text && formik.touched.text}
          isRequired
        >
          <Textarea
            autoComplete="off"
            placeholder="New comment..."
            name="text"
            value={formik.values.text}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.errors.text && formik.touched.text && (
            <FormHelperText>{formik.errors.text}</FormHelperText>
          )}
        </FormControl>

        <Button type="submit" colorScheme="blue">
          Create
        </Button>
      </Stack>
    </form>
  );
}

export default CreateCommentForm;
