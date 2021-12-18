import {
  Stack,
  HStack,
  Box,
  IconButton,
  Heading,
  Text,
} from '@chakra-ui/react';
import { BsReply, BsHeart, BsHeartFill } from 'react-icons/bs';
import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { authSelectors, authOperations } from '../../redux/auth/';

function CommentItem({ comment, onReply, onLiked }) {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector(authSelectors.getUser);

  const isLiked = comment && user && user.likedComments.includes(comment._id);

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
          <Heading size="sm">{comment.author.fullName}</Heading>
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
