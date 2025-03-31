import React, { useContext } from 'react';
import { Divider, Grid } from '@mui/material';
import PropertyDetails from './Components/PropertyDetails';
import Form from './Components/Form';
const Step1 = () => {

  return (
    <Grid container spacing={3} sx = {{mt: 3}}>
        <Form/>
        <PropertyDetails/>
    </Grid>
  );
};

export default Step1;