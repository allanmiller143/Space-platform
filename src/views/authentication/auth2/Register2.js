import  { useState, useEffect } from 'react';
import { Grid, Box, Card, } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
//import AuthRegister from '../authForms/AuthRegister';
import AuthSimpleRegister from '../authForms/AuthSimpleRegister';

const Register2 = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    '/src/assets/images/posters/imagem-28.jpg',
    '/src/assets/images/posters/imagem-29.jpg',
    '/src/assets/images/posters/imagem-30.jpg',
    '/src/assets/images/posters/imagem-31.jpg',
    '/src/assets/images/posters/imagem-32.jpg',
    '/src/assets/images/posters/imagem-10.jpg',
    '/src/assets/images/posters/imagem-11.jpg',
    '/src/assets/images/posters/imagem-19.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <PageContainer title="Registro" description="Esta é a página de Registro">
      <Box
        sx={{
          position: 'relative',
          height: '100vh',
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
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100%', position: 'relative', zIndex: 1 }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={5}
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, m: 3, zIndex: 1, width: '100%', maxWidth: '800px', minWidth: '800px', minHeight: '700px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <AuthSimpleRegister />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Register2;
