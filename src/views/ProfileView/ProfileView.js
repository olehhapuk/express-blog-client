import { useState, useEffect } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  Stack,
  Flex,
  Heading,
  Text,
  Avatar,
  CircularProgress,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PostsList } from '../../components';
import { authOperations, authSelectors } from '../../redux/auth';
import { urls } from '../../constants/urls';

function ProfileView() {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const [tabIndex, setTabIndex] = useState(0);
  const [likeLoadingId, setLikeLoadingId] = useState(null);
  const [readLaterLoadingId, setReadLaterLoadingId] = useState(null);
  const [deletePostLoadingId, setDeletePostLoadingId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [userDataError, setUserDataError] = useState(null);
  const [followLoading, setFollowLoading] = useState(false);
  const [followError, setFollowError] = useState(null);

  const authUser = useSelector(authSelectors.getUser);
  const isAuthenticated = useSelector(authSelectors.isAuthenticated);

  const isAuthUser = authUser && userId === authUser._id;
  const isFollowing = authUser && authUser.following.includes(userId);

  useEffect(fetchUserData, [userId]);
  useEffect(() => {
    setTabIndex(0);
  }, [userId]);

  function fetchUserData() {
    setUserDataLoading(true);

    axios({
      method: 'GET',
      url: `/users/${userId}`,
    })
      .then((res) => setUserData(res.data))
      .catch((error) => setUserDataError(error))
      .finally(() => setUserDataLoading(false));
  }

  function like(postId) {
    setLikeLoadingId(postId);

    axios({
      method: 'PATCH',
      url: `/posts/${postId}/like`,
    })
      .then(() => {
        fetchUserData();
        dispatch(authOperations.fetchUserData());
      })
      .catch((error) => console.dir(error))
      .finally(() => setLikeLoadingId(null));
  }

  function readLater(postId) {
    setReadLaterLoadingId(postId);

    axios({
      method: 'PATCH',
      url: `/posts/${postId}/save`,
    })
      .then(() => {
        fetchUserData();
        dispatch(authOperations.fetchUserData());
      })
      .catch((error) => console.dir(error))
      .finally(() => setReadLaterLoadingId(null));
  }

  function deletePost(postId) {
    setDeletePostLoadingId(postId);

    axios({
      method: 'DELETE',
      url: `/posts/${postId}`,
    })
      .then(() => {
        fetchUserData();
        dispatch(authOperations.fetchUserData());
      })
      .catch((error) => console.dir(error))
      .finally(() => setDeletePostLoadingId(null));
  }

  function follow() {
    setFollowLoading(true);

    axios({
      method: 'POST',
      url: `/users/${userId}/follow`,
    })
      .then((res) => {
        dispatch(authOperations.fetchUserData());
        fetchUserData();
        console.log(res.data);
      })
      .catch((error) => setFollowError(error))
      .finally(() => setFollowLoading(false));
  }

  return (
    <Container maxW="container.xl">
      {userDataLoading && (
        <Flex
          alignItems="center"
          justifyContent="center"
          position="fixed"
          backgroundColor="rgba(0, 0, 0, 0.7)"
          top="0"
          bottom="0"
          left="0"
          right="0"
          zIndex="99"
        >
          <CircularProgress isIndeterminate trackColor="gray.300" />
        </Flex>
      )}
      {userDataError && !userDataLoading && (
        <Alert status="error" borderRadius="lg">
          <AlertIcon />
          <AlertTitle>{userDataError.message}</AlertTitle>
          <AlertDescription>
            {userDataError.response?.data.message}
          </AlertDescription>
        </Alert>
      )}
      {userData && (
        <Container maxW="container.sm">
          <Stack spacing={2} textAlign="center" alignItems="center">
            <Avatar
              src={userData.avatarUrl}
              name={userData.fullName}
              size="xl"
            />

            <Heading>{userData.fullName}</Heading>
            <Text>{userData.description}</Text>

            <StatGroup w="200px">
              <Stat>
                <StatLabel>Followers</StatLabel>
                <StatNumber>{userData.followers.length}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Following</StatLabel>
                <StatNumber>{userData.following.length}</StatNumber>
              </Stat>
            </StatGroup>

            {isAuthUser ? (
              <Button
                as={Link}
                to={`${urls.editProfile}/${userId}`}
                colorScheme="blue"
              >
                Edit Profile
              </Button>
            ) : (
              <Button
                colorScheme="blue"
                onClick={follow}
                isLoading={followLoading}
                disabled={!isAuthenticated}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
            )}

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
                    posts={userData.posts}
                    onLike={like}
                    onReadLater={readLater}
                    onDelete={deletePost}
                  />
                </TabPanel>
                <TabPanel>
                  <PostsList
                    posts={userData.readingList}
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
