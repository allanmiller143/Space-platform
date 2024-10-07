/* eslint-disable react/prop-types */
import { Box, Drawer, useMediaQuery } from '@mui/material';
import { Avatar, Divider, Typography } from 'antd';

const drawerWidth = 320;

const ChatInsideSidebar = ({ isInSidebar, setIsInSidebar }) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  return (
    <Drawer
      anchor="right"
      open={isInSidebar}
      onClose={() => setIsInSidebar(false)} // Close drawer when clicked outside or swiped
      variant={lgUp ? 'persistent' : 'temporary'} // Persistent on large screens, temporary on small
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderLeft: `1px solid`,
          borderColor: (theme) => theme.palette.divider,
          boxShadow: lgUp ? null : (theme) => theme.shadows[8],
        },
      }}
    >
      <Box p={3} textAlign="center">
        <Avatar sx={{ width: 150, height: 150, mx: 'auto' }} />
        <Typography variant="h6" mt={2}>
          Erick Nobre
        </Typography>
        <Typography variant="body2" color="text.secondary">
          +55 19 98219-1934
        </Typography>
      </Box>

      <Divider />

      {/* Media Section */}
      <Box p={2}>
        <Typography variant="subtitle1" gutterBottom>
          Mídia, links e docs
        </Typography>
        {/* Placeholder for media thumbnails */}
        <Box display="flex" overflow="auto">
          <Box
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'grey.300',
              mr: 1,
              borderRadius: 2,
            }}
          />
          <Box
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'grey.300',
              mr: 1,
              borderRadius: 2,
            }}
          />
          <Box
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'grey.300',
              borderRadius: 2,
            }}
          />
        </Box>
      </Box>
    </Drawer>
  );
};

export default ChatInsideSidebar;
