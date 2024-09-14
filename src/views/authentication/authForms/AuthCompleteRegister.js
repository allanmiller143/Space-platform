/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, Typography, Button, Divider, Stepper, Step, StepLabel, StepContent, Radio, RadioGroup, FormControlLabel, Card, CardContent, Avatar, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { Stack } from '@mui/system';
import AuthSocialButtons from './AuthSocialButtons';

const AuthCompleteRegister = ({ title, subtitle, subtext }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedType, setSelectedType] = useState('');

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    // Lógica para finalizar o cadastro
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const typeCards = [
    {
      title: 'Comprador',
      description: 'Procuro imóveis para comprar',
      avatar: '/images/profile/user-1.jpg',
    },
    {
      title: 'Vendedor',
      description: 'Quero vender meus imóveis',
      avatar: '/images/profile/user-2.jpg',
    },
    {
      title: 'Corretor',
      description: 'Sou um profissional do mercado imobiliário',
      avatar: '/images/profile/user-3.jpg',
    },
  ];

  const steps = [
    {
      label: 'Dados Básicos',
      content: (
        <>
          <Stack mb={3}>
            <CustomFormLabel htmlFor="name">Nome</CustomFormLabel>
            <CustomTextField id="name" variant="outlined" fullWidth />
            <CustomFormLabel htmlFor="email">Endereço de Email</CustomFormLabel>
            <CustomTextField id="email" variant="outlined" fullWidth />
            <CustomFormLabel htmlFor="password">Senha</CustomFormLabel>
            <CustomTextField id="password" variant="outlined" fullWidth type="password" />
          </Stack>
          <Box mt={3}>
            <Divider>
              <Typography
                component="span"
                color="textSecondary"
                variant="h6"
                fontWeight="400"
                position="relative"
                px={2}
              >
                ou cadastre-se com
              </Typography>
            </Divider>
          </Box>
          <Box mt={1}>
            <AuthSocialButtons title="Cadastre-se com" />
          </Box>
        </>
      ),
    },
    {
      label: 'Tipo',
      content: (
        <Box>
          <Typography variant="h5" align="center" gutterBottom>
            Escolha o seu perfil
          </Typography>
          <Grid container spacing={3}>
            {typeCards.map((card, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    border: selectedType === card.title ? '2px solid #1976d2' : 'none',
                    '&:hover': { boxShadow: 3 },
                  }}
                  onClick={() => setSelectedType(card.title)}
                >
                  <CardContent>
                    <Avatar src={card.avatar} sx={{ height: 80, width: 80, mb: 2 }}></Avatar>
                    <Stack direction="row" spacing={2}>
                      <Box>
                        <Typography variant="h6" mb={1}>
                          {card.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {card.description}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack spacing={2} mt={3}>
                      <Button
                        size="large"
                        variant={selectedType === card.title ? "contained" : "outlined"}
                        color="primary"
                        fullWidth
                      >
                        {selectedType === card.title ? "Selecionado" : "Selecionar"}
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ),
    },
    {
      label: 'Informações Adicionais',
      content: (
        <Box>
          {/* Área em branco para futura implementação */}
        </Box>
      ),
    },
  ];

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <Box mt={3} sx={{ minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
        <Box flex={1}>
          {steps[activeStep].content}
        </Box>
        <Box mt={2} sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Voltar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}
          >
            {activeStep === steps.length - 1 ? 'Finalizar Cadastro' : 'Próximo'}
          </Button>
        </Box>
        <Stepper 
          activeStep={activeStep} 
          alternativeLabel 
          sx={{ mt: 3 }}
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthCompleteRegister;
