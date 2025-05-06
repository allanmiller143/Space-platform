/* eslint-disable react/prop-types */
import {Box, CardMedia, Button, Typography, Divider } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

const Preview = ({anuncios, title, label}) => {
  return (
    
    <Box maxWidth="lg" width={'100%'} sx={{ margin: '0 auto', }}>
        <Box>
          <Box mt ={2}> </Box>
          {
            (anuncios.length === 0 || anuncios[0].imageUrl === null ) ? (
              null
            ) : (
              <>
                {title ? <Divider/>: null  }
                <Box display={'flex'} flexDirection={'column'} alignItems={'start'}>
                  <Typography variant="h4" sx={{ mt: 2 }}>{title} </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>{label} </Typography>   
                </Box>
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
                        image={anuncio.imageUrl}
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
                          zIndex: 10000,
                        }}
                        onClick={() => window.open(anuncio.link, '_blank')} // Abre o link em uma nova aba
                      >
                        Saiba mais
                      </Button>

                    </Box>
                  ))}
                </Carousel>
               </>
            )
          }
        </Box>
    </Box>
  );
};

export default Preview;
