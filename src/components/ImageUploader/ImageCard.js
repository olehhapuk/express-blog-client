import {
  Box,
  Button,
  Image,
  Link,
  Stack,
  Text,
  useClipboard,
} from '@chakra-ui/react';

function ImageCard({ imageUrl }) {
  const { hasCopied, onCopy } = useClipboard(imageUrl);

  return (
    <Box key={imageUrl}>
      <Image
        src={imageUrl}
        alt={imageUrl}
        width="100%"
        height="150px"
        objectFit="cover"
        objectPosition="center"
      />
      <Stack>
        <Link href={imageUrl} target="_blank" wordBreak="break-all">
          {imageUrl}
        </Link>
        <Button onClick={onCopy}>{hasCopied ? 'Copied' : 'Copy link'}</Button>
      </Stack>
    </Box>
  );
}

export default ImageCard;
