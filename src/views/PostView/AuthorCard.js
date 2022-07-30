import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Avatar,
  Text,
  useColorMode
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { urls } from '../../constants/urls';
import { authSelectors } from '../../redux/auth';

function AuthorCard({
  _id,
  following,
  followers,
  posts,
  fullName,
  avatarUrl,
  onFollow,
}) {
  const user = useSelector(authSelectors.getUser);
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);
  const { colorMode } = useColorMode();

  const isAuthor = user && user._id === _id;
  const isFollowing = user && user.following.includes(_id);

  return (
    <Box border="1px" borderRadius="lg" borderColor={colorMode === 'light' ? "gray.300" : 'gray.700'} p={3}>
      <HStack justify="space-between">
        <HStack spacing={3}>
          <Avatar src={avatarUrl} />
          <Stack>
            <Heading size="sm" as={Link} to={`${urls.profile}/${_id}`}>
              {fullName}
            </Heading>
            <HStack spacing={3}>
              <HStack spacing={1} color="gray.500">
                <Text fontWeight="700">{posts.length}</Text>
                <Heading size="xs">Posts</Heading>
              </HStack>
              <HStack spacing={1} color="gray.500">
                <Text fontWeight="700">{followers.length}</Text>
                <Heading size="xs">Followers</Heading>
              </HStack>
            </HStack>
          </Stack>
        </HStack>

        {isAuthenticated && user.verificated && !isAuthor && (
          <Button
            colorScheme={isFollowing ? 'gray' : 'blue'}
            onClick={onFollow}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        )}
      </HStack>
    </Box>
  );
}

export default AuthorCard;
