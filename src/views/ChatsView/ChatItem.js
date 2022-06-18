import { Box, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { urls } from '../../constants/urls';

function ChatItem({ _id }) {
  return (
    <Stack as={Link} to={`${urls.chats}/${_id}`} direction="row" padding="12px">
      <Box marginRight="8px" width="64px" height="64px" flexShrink="0">
        <Image
          src="https://www.mona.uwi.edu/modlang/sites/default/files/modlang/male-avatar-placeholder.png"
          alt="Avatar"
          display="block"
          width="100%"
          height="100%"
          objectFit="cover"
          objectPosition="center"
          borderRadius="50%"
        />
      </Box>
      <Box width="100%">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading as="h4" size="md">
            John Doe
          </Heading>
          <Text as="span" fontSize="sm">
            01.01.2022
          </Text>
        </Stack>
        <Text as="p" fontSize="md">
          Last message text
        </Text>
      </Box>
    </Stack>
  );
}

export default ChatItem;
