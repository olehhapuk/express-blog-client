import { Link } from 'react-router-dom';
import { BsHeartFill, BsHeart, BsTrash } from 'react-icons/bs';
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
  Image,
  Box,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import { urls } from '../../constants/urls';
import { authSelectors } from '../../redux/auth';

const colors = [
  'blue',
  'red',
  'cyan',
  'green',
  'twitter',
  'facebook',
  'telegram',
  'blue',
  'red',
  'cyan',
  'green',
  'twitter',
  'facebook',
  'telegram',
  'blue',
  'red',
  'cyan',
  'green',
  'twitter',
  'facebook',
  'telegram',
];

function PostItem({
  _id,
  title,
  author,
  tags,
  usersLiked,
  thumbnailUrl,
  likeLoadingId,
  readLaterLoadingId,
  deleteLoadingId,
  onLike,
  onReadLater,
  onDelete,
}) {
  const user = useSelector(authSelectors.getUser);
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);

  const isLiked = user && user.likedPosts.find((post) => post._id === _id);
  const isInReadingList =
    user && user.readingList.find((post) => post._id === _id);
  const isAuthor = user && user._id === author._id;

  const startIndex = useMemo(
    () => Math.floor(Math.random() * (colors.length - 3)),
    []
  );

  return (
    <LinkBox
      as="article"
      borderWidth="1px"
      borderRadius="lg"
      textAlign="left"
      overflow="hidden"
    >
      {thumbnailUrl && <Image src={thumbnailUrl} alt={title} width="100%" />}
      <Stack spacing={2} padding={3}>
        <HStack justify="space-between">
          <LinkOverlay as={Link} to={`${urls.post}/${_id}`}>
            <Heading size="lg">{title}</Heading>
          </LinkOverlay>
          {isAuthor && onDelete && (
            <IconButton
              onClick={() => onDelete(_id)}
              colorScheme="red"
              isLoading={deleteLoadingId === _id}
            >
              <Icon as={BsTrash} />
            </IconButton>
          )}
        </HStack>
        {author ? (
          <ChakraLink
            as={Link}
            color="teal.500"
            to={`${urls.profile}/${author._id}`}
          >
            {author.fullName}
          </ChakraLink>
        ) : (
          <Text color="gray.500">Deleted account</Text>
        )}
        <Wrap spacing={2}>
          {tags.map((tag, i) => (
            <Tag
              key={tag._id}
              variant="outline"
              colorScheme={colors[startIndex + i]}
            >
              <TagLabel>{tag.name}</TagLabel>
            </Tag>
          ))}
        </Wrap>
        <HStack justify="space-between">
          <HStack alignItems="center">
            {isAuthenticated ? (
              <IconButton
                onClick={() => onLike(_id)}
                isLoading={likeLoadingId === _id}
                disabled={!isAuthenticated}
              >
                <Icon as={isLiked ? BsHeartFill : BsHeart} />
              </IconButton>
            ) : (
              <Icon as={BsHeart} m={2} />
            )}
            <Text>{usersLiked}</Text>
          </HStack>
          {isAuthenticated && (
            <Button
              variant="outline"
              onClick={() => onReadLater(_id)}
              isLoading={readLaterLoadingId === _id}
            >
              {isInReadingList ? 'Remove from reading list' : 'Read later'}
            </Button>
          )}
        </HStack>
      </Stack>
    </LinkBox>
  );
}

export default PostItem;
