import { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  Stack,
  HStack,
  Heading,
  Text,
  Avatar,
  Button,
  CircularProgress,
  Flex,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';

import { authSelectors, authOperations } from '../../redux/auth';
import { PostsList, PostItem } from '../../components';

function ProfileView() {
  const dispatch = useDispatch();

  const user = useSelector(authSelectors.getUser);
  const userLoading = useSelector(authSelectors.getLoading);

  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    dispatch(authOperations.fetchUserData());
  }, [dispatch]);

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
                  <PostsList posts={user.posts} />
                </TabPanel>
                <TabPanel>
                  <PostsList posts={user.readingList} />
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
