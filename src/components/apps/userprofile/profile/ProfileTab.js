import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { IconHeart, IconPhoto, IconUserCircle } from '@tabler/icons';
import { Link, useLocation } from 'react-router-dom';

const ProfileTab = () => {
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const ProfileTabs = [
    {
      label: 'Feed',
      icon: <IconUserCircle size="20" />,
      to: '/user-profile',
    },
    {
      label: 'Amigos',
      icon: <IconUserCircle size="20" />,
      to: '/apps/friends',
    },
    {
      label: 'Seguidores',
      icon: <IconHeart size="20" />,
      to: '/apps/followers',
    },
    // {
    //   label: 'Galeria',
    //   icon: <IconPhoto size="20" />,
    //   to: '/apps/gallery',
    // },
  ];

  return (
    <Box mt={1} sx={{ mt: 1, backgroundColor: (theme) => theme.palette.grey[100] }}>
      <Box justifyContent={'end'} display="flex" sx={{ overflow: 'auto', width: { xs: '333px', sm: 'auto' } }}>
        <Tabs value={value} onChange={handleChange} aria-label="exemplo de abas rolantes com prevenção" variant="scrollable"
          scrollButtons="auto">
          {ProfileTabs.map((tab) => {
            return (
              <Tab
                iconPosition="start"
                label={tab.label}
                sx={{ minHeight: '50px' }}
                icon={tab.icon}
                component={Link}
                to={tab.to}
                value={tab.to}
                key={tab.label}
              />
            );
          })}
        </Tabs>
      </Box>
    </Box>
  );
};

export default ProfileTab;
