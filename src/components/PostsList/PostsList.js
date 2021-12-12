import { Stack } from '@chakra-ui/react';

import { PostItem } from '../';

function PostsList({
  posts,
  likeLoadingId,
  readLaterLoadingId,
  onLike,
  onReadLater,
}) {
  return (
    <Stack spacing={2}>
      {posts.map((post) => (
        <PostItem
          key={post._id}
          {...post}
          likeLoadingId={likeLoadingId}
          readLaterLoadingId={readLaterLoadingId}
          onLike={onLike}
          onReadLater={onReadLater}
        />
      ))}
    </Stack>
  );
}

export default PostsList;
