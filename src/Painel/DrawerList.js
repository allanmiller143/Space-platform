import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function DrawerList() {
  const [open, setOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState('Home'); // Estado para armazenar a página atual

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleListItemClick = (page) => {
    setSelectedPage(page); // Atualiza a página selecionada
    setOpen(false); // Fecha o drawer após o clique
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {['Home', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleListItemClick(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleListItemClick(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const renderPageContent = () => {
    switch (selectedPage) {
      case 'Home':
        return <Typography variant="h4">Welcome to the Home Page!</Typography>;
      case 'Starred':
        return <Typography variant="h4">Here are your starred items!</Typography>;
      case 'Send email':
        return <Typography variant="h4">Compose a new email here!</Typography>;
      case 'Drafts':
        return <Typography variant="h4">View your saved drafts!</Typography>;
      case 'All mail':
        return <Typography variant="h4">All your emails are here!</Typography>;
      case 'Trash':
        return <Typography variant="h4">Check your trash items!</Typography>;
      case 'Spam':
        return <Typography variant="h4">These are your spam emails!</Typography>;
      default:
        return <Typography variant="h4">Page not found</Typography>;
    }
  };

  return (
    <div>
      <IconButton color="primary" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Box sx={{ padding: 2 }}>{renderPageContent()}</Box>
    </div>
  );
}
