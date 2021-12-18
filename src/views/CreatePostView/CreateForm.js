import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  FormControl,
  Input,
  FormHelperText,
  Textarea,
  Button,
  Stack,
  Heading,
} from '@chakra-ui/react';

const validationSchema = Yup.object().shape({
  thumbnailUrl: Yup.string().url().notRequired(),
  title: Yup.string().min(3).required(),
  body: Yup.string().min(10).required(),
  tags: Yup.string()
    .matches(/[\w\s]+/)
    .notRequired(),
});

function CreateForm({ onSubmit, loading }) {
  const formik = useFormik({
    initialValues: {
      thumbnailUrl: '',
      title: '',
      body: '',
      tags: '',
    },
    validationSchema,
    onSubmit,
    validateOnBlur: true,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Heading mb={5} textAlign="center">
        Create Post
      </Heading>

      <Stack spacing={3}>
        <FormControl
          isInvalid={formik.errors.thumbnailUrl && formik.touched.thumbnailUrl}
          isRequired
        >
          <Input
            type="url"
            autoComplete="off"
            placeholder="Thumbnail URL"
            name="thumbnailUrl"
            value={formik.values.thumbnailUrl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.thumbnailUrl && formik.touched.thumbnailUrl && (
            <FormHelperText>{formik.errors.thumbnailUrl}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          isInvalid={formik.errors.title && formik.touched.title}
          isRequired
        >
          <Input
            type="text"
            autoComplete="off"
            placeholder="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.title && formik.touched.title && (
            <FormHelperText>{formik.errors.title}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          isInvalid={formik.errors.body && formik.touched.body}
          isRequired
        >
          <Textarea
            placeholder="Body"
            name="body"
            value={formik.values.body}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows="16"
            required
          />
          {formik.errors.body && formik.touched.body && (
            <FormHelperText>{formik.errors.body}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          isInvalid={formik.errors.tags && formik.touched.tags}
          isRequired
        >
          <Input
            type="text"
            autoComplete="off"
            placeholder="Tags(tag1, tag2)"
            name="tags"
            value={formik.values.tags}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.tags && formik.touched.tags && (
            <FormHelperText>{formik.errors.tags}</FormHelperText>
          )}
        </FormControl>

        <Button type="submit" colorScheme="blue" isLoading={loading}>
          Create
        </Button>
      </Stack>
    </form>
  );
}

export default CreateForm;
