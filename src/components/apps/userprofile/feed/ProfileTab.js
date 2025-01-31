/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, Grid, Button, Typography, Container, Stack } from '@mui/material';
import {  IconUserCircle, IconHome, IconAd2, IconMessage, IconCalendarEvent, IconPlus, IconInfoCircle } from '@tabler/icons';
import FriendsCard from 'src/components/apps/userprofile/friends/FriendsCard';
import FollowerCard from 'src/components/apps/userprofile/followers/FollowerCard';
import Feed from './Feed';
import Loading from '../../../Loading/Loading';
import MinhasPublicacoes from './MinhasPublicacoes';



const ProfileTab = ({ email, socket, myPost, setMyPost,userData }) => {
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString);  
  const [value, setValue] = useState(0);


  const handleChange = (event, newValue) => {
    setMyPost([]);
    setValue(newValue);
    setMyPost([]);
  };
  const ProfileTabs = [
    // Condicional para adicionar Feed
    ...(userData.email === currentUserls.email ? [{
      label: 'Feed',
      icon: <IconUserCircle size="20" />,
      component: <Feed email={email} myPost={myPost} setMyPost={setMyPost} userData={userData} />
    }] : []),

    {
      label: userData.email === currentUserls.email ? 'Minhas Publicações' : 'Publicações', 
      icon: <IconUserCircle size="20" />,
      component: <MinhasPublicacoes email={email} myPost={myPost} setMyPost={setMyPost} userData={userData} />
    },

    {
      label: 'Seguindo',
      icon: <IconUserCircle size="20" />,
      component: <FriendsCard userData={userData}  />
    },
    {
      label: 'Seguidores',
      icon: <IconUserCircle size="20" />,
      component: <FollowerCard userData={userData} />
    },

  ];


  return (
    <>
      <Box sx={{ mt: 2, backgroundColor: (theme) => theme.palette.grey[100] }}>
        <Box justifyContent={'end'} alignItems={'center'} display="flex" sx={{ overflow: 'auto',}}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="abas do perfil"
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

      <Grid backgroundColor="transparent" xs={12} sx={{ paddingX: '0 !important' }}>
        {ProfileTabs[value].component}
      </Grid>
    </>
  );
};

export default ProfileTab;
