/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  InputAdornment,
  MenuItem,
  Button,
  Card,
  Chip,
  CardContent,
  CardMedia,
  CardActions
} from '@mui/material';
import {
  LocationOn as LocationOnIcon,
  Home as HomeIcon,
  Business as BuildingIcon,
  Event as CalendarEventIcon,
  Group as UsersIcon,
  Store as BuildingStoreIcon,
  Headset as HeadsetIcon,
  Apartment as BuildingCommunityIcon,
  Bathtub as BathtubIcon,
  DirectionsCar as DirectionsCarIcon
} from '@mui/icons-material';
import PageContainer from 'src/components/container/PageContainer';
import HpHeader from '../../components/frontend-pages/shared/header/HpHeader';
import Footer from '../../components/frontend-pages/shared/footer';
import ScrollToTop from '../../components/frontend-pages/shared/scroll-to-top';

const HomePage = () => {
  return (
    <PageContainer title="Space iMóveis" description="">
      <HpHeader />
      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
};

export default HomePage;
