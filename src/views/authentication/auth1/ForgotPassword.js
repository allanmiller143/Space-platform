import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

import Logo from 'src/layouts/full/shared/logo/Logo';
import PageContainer from 'src/components/container/PageContainer';

import img1 from '/images/posters/imagem-28.jpg';

import AuthForgotPassword from '../authForms/AuthForgotPassword';

const ForgotPassword = () => (
  <PageContainer title="Esqueceu a Senha" description="Recupere o acesso à sua conta">
    <Grid container spacing={0} sx={{ overflowX: 'hidden', minHeight: '100vh' }}>
      <Grid
        item
        xs={12}
        sm={12}
        lg={8}
        xl={9}
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url(${img1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box position="absolute" top={0} left={0} p={3}>
          <Logo />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        lg={4}
        xl={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: 'background.paper',
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box p={4} width="100%" maxWidth="400px">
          <Typography variant="h4" fontWeight="700">
            Esqueceu sua senha?
          </Typography>

          <Typography color="textSecondary" variant="subtitle2" fontWeight="400" mt={2}>
            Por favor, digite o endereço de e-mail associado à sua conta e enviaremos um link para redefinir sua senha.
          </Typography>
          <AuthForgotPassword />
        </Box>
      </Grid>
    </Grid>
  </PageContainer>
);

export default ForgotPassword;
