import axios from 'axios';
import { useState, useEffect, useReducer } from 'react';
import {
  Container,
  CircularProgress,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { PostsList } from '../../components';
import { authOperations } from '../../redux/auth';

function postsReducer(state, { type, payload }) {
  switch (type) {
    case 'SET':
      return payload;

    case 'LIKE':
      return state.map((post) =>
        post._id === payload._id
          ? { ...post, usersLiked: payload.usersLiked }
          : post
      );

    case 'READ_LATER':
      return state.map((post) =>
        post._id === payload._id
          ? { ...post, usersReading: payload.usersReading }
          : post
      );

    default:
      throw new Error('Action type not implemented');
  }
}

function HomeView() {
  const [postsLoading, setPostsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [likeLoadingId, setLikeLoadingId] = useState(null);
  const [readLaterLoadingId, setReadLaterLoadingId] = useState(null);

  const [posts, postsDispatch] = useReducer(postsReducer, []);

  const dispatch = useDispatch();

  useEffect(() => {
    setPostsLoading(true);

    axios({
      method: 'GET',
      url: '/posts',
    })
      .then((res) => postsDispatch({ type: 'SET', payload: res.data.posts }))
      .catch((error) => setError(error))
      .finally(() => setPostsLoading(false));
  }, []);

  function like(postId) {
    setLikeLoadingId(postId);

    axios({
      method: 'PATCH',
      url: `/posts/${postId}/like`,
    })
      .then((res) => {
        postsDispatch({ type: 'LIKE', payload: res.data });
        dispatch(authOperations.fetchUserData());
      })
      .catch((error) => console.dir(error))
      .finally(() => setLikeLoadingId(null));
  }

  function readLater(postId) {
    setReadLaterLoadingId(postId);

    axios({
      method: 'PATCH',
      url: `/posts/${postId}/read-later`,
    })
      .then((res) => {
        postsDispatch({ type: 'READ_LATER', payload: res.data });
        dispatch(authOperations.fetchUserData());
      })
      .catch((error) => console.dir(error))
      .finally(() => setReadLaterLoadingId(null));
  }

  return (
    <Container maxWidth="container.md">
      {postsLoading && (
        <Flex justifyContent="center">
          <CircularProgress isIndeterminate />
        </Flex>
      )}
      {error && !postsLoading && (
        <Alert status="error" borderRadius="lg">
          <AlertIcon />
          <AlertTitle>{error.message}</AlertTitle>
          <AlertDescription>{error.response?.data.message}</AlertDescription>
        </Alert>
      )}
      {posts.length > 0 && !postsLoading && !error && (
        <PostsList
          posts={posts}
          likeLoadingId={likeLoadingId}
          readLaterLoadingId={readLaterLoadingId}
          onLike={like}
          onReadLater={readLater}
        />
      )}
    </Container>
  );
}

export default HomeView;
