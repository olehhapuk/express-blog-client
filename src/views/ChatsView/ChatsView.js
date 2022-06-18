import { Container, Grid, GridItem } from '@chakra-ui/react';
import { Routes, Route, useMatch } from 'react-router-dom';
import { useMemo } from 'react';

import ChatsList from './ChatsList';
import Chat from './Chat';
import { urls } from '../../constants/urls';

function ChatsView() {
  const match = useMatch(urls.chats + '/:chatId');

  const chatId = useMemo(() => match?.params.chatId, [match]);

  return (
    <Container maxWidth="container.xl">
      <Grid templateColumns="350px 1fr" gap="12px">
        <GridItem>
          <ChatsList />
        </GridItem>

        <Routes>
          <Route
            path=":chatId"
            element={
              <GridItem>
                <Chat />
              </GridItem>
            }
          />
        </Routes>
      </Grid>
    </Container>
  );
}

export default ChatsView;
