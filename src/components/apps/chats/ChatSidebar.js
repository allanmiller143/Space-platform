/* eslint-disable react/prop-types */
import { Drawer, useMediaQuery } from '@mui/material';
import ChatListing from './ChatListing';
import Teste from './teste';

const drawerWidth = 320;

const ChatSidebar = ({ isMobileSidebarOpen, onSidebarClose, socket }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  return (
    <Drawer
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant={lgUp ? 'permanent' : 'temporary'}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        zIndex: lgUp ? 0 : 1,
        [`& .MuiDrawer-paper`]: { position: 'relative' },
      }}
    >
      <Teste socket={socket}/>
      <ChatListing socket={socket} />
    </Drawer>
  );
};

export default ChatSidebar;
