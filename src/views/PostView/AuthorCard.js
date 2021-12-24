import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  Avatar,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { urls } from '../../constants/urls';

function AuthorCard({
  _id,
  following,
  followers,
  posts,
  fullName,
  avatarUrl,
  isAuthor,
  isFollowing,
  onFollow,
}) {
  return (
    <Box border="1px" borderRadius="lg" borderColor="gray.300" p={3}>
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

        {!isAuthor && (
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
