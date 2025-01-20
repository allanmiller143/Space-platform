import { Box, Grid, Typography, CardActionArea, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import marketplaceContext from '../../../views/apps/marketplace/MarketplaceContext/MarketplaceContext';
import { useContext } from 'react';

const Filtros = () => {
  const {    
    currentPage, setCurrentPage,itemsPerPage,
    loading, setLoading,
    totalItens, setTotalItens,
    properties, setProperties,
    drawerOpen, setDrawerOpen,
    navigate, formData, setFormData,
} = useContext(marketplaceContext);

  const cardData = [
    {
      title: 'Casas',
      image: 'https://i.pinimg.com/736x/24/37/79/24377982804aaf0ffaee58e37ab3fbad.jpg',
      type: 'house',
    },
    {
      title: 'Apartamentos',
      image: 'https://i.pinimg.com/736x/68/73/00/68730063cf83e061f6ab7af5dc865f7a.jpg',
      type: 'apartment',
    },
    {
      title: 'Terrenos',
      image: 'https://i.pinimg.com/736x/62/68/cb/6268cbf29f2bd398b9536506f9dbea96.jpg',
      type: 'land',
    },
    {
      title: 'Fazendas',
      image: 'https://i.pinimg.com/736x/82/27/3b/82273b0f0cc296c0793b7e0eaf71689e.jpg',
      type: 'farm',
    },
  ];

  return (
    <Box maxWidth={'lg'} sx={{ margin: '0 auto', px : {xs : 1, sm: 2}, }}>
      <Typography variant="h4" sx={{ fontSize: { xs: '1rem', sm: '1.5rem' }, mt: 2, mb: 0 }}>
        Escolha o tipo de imóvel
      </Typography>
      <Box sx={{ py : 2, textAlign: 'center' }}>
        <Grid container spacing={1}>
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  height: { xs: 50, sm: 200 },
                  borderRadius: 1, // Bordas arredondadas
                  transition: 'transform 0.3s ease-in-out', // Animação de escala
                  '&:hover': {
                    transform: 'scale(1.05)', // Aumenta o card no hover
                  },
                }}
              >
                <CardActionArea
                  onClick={() => {setFormData({ ...formData, propertyType: card.type }); navigate('/marketplace');}}
                  sx={{
                    height: '100%',
                    borderRadius: 'inherit', // Respeita o raio das bordas do Card
                  }}
                >
                  {/* Background Image */}
                  <CardMedia
                    component="img"
                    image={card.image}
                    alt={card.title}
                    sx={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.5)',
                      transition: 'filter 0.3s ease-in-out',
                      '&:hover': { filter: 'brightness(0.1)' },
                    }}
                  />
                  {/* Overlay Text */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        textShadow: '1px 1px 8px rgba(0, 0, 0, 0.8)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {card.title}
                    </Typography>
                  </Box>
                </CardActionArea>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Filtros;
