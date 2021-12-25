import {
  Stack,
  HStack,
  Box,
  IconButton,
  Heading,
  Text,
  Icon,
} from '@chakra-ui/react';
import { BsReply, BsHeart, BsHeartFill, BsTrash } from 'react-icons/bs';
import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { authSelectors, authOperations } from '../../redux/auth/';

function CommentItem({ comment, onReply, onLiked, onDelete, onError }) {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector(authSelectors.getUser);
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);

  const isLiked =
    comment &&
    user &&
    user.likedComments.find(({ _id }) => _id === comment._id);
  const isAuthor = comment && user && comment.author._id === user._id;

  function like() {
    setLoading(true);

    axios({
      method: 'PATCH',
      url: `/comments/${comment._id}/like`,
    })
      .then(() => {
        dispatch(authOperations.fetchUserData());
        if (onLiked) {
          onLiked();
        }
      })
      .catch((error) => {
        console.dir(error);
        onError(error);
      })
      .finally(() => setLoading(false));
  }

  return (
    <Box border="1px" borderRadius="lg" borderColor="gray.300" p={3}>
      {comment && (
        <>
          <HStack justify="space-between">
            <Heading size="sm">{comment.author.fullName}</Heading>
            {isAuthor && onDelete && (
              <IconButton
                colorScheme="red"
                onClick={() => onDelete(comment._id)}
              >
                <Icon as={BsTrash} />
              </IconButton>
            )}
          </HStack>
          <Text mb={3}>{comment.text}</Text>
          <HStack spacing={2}>
            <IconButton
              icon={isLiked ? <BsHeartFill /> : <BsHeart />}
              onClick={like}
              isLoading={loading}
              disabled={!isAuthenticated}
            />
            <IconButton
              icon={<BsReply />}
              onClick={() => onReply(comment)}
              disabled={!isAuthenticated}
            />
          </HStack>

          {comment.comments && comment.comments.length > 0 && (
            <Stack ml="12px" mt="12px">
              {comment.comments.map((comment) => (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  onReply={onReply}
                  onDelete={onDelete}
                  onError={onError}
                  onLiked={onLiked}
                />
              ))}
            </Stack>
          )}
        </>
      )}
    </Box>
  );
}

export default CommentItem;
