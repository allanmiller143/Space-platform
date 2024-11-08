/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import  { useState } from 'react';
import { Box } from '@mui/material';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import ChatSidebar from '../../../components/apps/chats/ChatSidebar';
import ChatContent from '../../../components/apps/chats/ChatContent';
import AppCard from 'src/components/shared/AppCard';

const Chats = ({ socket }) => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <PageContainer title="Chat" description="">
      <AppCard>
        <ChatSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
          socket={socket}
        />
        <Box flexGrow={1} >
          <ChatContent toggleChatSidebar={() => setMobileSidebarOpen(true)} socket={socket} />
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default Chats;
