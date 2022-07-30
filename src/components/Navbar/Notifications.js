import {
  Box,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  Icon,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { urls } from '../../constants/urls';
import { authSelectors } from '../../redux/auth';
import LikeNotification from './LikeNotification';
import CreateNotification from './CreateNotification';
import FollowNotification from './FollowNotification';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = useSelector(authSelectors.getUser);

  useEffect(() => {
    if (!axios.defaults.headers.common.Authorization) {
      return;
    }

    setLoading(true);

    axios
      .get('/users/notifications')
      .then((res) => setNotifications(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <Box>
      <Menu closeOnBlur closeOnSelect>
        <MenuButton as={IconButton}>
          <Icon as={FaBell} />
        </MenuButton>
        <MenuList maxHeight="480px" overflowY="auto" zIndex="99">
          {[...notifications].reverse().map((notification) => {
            switch (notification.action) {
              case 'LIKE':
                return (
                  <LikeNotification key={notification._id} {...notification} />
                );
              
              case 'CREATE':
                return <CreateNotification key={notification._id} {...notification} />;
              
              case 'FOLLOW':
                return <FollowNotification key={notification._id} {...notification} />;
              
              case 'REPLY':
                break;

              default:
                return null;
            }
          })}
        </MenuList>
      </Menu>
    </Box>
  );
}

export default Notifications;
