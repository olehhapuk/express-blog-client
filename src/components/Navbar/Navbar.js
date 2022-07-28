import { Box, Button, HStack, Container, IconButton, Link, Image } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { Link as RLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { urls } from '../../constants/urls';
import { authSelectors } from '../../redux/auth';
import Dropdown from './Dropdown';

function Navbar() {
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);
  const user = useSelector(authSelectors.getUser);

  return (
    <Box as="nav" py={5}>
      <Container maxW="container.xl">
        <HStack justify="space-between">
          <HStack>
            <Link as={RLink} to={urls.home} display="block">
              <Image src="/Frame_rfzdtc-cropped.svg" alt="Logo" height="44px" />
            </Link>
            <Link as={RLink} to={'recommended'}>Discover</Link>
            <Link as={RLink} to={urls.search}>Search</Link>
          </HStack>

          {isAuthenticated ? (
            <HStack spacing={2}>
              {user.verificated ? (
                <>
                  <IconButton as={Link} to={urls.chats}>
                    <ChatIcon />
                  </IconButton>

                  <Button
                    colorScheme="blue"
                    as={Link}
                    to={urls.createPost}
                    disabled={!user.verificated}
                  >
                    Create Post
                  </Button>
                </>
              ) : (
                <Button colorScheme="blue" as={Link} to={urls.verify}>
                  Verify Account
                </Button>
              )}

              <Dropdown />
            </HStack>
          ) : (
            <HStack>
              <Button
                colorScheme="blue"
                variant="outline"
                as={Link}
                to={urls.login}
              >
                Login
              </Button>
              <Button colorScheme="blue" as={Link} to={urls.register}>
                Register
              </Button>
            </HStack>
          )}
        </HStack>
      </Container>
    </Box>
  );
}

export default Navbar;
