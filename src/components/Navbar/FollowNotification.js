import { Text, MenuItem, Avatar, Stack, Link } from '@chakra-ui/react';
import { Link as RLink } from 'react-router-dom';

import { urls } from '../../constants/urls';

function FollowNotification({ _id, user, entity }) {
  return (
    <MenuItem key={_id} paddingRight="5">
      <Stack direction="row" alignItems="center">
        <Avatar src={user.avatarUrl} />
        <Text>
          <Link as={RLink} to={`${urls.profile}/${user._id}`} fontWeight="bold">
            {user.fullName}
          </Link>
          <Text as="span"> is now following you</Text>
        </Text>
      </Stack>
    </MenuItem>
  )
}

export default FollowNotification;