import { Box, Heading, Text } from '@chakra-ui/react';

function Message({ isMine }) {
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
          John Doe
        </Heading>
        <Text as="p" fontSize="md">
          Test message text
        </Text>
      </Box>
    </Box>
  );
}

export default Message;
