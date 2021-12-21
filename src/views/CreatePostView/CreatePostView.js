import {
  Container,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CreateForm from './CreateForm';
import { urls } from '../../constants/urls';

function CreatePostView() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  function createPost(data) {
    setLoading(true);

    axios({
      method: 'POST',
      url: '/posts',
      data,
    })
      .then((res) => {
        navigate(`${urls.post}/${res.data.newPost._id}`);
      })
      .catch((error) => {
        console.dir(error);
        setError(error);
        setLoading(false);
      });
  }

  return (
    <Container maxW="container.lg">
      {error && !loading && (
        <Alert status="error" borderRadius="lg">
          <AlertIcon />
          <AlertTitle>{error.message}</AlertTitle>
          <AlertDescription>{error.response?.data.message}</AlertDescription>
        </Alert>
      )}
      <CreateForm onSubmit={createPost} loading={loading} />
    </Container>
  );
}

export default CreatePostView;
