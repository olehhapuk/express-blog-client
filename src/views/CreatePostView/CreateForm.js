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
import { useState } from 'react';

import TagInput from './TagInput';

const validationSchema = Yup.object().shape({
  thumbnailUrl: Yup.string().url().notRequired(),
  title: Yup.string().min(3).required(),
  body: Yup.string().min(10).required(),
  tags: Yup.string()
    .matches(/[\w\s]+/)
    .notRequired(),
});

function CreateForm({ onSubmit, loading }) {
  const [selectedTags, setSelectedTags] = useState([]);

  const formik = useFormik({
    initialValues: {
      thumbnailUrl: '',
      title: '',
      body: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit({
        ...values,
        tags: selectedTags.join(', '),
      });
    },
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

        <TagInput
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />

        <Button type="submit" colorScheme="blue" isLoading={loading}>
          Create
        </Button>
      </Stack>
    </form>
  );
}

export default CreateForm;
