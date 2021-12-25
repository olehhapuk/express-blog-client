import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Container,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { urls } from '../../constants/urls';

import EditForm from './EditForm';

function EditPostView() {
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    axios({
      method: 'GET',
      url: `/posts/${postId}`,
    })
      .then((res) => setInitialData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [postId]);

  function editPost(data) {
    setLoading(true);

    axios({
      method: 'PUT',
      url: `/posts/${postId}`,
      data,
    })
      .then(() => {
        navigate(`${urls.post}/${postId}`);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
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

      <EditForm
        onSubmit={editPost}
        initialData={initialData}
        loading={loading}
      />
    </Container>
  );
}

export default EditPostView;
