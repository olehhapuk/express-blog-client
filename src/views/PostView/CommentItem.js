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

function CommentItem({ comment, onReply, onLiked, onDelete }) {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector(authSelectors.getUser);

  const isLiked =
    comment &&
    user &&
    user.likesComments.find(({ _id }) => _id === comment._id);
  const isAuthor = comment && user && comment.author._id === user._id;

  function like() {
    setLoading(true);

    axios({
      method: 'PATCH',
      url: `/comments/${comment._id}/like`,
    })
      .then(() => {
        dispatch(authOperations.fetchUserData());
        onLiked();
      })
      .catch((error) => console.log(error))
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
          <Text>{comment.text}</Text>
          <HStack spacing={2}>
            <IconButton
              icon={isLiked ? <BsHeartFill /> : <BsHeart />}
              onClick={like}
              isLoading={loading}
            />
            <IconButton icon={<BsReply />} onClick={() => onReply(comment)} />
          </HStack>

          {comment.comments && comment.comments.length > 0 && (
            <Stack ml="12px" mt="12px">
              {comment.comments.map((comment) => (
                <CommentItem
                  key={comment._id}
                  comment={comment}
                  onReply={onReply}
                  onDelete={onDelete}
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
