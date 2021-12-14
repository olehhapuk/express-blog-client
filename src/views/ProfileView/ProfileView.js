import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  Stack,
  Heading,
  Text,
  Avatar,
  CircularProgress,
  Flex,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import axios from 'axios';

import { authSelectors, authOperations } from '../../redux/auth';
import { PostsList } from '../../components';

function ProfileView() {
  const dispatch = useDispatch();

  const user = useSelector(authSelectors.getUser);
  const userLoading = useSelector(authSelectors.getLoading);

  const [tabIndex, setTabIndex] = useState(0);
  const [likeLoadingId, setLikeLoadingId] = useState(null);
  const [readLaterLoadingId, setReadLaterLoadingId] = useState(null);

  useEffect(() => {
    dispatch(authOperations.fetchUserData());
  }, [dispatch]);

  function like(postId) {
    setLikeLoadingId(postId);

    axios({
      method: 'PATCH',
      url: `/posts/${postId}/like`,
    })
      .then(() => {
        dispatch(authOperations.fetchUserData());
      })
      .catch((error) => console.dir(error))
      .finally(() => setLikeLoadingId(null));
  }

  function readLater(postId) {
    setReadLaterLoadingId(postId);

    axios({
      method: 'PATCH',
      url: `/posts/${postId}/read-later`,
    })
      .then(() => {
        dispatch(authOperations.fetchUserData());
      })
      .catch((error) => console.dir(error))
      .finally(() => setReadLaterLoadingId(null));
  }

  return (
    <Container maxW="container.xl">
      {userLoading && (
        <Flex justifyContent="center">
          <CircularProgress isIndeterminate />
        </Flex>
      )}

      {!userLoading && user && (
        <Container maxW="container.sm">
          <Stack spacing={2} textAlign="center" alignItems="center">
            <Avatar src={user.avatarUrl} name={user.fullName} size="xl" />
            <Heading>{user.fullName}</Heading>
            <Text>{user.description}</Text>
            <StatGroup w="xs">
              <Stat>
                <StatLabel>Followers</StatLabel>
                <StatNumber>{user.followers.length}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Following</StatLabel>
                <StatNumber>{user.following.length}</StatNumber>
              </Stat>
            </StatGroup>

            <Tabs
              index={tabIndex}
              onChange={setTabIndex}
              align="center"
              variant="enclosed"
            >
              <TabList>
                <Tab>My posts</Tab>
                <Tab>Reading list</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <PostsList
                    posts={user.posts}
                    onLike={like}
                    onReadLater={readLater}
                  />
                </TabPanel>
                <TabPanel>
                  <PostsList
                    posts={user.readingList}
                    onLike={like}
                    onReadLater={readLater}
                    likeLoadingId={likeLoadingId}
                    readLaterLoadingId={readLaterLoadingId}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </Container>
      )}
    </Container>
  );
}

export default ProfileView;
