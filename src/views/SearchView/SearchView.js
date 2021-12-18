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
  Button,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';

import { PostsList } from '../../components';
import { authOperations } from '../../redux/auth';

function postsReducer(state, { type, payload }) {
  switch (type) {
    case 'CLEAR':
      return [];

    case 'ADD':
      return [...state, ...payload];

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

function SearchView() {
  const [postsLoading, setPostsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [likeLoadingId, setLikeLoadingId] = useState(null);
  const [readLaterLoadingId, setReadLaterLoadingId] = useState(null);
  const [pagesCount, setPagesCount] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const [posts, postsDispatch] = useReducer(postsReducer, []);

  const dispatch = useDispatch();

  const { search } = useLocation();
  const searchParams = qs.parse(search);

  useEffect(() => {
    postsDispatch({ type: 'CLEAR' });
    setActivePage(1);
  }, [searchParams.search]);

  useEffect(() => {
    fetchPosts();
  }, [searchParams.search, activePage]);

  function fetchPosts() {
    setPostsLoading(true);

    axios({
      method: 'GET',
      url: '/posts',
      params: {
        search: searchParams.search,
        page: activePage,
        perPage: 1,
      },
    })
      .then((res) => {
        postsDispatch({ type: 'ADD', payload: res.data.posts });
        setPagesCount(res.data.pagesCount);
      })
      .catch((error) => setError(error))
      .finally(() => setPostsLoading(false));
  }

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

  function loadMore() {
    setActivePage(activePage + 1);
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
      {posts.length > 0 && !error && (
        <PostsList
          posts={posts}
          likeLoadingId={likeLoadingId}
          readLaterLoadingId={readLaterLoadingId}
          onLike={like}
          onReadLater={readLater}
        />
      )}
      {!error && activePage < pagesCount && (
        <Button colorScheme="blue" onClick={loadMore} isLoading={postsLoading}>
          Load More
        </Button>
      )}
    </Container>
  );
}

export default SearchView;
