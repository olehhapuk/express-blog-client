import {
  Heading,
  Text,
  Image,
  Container,
  CircularProgress,
  Flex,
  HStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
  IconButton,
  Divider,
  useColorMode
} from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { BsX } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import CommentsList from './CommentsList';
import CreateCommentForm from './CreateCommentForm';
import AuthorCard from './AuthorCard';
import { authOperations } from '../../redux/auth';
import { TagsList } from '../../components';

function formatComments(comments) {
  const allChildComments = [];
  comments.forEach((commentElem) => {
    const childComments = getChildComments(comments, commentElem._id);
    appendChildComments(commentElem, childComments);
    allChildComments.push(...childComments);
  });

  return comments.filter(
    ({ _id }) => !allChildComments.find(({ _id: innerId }) => _id === innerId)
  );
}

function getChildComments(allComments, commentId) {
  return allComments.filter(({ parentComment }) => parentComment === commentId);
}

function appendChildComments(parentComment, childComments) {
  if (!parentComment.hasOwnProperty('comments')) {
    parentComment.comments = [];
  }

  parentComment.comments = [...parentComment.comments, ...childComments];
}

function PostView() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [replyToComment, setReplyToComment] = useState(null);
  const [commentsLoading, setCommentsLoading] = useState(false);

  const { postId } = useParams();

  const dispatch = useDispatch();

  const inputRef = useRef();

  const { colorMode } = useColorMode();

  useEffect(() => {
    // import(`github-markdown-css/github-markdown-${colorMode}.css`);
  }, [colorMode]);

  useEffect(fetchPost, [postId]);

  useEffect(() => {
    if (replyToComment && inputRef.current) {
      inputRef.current.focus();
    }
  }, [replyToComment]);

  function fetchPost() {
    setLoading(true);

    axios({
      method: 'GET',
      url: `/posts/${postId}`,
    })
      .then((res) => {
        const comments = formatComments(res.data.comments);
        setData({
          ...res.data,
          comments,
        });
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  function createComment(text) {
    setCommentsLoading(true);

    axios({
      method: 'POST',
      url: `/comments`,
      data: {
        text,
        parentPost: postId,
        parentComment: replyToComment?._id,
      },
    })
      .then(() => {
        fetchPost();
      })
      .catch((error) => setError(error))
      .finally(() => setCommentsLoading(false));
  }

  function deleteComment(commentId) {
    setCommentsLoading(true);

    axios({
      method: 'DELETE',
      url: `/comments/${commentId}`,
    })
      .then(() => {
        fetchPost();
      })
      .catch((error) => setError(error))
      .finally(() => setCommentsLoading(false));
  }

  function follow() {
    setLoading(true);

    axios({
      method: 'POST',
      url: `/users/${data.author._id}/follow`,
    })
      .then(() => {
        dispatch(authOperations.fetchUserData());
        fetchPost();
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }

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

      {data && (
        <Stack spacing={5}>
          {data.thumbnailUrl && (
            <Image src={data.thumbnailUrl} alt={data.title} />
          )}

          <AuthorCard {...data.author} onFollow={follow} />

          <Heading size="xl">{data.title}</Heading>
          <Text fontSize="md" color="GrayText">{new Date(data.createdAt).toLocaleDateString()}</Text>
          <TagsList tags={data.tags} />
          <ReactMarkdown remarkPlugins={[remarkGfm]} className={`markdown-css ${colorMode}`}>{data.body}</ReactMarkdown>
          <Divider />
          <Heading size="md">Comments</Heading>
          {replyToComment && (
            <HStack>
              <Text>Reply to {replyToComment.author.fullName}</Text>
              <IconButton
                icon={<BsX />}
                onClick={() => setReplyToComment(null)}
              />
            </HStack>
          )}

          <CreateCommentForm onSubmit={createComment} inputRef={inputRef} />

          {commentsLoading && (
            <Flex justify="center">
              <CircularProgress isIndeterminate />
            </Flex>
          )}
          {data.comments && (
            <CommentsList
              comments={data.comments}
              onReply={setReplyToComment}
              onDelete={deleteComment}
              onError={setError}
            />
          )}
        </Stack>
      )}
    </Container>
  );
}

export default PostView;
