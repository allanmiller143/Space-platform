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
import {
  LocationOn as LocationOnIcon,
  Home as HomeIcon,
  Business as BuildingIcon,
  Event as CalendarEventIcon,
  Group as UsersIcon,
  Store as BuildingStoreIcon,
  Headset as HeadsetIcon,
  Apartment as BuildingCommunityIcon,
  Bathtub as BathtubIcon,
  DirectionsCar as DirectionsCarIcon
} from '@mui/icons-material';
import PageContainer from 'src/components/container/PageContainer';
import HpHeader from '../../components/frontend-pages/shared/header/HpHeader';
import Footer from '../../components/frontend-pages/shared/footer';
import ScrollToTop from '../../components/frontend-pages/shared/scroll-to-top';
import SimpleParallax from "simple-parallax-js";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HomePage = () => {
  return (
    <PageContainer title="Space iMóveis" description="">
      {/* <HeaderAlert /> */}
      <HpHeader />

      <SimpleParallax>
        <img
          src="/images/posters/imagem-7.jpg"
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

      <Container maxWidth="false" sx={{ py: 4, px: 0, backgroundColor: 'grey.100', paddingRight: '0px !important', paddingLeft: '0px !important' }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ fontSize: '40px', marginBottom: '80px', marginTop: '36px' }}>
          Imóveis em Destaque
        </Typography>


        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={4}
          spaceBetween={30}
          pagination={{ clickable: false }}
          scrollbar={{ draggable: true }}
          className="mySwiper"
          style={{ paddingBottom: '52px', paddingRight: '0 !important' }}
        >
          {[
            'imagem-2.jpg', 'imagem-3.jpg', 'imagem-4.jpg', 'imagem-5.jpg',
            'imagem-6.jpg', 'imagem-7.jpg', 'imagem-8.jpg', 'imagem-9.jpg',
            'imagem-10.jpg', 'imagem-11.jpg', 'imagem-12.jpg', 'imagem-13.jpg',
            'imagem-14.jpg', 'imagem-1.jpg'
          ].map((imagem, index) => (
            <SwiperSlide key={index} style={index === 0 ? { marginLeft: '50px', paddingLeft: 0, paddingRight: 0 } : { paddingLeft: 0, paddingRight: 0 }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`/mobiliado/${imagem}`}
                  alt={`Imóvel em destaque ${index + 1}`}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Apartamento Moderno {index + 1}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Chip icon={<HomeIcon />} label={`${index + 2} Quartos`} size="small" />
                    <Chip icon={<BathtubIcon />} label={`${index + 1} Banheiros`} size="small" />
                    <Chip icon={<DirectionsCarIcon />} label={`${index + 1} Vaga`} size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Área: {100 + index * 10} m²
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rua das Flores, {123 + index} - Jardim Primavera
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Ver Detalhes
                  </Button>
                </CardActions>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

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
                  { icon: "icon-dd-lifebuoy.svg", alt: "Suporte", title: "Ferramenta de Suporte e HelpDesk", description: "Gerencie tickets e chamados relacionados a aluguéis e outras operações." },
                  { icon: "icon-dd-message-box.svg", alt: "Mensagens", title: "Ferramenta de mensagens", description: "Envie e receba mensagens diretamente pela plataforma." },
                  { icon: "icon-inbox.svg", alt: "Caixa de Entrada", title: "Ferramenta de E-mail", description: "Gerencie seus e-mails de forma integrada." },
                  { icon: "icon-office-bag.svg", alt: "Escritório", title: "Ferramenta de Gestão de Imóveis", description: "Publique e gerencie seus anúncios de imóveis com facilidade." },
                  { icon: "icon-office-bag-2.svg", alt: "Escritório 2", title: "CRM Imobiliário", description: "Gerencie todas as operações da sua imobiliária em um só lugar." },
                  { icon: "icon-pie.svg", alt: "Gráfico", title: "Gestão de anúncios e leads multiplataforma", description: "Acompanhe o desempenho dos seus anúncios e leads." },
                  { icon: "icon-tasks.svg", alt: "Tarefas", title: "Ferramenta de Gerenciamento de Tarefas", description: "Organize e gerencie suas tarefas diárias." },
                  { icon: "icon-account.svg", alt: "Conta", title: "Página de perfil público", description: "Crie e gerencie seu perfil público na plataforma." },
                  { icon: "icon-briefcase.svg", alt: "Portfólio", title: "Ferramenta de Portfólio de imóveis", description: "Mantenha um portfólio atualizado dos seus imóveis." },
                  { icon: "icon-connect.svg", alt: "Conectar", title: "Rede social integrada", description: "Conecte-se com corretores e outros usuários através da nossa rede social imobiliária." },
                  { icon: "icon-dd-application.svg", alt: "Aplicação", title: "Marketplace de imóveis", description: "Acesse nosso marketplace de imóveis e encontre as melhores oportunidades." },
                  { icon: "icon-dd-chat.svg", alt: "Bate-papo", title: "Ferramenta de Mensagens", description: "Envie e receba mensagens diretamente pela plataforma." },
                  { icon: "icon-dd-date.svg", alt: "Data", title: "Ferramenta de Agendamentos", description: "Organize visitas a diversos imóveis em diferentes locais." },
                  { icon: "icon-dd-invoice.svg", alt: "Fatura", title: "Ferramenta de Gestão de Faturas", description: "Gerencie suas faturas e pagamentos de forma eficiente." }
                ].map((item, index) => (
                  <Grid item xs={12} md={6} lg={4} key={index}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3, border: 1, borderColor: 'grey.300', boxShadow: 'none', position: 'relative', overflow: 'unset' }}>
                      <div style={{ marginBottom: '10px', width: '60px', height: '60px', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '8px', border: '1px solid #e1e1e1' }}>
                        <img
                          src={`/images/svgs/${item.icon}`}
                          alt={item.alt}
                          style={{ width: '40px', height: 'auto' }}
                        />
                      </div>
                      <Typography variant="h5" component="h3" gutterBottom>
                        {item.title}
                      </Typography>
                      <Chip label="Em breve" color="default" size="small" sx={{ position: 'absolute', top: '-6px', right: '-7px', zIndex: 99, background: '#fff2db', borderRadius: '20px', border: '1px solid #ffdea0', color: '#84652d' }} />
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
                  src="/images/ilustracoes/corretor.jpg"
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
                  src="/images/ilustracoes/imobiliaria.jpg"
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
                  src="/images/ilustracoes/user.jpg"
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
