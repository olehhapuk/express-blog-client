import { Stack, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../config/socket';
import { authOperations, authSelectors } from '../../redux/auth';

import ChatItem from './ChatItem';

function ChatsList() {
  const [chats, setChats] = useState([]);
  const authUser = useSelector(authSelectors.getUser);

  useEffect(() => {
    console.log(authUser);
    getChats();
  }, [authUser]);

  function getChats() {
    socket.emit('chat:all', authUser._id, (chats) => {
      setChats(chats);
    });
  }

  useEffect(() => {
    socket.on('chat:updated', onChatUpdated);
    return () => {
      socket.off('chat:updated', onChatUpdated);
    };
  }, []);

  function onChatUpdated(chat) {
    console.log('CHAT:', chat);
    setChats((prev) => {
      return prev.map((prevChat) => {
        if (prevChat._id === chat._id) {
          return chat;
        } else {
          return prevChat;
        }
      });
    });
  }

  return (
    <Stack borderWidth="1px" borderRadius="lg" padding="8px 6px">
      {chats.length === 0 && (
        <Heading as="h3" size="lg" textAlign="center" color="GrayText">
          No chats
        </Heading>
      )}

      {chats.map((chat) => (
        <ChatItem key={chat._id} {...chat} authId={authUser._id} />
      ))}
    </Stack>
  );
}
export default ChatsList;
