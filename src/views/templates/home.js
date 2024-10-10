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
  Button 
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import PageContainer from 'src/components/container/PageContainer';
// import HeaderAlert from '../../components/frontend-pages/shared/header/HeaderAlert';
import HpHeader from '../../components/frontend-pages/shared/header/HpHeader';
import Footer from '../../components/frontend-pages/shared/footer';
import ScrollToTop from '../../components/frontend-pages/shared/scroll-to-top';
import SimpleParallax from "simple-parallax-js";

const HomePage = () => {
  return (
    <PageContainer title="Space iMóveis" description="">
      {/* <HeaderAlert /> */}
      <HpHeader />

      <SimpleParallax>
        <img 
          src="/src/assets/images/posters/imagem-17.jpg" 
          alt="Fundo da página inicial" 
          style={{
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
          }}
        />
      </SimpleParallax>
      <Container 
        maxWidth={false} 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Grid container>
          <Grid item xs={12} md={6} lg={5} xl={4}>
            <Box
              sx={{
                backgroundColor: 'background.paper',
                borderRadius: 2,
                p: 4,
                m: { xs: 2, md: 4 }
              }}
            >
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontSize: '4.5rem', fontWeight: 300, lineHeight: 1.2 }}>
                Encontre um lar para chamar de seu
              </Typography>
              <ToggleButtonGroup
                color="primary"
                value="alugar"
                exclusive
                sx={{ mb: 3, width: '100%', display: 'flex' }}
              >
                <ToggleButton value="alugar" sx={{ width: '100%' }}>Alugar</ToggleButton>
                <ToggleButton value="comprar" sx={{ width: '100%' }}>Comprar</ToggleButton>
              </ToggleButtonGroup>
              <TextField
                fullWidth
                label="Cidade"
                placeholder="Busque por cidade"
                variant="outlined"
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Bairro"
                placeholder="Busque por bairro"
                variant="outlined"
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    select
                    fullWidth
                    label="Valor total até"
                    defaultValue=""
                    variant="outlined"
                  >
                    <MenuItem value="">Escolha o valor</MenuItem>
                    {/* Adicione mais opções conforme necessário */}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    select
                    fullWidth
                    label="Quartos"
                    defaultValue=""
                    variant="outlined"
                  >
                    <MenuItem value="">Nº de quartos</MenuItem>
                    {/* Adicione mais opções conforme necessário */}
                  </TextField>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Buscar Imóveis
              </Button>
            </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f5f5f5',
              padding: '16px',
              borderRadius: '8px',
              marginTop: '24px',
            }}
          >
            <Typography variant="h6" component="h3">
              É proprietário?
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              sx={{ textTransform: 'none' }}
            >
              Veja os serviços para você
            </Button>
          </Box>
          </Grid>
        </Grid>
      </Container>

      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
};

export default HomePage;
