import { Link } from 'react-router-dom';
import { BsHeartFill, BsHeart, BsTrash, BsPencil } from 'react-icons/bs';
import {
  Stack,
  Heading,
  Text,
  LinkBox,
  LinkOverlay,
  HStack,
  IconButton,
  Icon,
  Button,
  Image,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { urls } from '../../constants/urls';
import { authSelectors } from '../../redux/auth';
import { TagsList } from '../';

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
          <HStack>
            {isAuthor && (
              <IconButton as={Link} to={`${urls.editPost}/${_id}`}>
                <Icon as={BsPencil} />
              </IconButton>
            )}
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

        <TagsList tags={tags} />

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
