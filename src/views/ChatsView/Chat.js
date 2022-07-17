import { Heading, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import Message from './Message';
import ChatEditor from './ChatEditor';
import { socket } from '../../config/socket';
import { authSelectors } from '../../redux/auth';

let prevMessages = [];

function Chat() {
  const [messages, setMessages] = useState([]);

  const { chatId } = useParams();

  const messagesListRef = useRef();

  useEffect(() => {
    return () => {
      prevMessages = messages;
    };
  }, [messages]);

  const user = useSelector(authSelectors.getUser);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    if (!messagesListRef.current) {
      return;
    }

    const messagesList = messagesListRef.current;

    messagesList.scrollTo({
      top: messagesList.scrollHeight,
      behavior: prevMessages.length === 0 ? 'auto' : 'smooth',
    });
  }, [messages, messagesListRef]);

  useEffect(() => {
    window.onkeydown = (e) => {
      if (e.key === '1') {
        setMessages((prev) => [
          ...prev,
          { _id: prev.length + 1, isMine: false },
        ]);
      }
    };
  }, []);

  useEffect(() => {
    socket.on('message:create', onMessageReceived);
    return () => {
      socket.off('message:create', onMessageReceived);
    };
  }, []);

  function onMessageCreate(message) {
    console.log(chatId);
    socket.emit('message:create', message.body, chatId, user._id);
  }

  useEffect(() => {
    console.log(chatId);
    socket.emit('chat:join', chatId);
    socket.on('messages:read', onMessageRead);
    return () => {
      socket.emit('chat:leave', chatId);
      socket.off('messages:read', onMessageRead);
    };
  }, [chatId]);

  function onMessageReceived(message) {
    if (message.sender._id !== user._id) {
      socket.emit('messages:read', chatId, message._id);
    }
    setMessages((prev) => [...prev, { ...message }]);
    console.log(message);
  }

  function onMessageRead(message) {
    console.log(chatId);
    setMessages((prev) => {
      return prev.map((msg) => {
        if (msg._id === message._id) {
          return message;
        } else {
          return msg;
        }
      });
    });
  }

  useEffect(() => {
    getMessages();
  }, [chatId]);

  function getMessages() {
    socket.emit('messages:all', chatId, (messages) => {
      setMessages(messages);
    });
  }

  return (
    <Stack
      borderWidth="1px"
      borderRadius="lg"
      padding="12px"
      height="calc(100vh - 80px - 12px)"
      justifyContent="space-between"
    >
      <Stack ref={messagesListRef} width="100%" height="100%" overflowY="auto">
        {messages.length === 0 && (
          <Heading as="h3" size="lg" textAlign="center" color="blackAlpha.400">
            Say hi!
          </Heading>
        )}

        {messages.map((message) => (
          <Message
            key={message._id}
            {...message}
            isMine={message.sender._id === user._id ? true : false}
            fullName={message.sender.fullName}
            isRead={message.read}
          />
        ))}
      </Stack>

      <ChatEditor onCreate={onMessageCreate} />
    </Stack>
  );
}

export default Chat;
