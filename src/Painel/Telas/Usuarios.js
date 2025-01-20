/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Box, Grid } from '@mui/material';
import { useContext, useState } from 'react';
import NotificationContext from '../../Services/Notification/NotificationContext/NotificationContext';
import DashBoardSeenGraphic from '../Componentes/Usuarios/DashBoardSeenGraphic';
import UsersTable from '../Componentes/Usuarios/UsersTable';
import Cards from '../Componentes/Usuarios/Cards';
import StatsCards from '../Componentes/Usuarios/StatsCards';
import MapWithMarkers from '../Componentes/Usuarios/MapWithMarkers';

const Usuarios = () => {
  const { socket } = useContext(NotificationContext);

  return (
    <Box maxWidth="lg" margin="0 auto" padding={3}>
      <Grid container spacing={6}>
        {/* Cards Section */}
        <Grid item xs={12}>
          <Cards />
        </Grid>



        {/* Users Table Section */}
        <Grid item xs={12}>
          <UsersTable socket={socket} />
        </Grid>

        {/* Graphics and Map Section */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}>
              <DashBoardSeenGraphic />
            </Grid>
            <Grid item xs={12} md={5}>
              <MapWithMarkers />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Usuarios;
