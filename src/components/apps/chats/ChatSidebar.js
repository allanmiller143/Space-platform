/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Drawer, useMediaQuery } from '@mui/material';
import ChatListing from './ChatListing';
import socket from '../../../Services/socket';

const drawerWidth = 280;

const ChatSidebar = ({ isMobileSidebarOpen, onSidebarClose }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  return (
    <Drawer
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant={lgUp ? 'permanent' : 'temporary'}
      sx={{
        width: drawerWidth,
        display: { xs: 'none', sm: 'block' },
        flexShrink: 0,
        zIndex: lgUp ? 0 : 1,
        [`& .MuiDrawer-paper`]: { position: 'relative' },
      }}
    >
      <ChatListing socket={socket} />
    </Drawer>
  );
};

export default ChatSidebar;
