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

import EditForm from './EditForm';
import { urls } from '../../constants/urls';

function EditProfileView() {
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    axios({
      method: 'GET',
      url: `/users/${userId}`,
    })
      .then((res) => setInitialData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [userId]);

  function editProfile(data) {
    setLoading(true);

    axios({
      method: 'PUT',
      url: `/users/${userId}`,
      data,
    })
      .then(() => {
        navigate(`${urls.profile}/${userId}`);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }

  return (
    <Container>
      {error && !loading && (
        <Alert status="error" borderRadius="lg">
          <AlertIcon />
          <AlertTitle>{error.message}</AlertTitle>
          <AlertDescription>{error.response?.data.message}</AlertDescription>
        </Alert>
      )}

      <EditForm
        onSubmit={editProfile}
        initialData={initialData}
        loading={loading}
      />
    </Container>
  );
}

export default EditProfileView;
