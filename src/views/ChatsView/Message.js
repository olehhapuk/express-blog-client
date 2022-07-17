import { Box, Heading, Text } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

function Message({ body, isMine, fullName, isRead }) {
  return (
    <Box>
      <Box
        borderRadius="lg"
        padding="8px 12px"
        backgroundColor={isMine ? 'green.400' : 'gray.200'}
        color={isMine ? 'red.50' : 'black'}
        width="fit-content"
        marginLeft={isMine ? 'auto' : '0'}
      >
        <Heading as="h4" size="sm">
          {fullName}
        </Heading>
        <Text as="p" fontSize="md">
          {body}
        </Text>

        {isMine && isRead ? <CheckIcon marginLeft="2%" /> : ''}
        {isMine ? <CheckIcon marginRight="0" /> : ''}
      </Box>
    </Box>
  );
}

export default Message;
