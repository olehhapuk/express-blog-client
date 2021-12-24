import { Stack } from '@chakra-ui/react';

import CommentItem from './CommentItem';

function CommentsList({ comments, onReply, onDelete, onError }) {
  return (
    <Stack spacing={3}>
      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          onReply={onReply}
          onDelete={onDelete}
          onError={onError}
        />
      ))}
    </Stack>
  );
}

export default CommentsList;
