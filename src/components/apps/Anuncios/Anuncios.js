import {Box, Skeleton, CardMedia, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getData, putData } from '../../../Services/Api';

import Banner1 from '../../../assets/images/posters/imagem-8.jpg';
import Banner2 from '../../../assets/images/posters/imagem-9.jpg';

const CarroselCompleto = () => {
  const [loading, setLoading] = useState(false);
  const [anuncios, setAnuncios] = useState([]);
  const navigate = useNavigate();

  const filter = async () => {
    setLoading(true);
    try {
      const response = await getData(`announcement/valid`);
      if (response.status === 200 || response.status === 201) {
        const anunciosFiltrados = response.userInfo.filter(anuncio => anuncio.type === "big");
        setAnuncios(anunciosFiltrados);
        console.log(anunciosFiltrados);
      } else {
        navigate('/error');
      }
    } catch (error) {
      navigate('/error');
    } finally {
      setLoading(false);
    }
  };
  
  async function handleClick (id){
    try{
      const response = await putData(`announcement/view/${id}`);
      console.log(response);
    }catch(error){
      null
    }
  }
  useEffect(() => {
    filter();
  }, []);

  return (
    <Box maxWidth="lg" sx={{ margin: '0 auto', px: { xs: 1, sm: 2 } }}>
      {loading ? (
        <Box>
          {Array.from({ length: 1 }).map((_, index) => (
            <Skeleton
              key={index}
              animation="wave"
              variant="rectangular"
              width="100%"
              height={380}
              sx={{ borderRadius: 1, flex: 1 }}
            />
          ))}
        </Box>
      ) : (
        <Carousel
          animation="slide"
          autoPlay
          indicators
          sx={{ marginTop: 2 }}
          interval={15000}
          indicatorContainerProps={{
            style: {
              display: 'flex',
              justifyContent: 'center',
              marginTop: '16px',
            },
          }}
          indicatorIconButtonProps={{
            style: {
              color: '#ddd',
              margin: '0 4px',
            },
          }}
          activeIndicatorIconButtonProps={{
            style: {
              color: '#1976d2',
            },
          }}
        >
          {anuncios.map((anuncio) => (
            <Box key={anuncio.id} sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="380"
                image={anuncio.photoUrl }
                alt={`Anúncio ${anuncio.id}`}
                sx={{ borderRadius: 1, objectFit: 'fill' }}
              />
              
              {/* Caixa do texto Saiba Mais */}
              <Button
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'primary.main',
                  color: '#fff',
                }}
                onClick={() =>{ window.open(anuncio.siteUrl, '_blank'); handleClick(anuncio.id)}} // Abre o link em uma nova aba
              >
                Saiba mais
              </Button>
            </Box>
          ))}
        </Carousel>
      )}
    </Box>
  );
};

export default CarroselCompleto;
