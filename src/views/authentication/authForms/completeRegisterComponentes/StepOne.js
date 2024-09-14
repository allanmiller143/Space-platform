/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { Box, Typography, Button, Stepper, Step, StepLabel, Grid, Card, CardContent, Avatar, Stack, TextField, Paper, Select, MenuItem } from '@mui/material';

const StepOne = ( { selectedType,setSelectedType,formData,setFormData}) => {

  const typeCards = [
    {
      title: 'Vendedor',
      description: 'Quero vender/alugar meus imóveis',
      avatar: '/images/profile/user-1.jpg',
    },
    {
      title: 'Corretor',
      description: 'Sou um profissional do mercado imobiliário',
      avatar: '/images/profile/user-2.jpg',
    },
    {
      title: 'Imobiliária',
      description: 'Sou uma empresa do mercado imobiliário',
      avatar: '/images/profile/user-3.jpg',
    },
  ];

  const handleTypeSelection = (type) => {
    setSelectedType(type);
    setFormData({ ...formData, type: type });
  };

  return (
    <>
        <Box>
          <Typography variant="h5" align="center" gutterBottom mb={6}>
            Selecione o tipo de conta
          </Typography>
          <Grid container spacing={3} mb = {6}>
            {typeCards.map((card, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    border: selectedType === card.title ? '2px solid #1976d2' : 'none',
                    '&:hover': { boxShadow: 10 },
                  }}
                  onClick={() => handleTypeSelection(card.title)}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar src={card.avatar} sx={{ height: 80, width: 80, margin: 'auto' }} />
                    <Typography variant="h6" mt={2}>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
    </>
  );
};

export default StepOne;
