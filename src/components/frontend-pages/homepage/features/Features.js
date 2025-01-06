import { Box, Stack, Typography, Grid, Container } from '@mui/material';
import icon1 from 'src/assets/images/svgs/icon-briefcase.svg';
import FeatureApp from 'src/assets/images/frontend-pages/homepage/feature-apps.png';
import IconBubble from 'src/assets/images/svgs/icon-speech-bubble.svg';
import IconFav from 'src/assets/images/svgs/icon-favorites.svg';
import PostarImovelCard from './PostarImovelCard';

const Features = () => {
  return (
    <Box pb={5}>
      <Container maxWidth="lg">
        <Grid container spacing={3} mt={3}>
          <Grid item xs sm={6} lg>
            <Box mb={3} bgcolor="warning.light" borderRadius="24px">
              <Box px={4} py="65px">
                <Stack direction="column" spacing={2} textAlign="center">
                  <Box textAlign="center">
                    <img src={icon1} alt="icon1" width={40} height={40} />
                  </Box>
                  <Typography variant="h6" fontWeight={700}>
                    Ferramentas para Corretagem
                  </Typography>
                  <Typography variant="body1">
                    Use ferramentas que te ajudam a impultar seus imóveis, garantindo que seus clientes sejam atendidos de forma eficiente.
                  </Typography>
                </Stack>
              </Box>
            </Box>

            
            <Box textAlign="center" mb={3} bgcolor="secondary.light" borderRadius="24px">
              <Box px={4} py="50px">
                <Stack direction="column" spacing={2} textAlign="center">
                  <Typography variant="h6" fontWeight={700}>
                    Imóveis para Todos os Gostos                  </Typography>
                  <Typography variant="body1">
                    {' '}
                    Escolha entre uma variedade de imóveis que atendem às suas preferências e necessidades.
                  </Typography>
                </Stack>
              </Box>
              <Box height="70px">
                <img src={FeatureApp} alt="icon1" width={250} height={70} />
              </Box>
            </Box>
          </Grid>
          <PostarImovelCard/>

          <Grid
            item
            xs
            sm={6}
            lg
            sx={{
              order: {
                xs: 2,
                lg: 3,
              },
            }}
          >
            <Box textAlign="center" mb={3} bgcolor="success.light" borderRadius="24px">
              <Box px={4} py="65px">
                <Stack direction="column" spacing={2} textAlign="center">
                  <Box textAlign="center">
                    <img src={IconBubble} alt="icon1" width={40} height={40} />
                  </Box>
                  <Typography variant="h6" fontWeight={700}>
                    Chat interno
                  </Typography>
                  <Typography variant="body1">
                    {' '}
                    Comunicação com seus clientes de forma eficiente e eficaz.
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Box textAlign="center" mb={3} bgcolor="error.light" borderRadius="24px">
              <Box px={4} py="65px">
                <Stack direction="column" spacing={2} textAlign="center">
                  <Box textAlign="center">
                    <img src={IconFav} alt="icon1" width={40} height={40} />
                  </Box>
                  <Typography variant="h6" fontWeight={700}>
                    Sistema de agendamento
                  </Typography>
                  <Typography variant="body1">
                    {' '}
                    Cadastre seus horários de disposição para visitas e agendamentos, e deixe os seus clientes agendados.
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
