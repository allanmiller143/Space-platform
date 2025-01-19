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
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const content = (
    <>
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
    </>
  );

  return (
<Box 
    sx={{
      height: '100%', // Altura máxima da tela
      maxHeight: '90vh',
      display: 'flex', // Para garantir que os filhos sejam posicionados corretamente
      flexDirection: 'column', // Garantir a direção vertical dos filhos
    }}
  >
    {isSmallScreen ? <AppCard mobile = {true}>{content}</AppCard> : <AppCard>{content}</AppCard>}
  </Box>
  );
};

export default Chats;
