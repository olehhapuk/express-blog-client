import { Heading, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import Message from './Message';
import ChatEditor from './ChatEditor';

// const initialMessages = new Array(50)
//   .fill({})
//   .map((_, i) => ({ _id: i + 1, isMine: Math.round(Math.random()) === 1 }));

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
          <Message key={message._id} {...message} />
        ))}
      </Stack>

      <ChatEditor />
    </Stack>
  );
}

export default Chat;
