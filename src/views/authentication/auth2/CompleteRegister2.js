import { useState, useEffect } from 'react';
import { Grid, Box, Card, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Ícone de voltar
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthCompleteRegister from '../authForms/AuthCompleteRegister';
import BackScreenAdviceDialog from '../authForms/completeRegisterComponentes/BackScreenAdviceDialog';

const CompleteRegister2 = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  const images = [
    '/images/posters/imagem-28.jpg',
    '/images/posters/imagem-29.jpg',
    '/images/posters/imagem-30.jpg',
    '/images/posters/imagem-31.jpg',
    '/images/posters/imagem-32.jpg',
    '/images/posters/imagem-10.jpg',
    '/images/posters/imagem-11.jpg',
    '/images/posters/imagem-19.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Função para navegar para a página anterior
  const handleGoBack = () => {
    setOpenDialog(true);
  };

  return (
    <PageContainer title="Registro" description="Esta é a página de Registro">
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh', // Permite o conteúdo expandir verticalmente
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: index === currentImageIndex ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
            }}
          />
        ))}
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{
            minHeight: '100vh', // Permite que o conteúdo cresça verticalmente
            position: 'relative',
            zIndex: 1,
            overflowY: 'auto', // Permite rolagem
          }}
        >
          <Grid
            item
            xs={11}
            sm={11}
            md={10}
            lg={8}
            xl={6}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{
                p: { xs: 2, sm: 4 }, // Ajusta o padding em dispositivos móveis
                m: 3,
                zIndex: 1,
                width: '100%',
                maxWidth: { xs: '90%', sm: '80%', md: '70%', lg: '800px' }, // Responsividade da largura do Card
                minWidth: { xs: '100%', sm: 'auto' }, // Ajuste para largura mínima
                minHeight: { xs: 'auto', lg: '700px' }, // Ajuste para altura mínima em telas grandes
              }}
            >
              {/* Container para o botão de voltar e a logo */}
              <Box display="flex" alignItems="center" justifyContent="center" mb={3} sx={{ position: 'relative' }}>
                <Box position="absolute" top={0} left={0} pt={2}>
                  <IconButton onClick={handleGoBack} sx={{ color: 'primary.main' }}>
                    <ArrowBackIcon />
                  </IconButton>
                </Box>
                <Logo />
              </Box>
              <AuthCompleteRegister/>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <BackScreenAdviceDialog openDialog={openDialog} setOpenDialog={setOpenDialog}/>
    </PageContainer>
  );
};

export default CompleteRegister2;
