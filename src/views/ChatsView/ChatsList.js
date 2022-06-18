import { Stack, Heading } from '@chakra-ui/react';
import { useState } from 'react';

import ChatItem from './ChatItem';

// const initialChats = new Array(3).fill({}).map((_, i) => ({ _id: i + 1 }));

function ChatsList() {
  const [chats, setChats] = useState([]);

  return (
    <Stack borderWidth="1px" borderRadius="lg" padding="8px 6px">
      {chats.length === 0 && (
        <Heading as="h3" size="lg" textAlign="center" color="blackAlpha.400">
          No chats
        </Heading>
      )}

      {chats.map((chat) => (
        <ChatItem key={chat._id} {...chat} />
      ))}
    </Stack>
  );
}
export default ChatsList;
