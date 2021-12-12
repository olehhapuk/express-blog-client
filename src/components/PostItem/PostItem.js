import { Link } from 'react-router-dom';
import { BsHeartFill, BsHeart } from 'react-icons/bs';
import {
  Stack,
  Heading,
  Text,
  LinkBox,
  LinkOverlay,
  Tag,
  TagLabel,
  Wrap,
  HStack,
  IconButton,
  Icon,
  Button,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { urls } from '../../constants/urls';
import { authSelectors } from '../../redux/auth';

function PostItem({
  _id,
  title,
  tags,
  usersLiked,
  thumbnailUrl,
  likeLoadingId,
  readLaterLoadingId,
  onLike,
  onReadLater,
}) {
  const user = useSelector(authSelectors.getUser);
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);

  const isLiked = user && user.likedPosts.find((post) => post._id === _id);
  const isInReadingList =
    user && user.readingList.find((post) => post._id === _id);

  return (
    <LinkBox
      as="article"
      key={_id}
      borderWidth="1px"
      borderRadius="lg"
      textAlign="left"
    >
      {thumbnailUrl && <img src={thumbnailUrl} alt={title} />}
      <Stack spacing={2} padding={3}>
        <LinkOverlay as={Link} to={`${urls.post}/${_id}`}>
          <Heading size="lg">{title}</Heading>
        </LinkOverlay>
        <Wrap spacing={2}>
          {tags.map((tag) => (
            <Tag key={tag._id} variant="outline">
              <TagLabel>{tag.name}</TagLabel>
            </Tag>
          ))}
        </Wrap>
        <HStack justify="space-between">
          <HStack>
            <IconButton
              onClick={() => onLike(_id)}
              isLoading={likeLoadingId === _id}
              disabled={!isAuthenticated}
            >
              <Icon as={isLiked ? BsHeartFill : BsHeart} />
            </IconButton>
            <Text>{usersLiked}</Text>
          </HStack>
          <Button
            variant="outline"
            onClick={() => onReadLater(_id)}
            isLoading={readLaterLoadingId === _id}
            disabled={!isAuthenticated}
          >
            {isInReadingList ? 'Remove from reading list' : 'Read later'}
          </Button>
        </HStack>
      </Stack>
    </LinkBox>
  );
}

export default PostItem;
