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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import BuildingIcon from '@mui/icons-material/Business';
import CalendarEventIcon from '@mui/icons-material/Event';
import UsersIcon from '@mui/icons-material/Group';
import BuildingStoreIcon from '@mui/icons-material/Store';
import HeadsetIcon from '@mui/icons-material/Headset';
import BuildingCommunityIcon from '@mui/icons-material/Apartment';
import BathtubIcon from '@mui/icons-material/Bathtub';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
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
          src="/src/assets/images/posters/imagem-7.jpg"
          alt="Fundo da página inicial"
          style={{
            width: '100%',
            height: '575px',
            objectFit: 'cover',
            objectPosition: 'top',
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
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontSize: '2.5rem', fontWeight: 'bold', lineHeight: 1.2 }}>
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
                m: { xs: 2, md: 4 }
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

      <Box sx={{ backgroundColor: 'primary.main', color: 'white', py: 5, borderRadius: 0 }}>
        <Container maxWidth="lg">
          <Grid container alignItems="center" spacing={4} pb={4}>
            <Grid item xs={12} lg={8}>
              <Typography variant="overline" color="primary" sx={{ mb: 2, display: 'block' }}>Imóveis à venda</Typography>
              <Typography variant="h3" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
                Realize o sonho da casa própria
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Nossos consultores estão prontos para ajudar você a obter as melhores taxas de financiamento, esclarecer todas as suas dúvidas e oferecer suporte durante todo o processo de compra.
              </Typography>
            </Grid>
            <Grid item xs={12} lg="auto" sx={{ marginLeft: { lg: 'auto' }, display: 'flex', alignItems: 'center' }}>
              <Button variant="outlined" color="inherit" startIcon={<HomeIcon />} sx={{ py: 1, px: 2 }}>
                Como comprar com a Space
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ width: '100%', backgroundColor: '#f5f5f5', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Imóveis em Destaque
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image="/src/assets/images/imoveis/imovel-1.jpg"
                  alt="Imóvel em destaque"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Apartamento Moderno
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Chip icon={<HomeIcon />} label="3 Quartos" size="small" />
                    <Chip icon={<BathtubIcon />} label="2 Banheiros" size="small" />
                    <Chip icon={<DirectionsCarIcon />} label="1 Vaga" size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Área: 120 m²
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rua das Flores, 123 - Jardim Primavera
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Ver Detalhes
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 5, lg: 8 } }}>
        <Container maxWidth="lg">
          <Grid container alignItems="center" spacing={4} mb={3}>
            <Grid item xs={12} xl={12}>
              <Typography variant="overline" color="primary">Quem somos</Typography>
              <Typography variant="h3" component="h2" color="text.primary" mb={2} sx={{ fontSize: '4rem', lineHeight: 1.2 }}>
                Uma plataforma que conecta pessoas ao mercado imobiliário
              </Typography>
            </Grid>
            <Grid item xs={12} xl={12}>
              <Grid container spacing={3}>
                {[
                  {
                    title: "Gestão de Imóveis",
                    description: "Publique e gerencie seus anúncios de imóveis com facilidade.",
                    icon: <BuildingIcon />
                  },
                  {
                    title: "Agendamentos",
                    description: "Organize visitas a diversos imóveis em diferentes locais.",
                    icon: <CalendarEventIcon />
                  },
                  {
                    title: "SpaceHub",
                    description: "Conecte-se com corretores e outros usuários através da nossa rede social imobiliária.",
                    icon: <UsersIcon />
                  },
                  {
                    title: "CRM Imobiliário",
                    description: "Gerencie todas as operações da sua imobiliária em um só lugar.",
                    icon: <BuildingStoreIcon />
                  },
                  {
                    title: "HelpDesk",
                    description: "Gerencie tickets e chamados relacionados a aluguéis e outras operações.",
                    icon: <HeadsetIcon />
                  },
                  {
                    title: "Classificados de Imóveis",
                    description: "Acesse nosso marketplace de imóveis e encontre as melhores oportunidades.",
                    icon: <BuildingCommunityIcon />
                  }
                ].map((item, index) => (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3, border: 1, borderColor: 'grey.300', boxShadow: 'none' }}>
                      <Box sx={{ mb: 2, color: 'primary.main' }}>
                        {item.icon}
                      </Box>
                      <Typography variant="h5" component="h3" gutterBottom>
                        {item.title}
                      </Typography>
                      <Chip label="Em breve" color="primary" size="small" sx={{ mb: 2, alignSelf: 'flex-start' }} />
                      <Typography variant="body1">{item.description}</Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ bgcolor: 'background.default', width: '100%', borderRadius: 0 }}>
     
        <Box sx={{ bgcolor: 'background.paper', py: 5, textAlign: 'center', color: 'text.secondary' }}>
          <Container maxWidth="lg" sx={{ py: 5 }} mb={4}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={3}>
                <img
                  src="/src/assets/images/ilustracoes/corretor.jpg"
                  alt="Imobiliárias e Corretores"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                  }}
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>
                    Para Corretores
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'light', mb: 4 }}>
                    Potencialize seus negócios imobiliários com nossa plataforma completa. Gerencie propriedades, acompanhe leads e feche mais negócios com eficiência. Nossa solução é projetada para atender às necessidades específicas do mercado imobiliário.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<BuildingIcon />}
                    sx={{ py: 1, px: 3 }}
                  >
                    Saiba Mais
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>

          <Container maxWidth="lg" sx={{ py: 5 }} mb={4}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={3}>
                <img
                  src="/src/assets/images/ilustracoes/imobiliaria.jpg"
                  alt="Imobiliárias e Corretores"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                  }}
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>
                    Para Imobiliárias
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'light', mb: 4 }}>
                    Potencialize seus negócios imobiliários com nossa plataforma completa. Gerencie propriedades, acompanhe leads e feche mais negócios com eficiência. Nossa solução é projetada para atender às necessidades específicas do mercado imobiliário.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<BuildingIcon />}
                    sx={{ py: 1, px: 3 }}
                  >
                    Saiba Mais
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>

          <Container maxWidth="lg" sx={{ py: 5 }} mb={4}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={3}>
                <img
                  src="/src/assets/images/ilustracoes/user.jpg"
                  alt="Imobiliárias e Corretores"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                  }}
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 2 }}>
                    Para quem quer comprar e vender
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'light', mb: 4 }}>
                    Potencialize seus negócios imobiliários com nossa plataforma completa. Gerencie propriedades, acompanhe leads e feche mais negócios com eficiência. Nossa solução é projetada para atender às necessidades específicas do mercado imobiliário.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<BuildingIcon />}
                    sx={{ py: 1, px: 3 }}
                  >
                    Saiba Mais
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>

      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
};

export default HomePage;
