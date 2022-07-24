import { Box, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { urls } from '../../constants/urls';

function ChatItem({
  _id,
  lastMessage,
  users,
  theme,
  messages,
  authId,
  createdAt,
}) {
  const lastMessageCreatedAt = lastMessage ? lastMessage.createdAt : createdAt;
  const [lastMessageDate, setLastMessageDate] = useState('now');
  useEffect(() => {
    const diffTime = Math.abs(new Date() - new Date(lastMessageCreatedAt));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.round(diffTime / 1000 / 60 / 60);
    const minutes = Math.round(diffTime / 1000 / 60);
    if (diffDays <= 1) {
      if (minutes >= 60) {
        setLastMessageDate(hours + 'h');
      } else {
        if (minutes === 0) {
          setLastMessageDate('now');
        } else {
          setLastMessageDate(minutes + 'm');
        }
      }
    } else {
      setLastMessageDate(new Date(lastMessageCreatedAt).toLocaleDateString());
    }
  }, [messages]);

  const currentUser = users.find((user) => user._id !== authId);
  return (
    <Stack as={Link} to={`${urls.chats}/${_id}`} direction="row" padding="12px">
      <Box marginRight="8px" width="64px" height="64px" flexShrink="0">
        <Image
          src={currentUser.avatarUrl}
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
            {currentUser.fullName}
          </Heading>
          <Text as="span" fontSize="sm">
            {lastMessageDate}
          </Text>
        </Stack>
        <Text as="p" fontSize="md">
          {lastMessage ? lastMessage.body : 'No messages'}
        </Text>
      </Box>
    </Stack>
  );
}

export default ChatItem;
