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
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { urls } from '../../constants/urls';
import { authSelectors, authActions } from '../../redux/auth';

function Navbar() {
  const [search, setSearch] = useState('');

  const isAuthenticated = useSelector(authSelectors.isAuthenticated);
  const user = useSelector(authSelectors.getUser);

  const dispatch = useDispatch();

  function logout() {
    dispatch(authActions.logout());
  }

  return (
    <Box as="nav" py={5}>
      <Container maxW="container.xl">
        <HStack justify="space-between">
          <HStack as="form" maxW="320px">
            <Input
              type="search"
              autoComplete="off"
              name="search"
              placeholder="Search..."
              value={search}
              onChange={({ target }) => setSearch(target.value)}
            />
            <Button type="submit" colorScheme="blue">
              Search
            </Button>
          </HStack>

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
