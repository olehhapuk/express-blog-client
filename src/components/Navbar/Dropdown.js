import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { authSelectors, authActions } from '../../redux/auth';
import { urls } from '../../constants/urls';

function Dropdown() {
  const dispatch = useDispatch();

  const user = useSelector(authSelectors.getUser);

  function logout() {
    dispatch(authActions.logout());
  }

  return (
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
  );
}

export default Dropdown;
