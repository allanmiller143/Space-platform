/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@mui/material';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';

const AppCard = ({ children, mobile }) => {
  const customizer = useSelector((state) => state.customizer);
  return (
    <>
      {!mobile ?  (
      <Card
        sx={{ display: 'flex', p: 0, height: '100%' }}
        elevation={customizer.isCardShadow ? 9 : 0}
        variant={!customizer.isCardShadow ? 'outlined' : undefined}
      >
        {children}
      </Card>) : 
      <Box sx = {{ display: 'flex', p: 0, height: '100%' }}>
        {children}
      </Box>}
    </>
  );
};

AppCard.propTypes = {
  children: PropTypes.node,
};

export default AppCard;
