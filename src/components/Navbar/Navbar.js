import {
  Box,
  Input,
  Button,
  HStack,
  Container,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'query-string';

import { urls } from '../../constants/urls';
import { authSelectors, authActions } from '../../redux/auth';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');

  const isAuthenticated = useSelector(authSelectors.isAuthenticated);
  const user = useSelector(authSelectors.getUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logout() {
    dispatch(authActions.logout());
  }

  function search(e) {
    e.preventDefault();

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

          {isAuthenticated ? (
            <HStack spacing={2}>
              <Button colorScheme="blue" as={Link} to={urls.createPost}>
                Create Post
              </Button>

              <Box>
                <Menu closeOnBlur closeOnSelect>
                  <MenuButton as={IconButton}>
                    <HamburgerIcon />
                  </MenuButton>
                  <MenuList>
                    <MenuItem as={Link} to={urls.home}>
                      Home
                    </MenuItem>
                    <MenuItem as={Link} to={`${urls.profile}/${user._id}`}>
                      My Profile
                    </MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
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
