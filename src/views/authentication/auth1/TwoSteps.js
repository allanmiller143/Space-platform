import { useLocation } from 'react-router-dom'; // Importa o useLocation
import { Grid, Box, Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import img1 from 'src/assets/images/backgrounds/login-bg.svg';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthTwoSteps from '../authForms/AuthTwoSteps';
import Footer from '../../../components/landingpage/footer/Footer';

const TwoSteps = () => {
  const location = useLocation(); // Obtém o objeto de localização
  const email = location.state?.email; // Obtém o email do estado de navegação

  return (
    <PageContainer title="Two Steps" description="this is Two Steps page">
      <Grid container spacing={0} justifyContent="center" sx={{ overflowX: 'hidden' }}>
        <Grid
          item
          xs={12}
          sm={12}
          lg={8}
          xl={9}
          sx={{
            position: 'relative',
            '&:before': {
              content: '""',
              background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
              backgroundSize: '400% 400%',
              animation: 'gradient 15s ease infinite',
              position: 'absolute',
              height: '100%',
              width: '100%',
              opacity: '0.3',
            },
          }}
        >
          <Box position="relative">
            <Box px={3}>
              <Logo />
            </Box>
            <Box
              alignItems="center"
              justifyContent="center"
              height={'calc(100vh - 75px)'}
              sx={{
                display: {
                  xs: 'none',
                  lg: 'flex',
                },
              }}
            >
              <img
                src={img1}
                alt="bg"
                style={{
                  width: '100%',
                  maxWidth: '500px',
                }}
              />
            </Box>
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
        >
          <Box p={4}>
            <Typography variant="h4" fontWeight="700">
              Verificação de duas etapas
            </Typography>

            <Typography variant="subtitle1" color="textSecondary" mt={2} mb={1}>
              Nós enviamos um código para o seu Email( {email}). Digite o código no campo abaixo!
              below.
            </Typography>
            <Typography variant="subtitle1" fontWeight="700" mb={1}>
              ****
            </Typography>
            {/* Passe o email como prop para o AuthTwoSteps */}
            {email ? <AuthTwoSteps email={email} /> : <Typography variant="subtitle1" color="textSecondary">Email not provided</Typography>}
          </Box>
        </Grid>
      </Grid>
      <Footer/>
    </PageContainer>
  );
};

export default TwoSteps;
