/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Tabs, Tab, Box, Grid } from '@mui/material';
import { IconHeart, IconUserCircle } from '@tabler/icons';
import FriendsCard from 'src/components/apps/userprofile/friends/FriendsCard';
import FollowerCard from 'src/components/apps/userprofile/followers/FollowerCard';
import Feed from 'src/components/apps/userprofile/feed/Feed';

// Componentes de exemplo


const ProfileTab = ({ email }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const ProfileTabs = [
    {
      label: 'Feed',
      icon: <IconUserCircle size="20" />,
      component: <Feed/>
    },
    {
      label: 'Amigos',
      icon: <IconUserCircle size="20" />,
      component: <FriendsCard/>
    },
    {
      label: 'Seguidores',
      icon: <IconHeart size="20" />,
      component: <FollowerCard/>
    },

  ];

  return (
    <>
      <Box sx={{ mt: 2,backgroundColor: (theme) => theme.palette.grey[100] }}>
        <Box justifyContent={'end'} display="flex" sx={{ overflow: 'auto', width: { xs: '333px', sm: 'auto' } }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="profile tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            {ProfileTabs.map((tab, index) => (
              <Tab
                iconPosition="start"
                label={tab.label}
                sx={{ minHeight: '50px' }}
                icon={tab.icon}
                value={index}
                key={tab.label}
              />
            ))}
          </Tabs>
        </Box>
      </Box>

      {/* Renderiza o componente selecionado */}
      <Grid  backgroundColor = "transparent" sm={12}>
        {ProfileTabs[value].component}
      </Grid>
    </>
  );
};

export default ProfileTab;
