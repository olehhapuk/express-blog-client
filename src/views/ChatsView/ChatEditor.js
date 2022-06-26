import { Stack, IconButton, Textarea, Icon, Text, Kbd } from '@chakra-ui/react';
import { AiOutlineSend } from 'react-icons/ai';
import { useState, useEffect, useRef } from 'react';

const textareaMaxHeight = 100;

function ChatEditor({ onCreate }) {
  const [text, setText] = useState('');

  const textareaRef = useRef();

  useEffect(() => {
    if (!textareaRef.current) {
      return;
    }
    const textarea = textareaRef.current;

    textarea.style.height = '';

    const borderWidth =
      +getComputedStyle(textarea).getPropertyValue('border-width')[0];
    const prevHeight = textarea.scrollHeight + borderWidth * 2;

    textarea.style.height = Math.min(prevHeight, textareaMaxHeight) + 'px';
  }, [text, textareaRef]);

  return (
    <Stack>
      <Stack direction="row">
        <Textarea
          ref={textareaRef}
          rows={1}
          resize="none"
          placeholder="Enter your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <IconButton type="submit" onClick={() => onCreate({ body: text })}>
          <Icon as={AiOutlineSend} />
        </IconButton>
      </Stack>
      <Text>
        <Text as="span" marginRight="4px">
          <Kbd>Enter</Kbd>
          <Text as="span" fontSize="sm">
            {' '}
            - Send message
          </Text>
        </Text>
        <Text as="span">
          <Kbd>Shift + Enter</Kbd>
          <Text as="span" fontSize="sm">
            {' '}
            - New line
          </Text>
        </Text>
      </Text>
    </Stack>
  );
}

export default ChatEditor;
