import {
  Stack,
  HStack,
  Box,
  IconButton,
  Heading,
  Text,
} from '@chakra-ui/react';
import { BsReply, BsHeart, BsHeartFill } from 'react-icons/bs';

function CommentItem({ comment, onReply }) {
  return (
    <Box border="1px" borderRadius="lg" borderColor="gray.300" p={3}>
      {comment && (
        <>
          <Heading size="sm">{comment.author.fullName}</Heading>
          <Text>{comment.text}</Text>
          <HStack spacing={2}>
            <IconButton icon={<BsHeart />} />
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
