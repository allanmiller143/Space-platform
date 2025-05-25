import { Link } from 'react-router-dom';
import { Grid, Box, Stack, Typography, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import AuthLogin from '../authForms/AuthLogin';
import HpHeader from '../../../components/frontend-pages/shared/header/HpHeader';
import Footer from '../../../components/landingpage/footer/Footer';
import { Cancel } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AskLoginType from './AskLoginType';
const Login = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <PageContainer title="Login" description="Acesse sua conta">
      <HpHeader/>
      <Grid
        container
        spacing={0}
        sx={{
          overflowX: 'hidden',
          minHeight: '100vh',
        }}
      >
        <Grid
          item
          xs={0}
          sm={0}
          lg={7}
          xl={8}
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: 'url("/images/posters/imagem-9.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box position="absolute" top={0} left={0} p={3}>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          lg={5}
          xl={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            backgroundColor: 'background.paper',
            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box px={4} py ={0} width="100%" maxWidth="400px">
            <AuthLogin
              title="Bem-vindo de volta"
              subtext={
                <Typography variant="subtitle1" color="textSecondary" mb={1}>
                  Entre para continuar
                </Typography>
              }
              subtitle={
                <Stack direction="row" spacing={1} mt={3}>
                  <Typography color="textSecondary" variant="h6" fontWeight="500">
                    Novo no Space iMóveis?
                  </Typography>
                  <Typography
                    onClick={() => {setOpen(true)}}
                    to="/auth/register2"
                    fontWeight="500"
                    sx={{
                      textDecoration: 'none',
                      color: 'primary.main',
                      cursor: 'pointer',
                    }}
                  >
                    Crie uma conta
                  </Typography>
                </Stack>
              }
            />
          </Box>
        </Grid>
      </Grid>
      <Footer/>
      <AskLoginType open={open} setOpen={setOpen}/>
    </PageContainer>
  );
}

export default Login;
