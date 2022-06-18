import { Box, Button, HStack, Container, IconButton } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import qs from 'query-string';

import { urls } from '../../constants/urls';
import { authSelectors } from '../../redux/auth';
import Searchbar from './Searchbar';
import Dropdown from './Dropdown';

function Navbar() {
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);

  const navigate = useNavigate();

  function search(searchQuery) {
    const queryString = qs.stringify({
      search: searchQuery,
    });
    navigate(`${urls.search}?${queryString}`);
  }

  return (
    <Box as="nav" py={5}>
      <Container maxW="container.xl">
        <HStack justify="space-between">
          <Link to={urls.home}>Express Blog</Link>

          <Searchbar onSearch={search} />

          {isAuthenticated ? (
            <HStack spacing={2}>
              <IconButton as={Link} to={urls.chats}>
                <ChatIcon />
              </IconButton>

              <Button colorScheme="blue" as={Link} to={urls.createPost}>
                Create Post
              </Button>

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
