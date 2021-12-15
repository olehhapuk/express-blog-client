import { Stack } from '@chakra-ui/react';

import CommentItem from './CommentItem';

function CommentsList({ comments, onReply }) {
  return (
    <Stack spacing={3}>
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} onReply={onReply} />
      ))}
    </Stack>
  );
}

export default CommentsList;
