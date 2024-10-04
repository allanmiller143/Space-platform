/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import  { useState } from 'react';
import { Divider, Box } from '@mui/material';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import ChatSidebar from '../../../components/apps/chats/ChatSidebar';
import ChatContent from '../../../components/apps/chats/ChatContent';
import ChatMsgSent from '../../../components/apps/chats/ChatMsgSent';
import AppCard from 'src/components/shared/AppCard';

const Chats = ({ socket }) => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <PageContainer title="Chat" description="Converse com corretores, proprietários e imobiliárias">
      <Breadcrumb title="Mensagens" subtitle="Converse com corretores, proprietários e imobiliárias" />
      <AppCard>
        <ChatSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
          socket={socket}
        />
        {/* <Box flexGrow={1}>
          <ChatContent toggleChatSidebar={() => setMobileSidebarOpen(true)} />
          <Divider />
          <ChatMsgSent />
        </Box> */}
      </AppCard>
    </PageContainer>
  );
};

export default Chats;
