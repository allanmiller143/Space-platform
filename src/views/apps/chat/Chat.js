/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import ChatSidebar from '../../../components/apps/chats/ChatSidebar';
import ChatContent from '../../../components/apps/chats/ChatContent';
import AppCard from 'src/components/shared/AppCard';
import NotificationContext from '../../../Services/Notification/NotificationContext/NotificationContext';
import socket from '../../../Services/socket';
import ChatContext from '../../../components/apps/chats/ChatContext/ChatContext';
import ChatListing from '../../../components/apps/chats/ChatListing';

const Chats = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { selectedUser } = useContext(ChatContext);

  // Verifica se a tela é menor que o breakpoint `md`
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <PageContainer title="Chat" description="">
      <AppCard>
        <ChatSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
          socket={socket}
        />

        <Box flexGrow={1}>
          {isSmallScreen && !selectedUser ? (
            <ChatListing socket={socket} />
          ) : (
            <ChatContent socket={socket} />
          )}
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default Chats;
