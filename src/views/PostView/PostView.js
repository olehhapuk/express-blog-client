import {
  Text,
  Container,
  CircularProgress,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
} from '@chakra-ui/react';
import axios from 'axios';
import { sanitize } from 'dompurify';
import { marked } from 'marked';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PostView() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { postId } = useParams();

  useEffect(() => {
    setLoading(true);

    axios({
      method: 'GET',
      url: `/posts/${postId}`,
    })
      .then((res) => setData(res.data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [postId]);

  return (
    <Container maxW="container.md">
      {loading && (
        <Flex justify="center">
          <CircularProgress isIndeterminate />
        </Flex>
      )}

      {error && !loading && (
        <Alert status="error" borderRadius="lg">
          <AlertIcon />
          <AlertTitle>{error.message}</AlertTitle>
          <AlertDescription>{error.response?.data.message}</AlertDescription>
        </Alert>
      )}

      {!error && !loading && data && (
        <Stack spacing={5}>
          {data.thumbnailUrl && (
            <img src={data.thumbnailUrl} alt={data.title} />
          )}
          <Text
            className="markdown-body"
            dangerouslySetInnerHTML={{
              __html: sanitize(marked.parse(data.body)),
            }}
          />
        </Stack>
      )}
    </Container>
  );
}

export default PostView;
