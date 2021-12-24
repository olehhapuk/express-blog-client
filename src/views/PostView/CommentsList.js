import { Stack } from '@chakra-ui/react';

import CommentItem from './CommentItem';

function CommentsList({ comments, onReply, onDelete }) {
  return (
    <Stack spacing={3}>
      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          onReply={onReply}
          onDelete={onDelete}
        />
      ))}
    </Stack>
  );
}

export default CommentsList;
