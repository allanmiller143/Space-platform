import React from 'react';
import { Box, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';

const AlbumSections = () => {
  const sections = [
    {
      title: 'Imóveis de Luxo',
      description: 'Explore as melhores opções de imóveis de luxo para venda.',
      img: 'https://i.pinimg.com/736x/24/37/79/24377982804aaf0ffaee58e37ab3fbad.jpg',
      gridSize: 8,
    },
    {
      title: 'Casas para Aluguel',
      description: 'Encontre casas disponíveis para aluguel.',
      img: 'https://i.pinimg.com/736x/35/f9/0e/35f90ef20fa3981ecd4aa54188efab27.jpg',
      gridSize: 4,
    },
    {
      title: 'Apartamentos Modernos',
      description: 'Apartamentos modernos e sofisticados em diversas regiões.',
      img: 'https://i.pinimg.com/736x/88/26/04/8826043e1450f6ed4ed54f3501d4ff32.jpg',
      gridSize: 8,
    },
    {
      title: 'Terrenos à Venda',
      description: 'Terrenos para construção, com localização privilegiada.',
      img: 'https://i.pinimg.com/736x/35/f9/0e/35f90ef20fa3981ecd4aa54188efab27.jpg',
      gridSize: 4,
    },
    {
      title: 'Fazendas e Chácaras',
      description: 'Propriedades rurais com grande área e natureza exuberante.',
      img: 'https://i.pinimg.com/736x/0f/d9/6f/0fd96fcbbd7403ab4f016d7cbe564be9.jpg',
      gridSize: 8,
    },
  ];

  return (
    <Box sx={{ padding: { xs: 2, sm: 4 }, marginTop: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 4 }}>
        Seções de Imóveis
      </Typography>

      <Grid container spacing={3}>
        {sections.map((section, index) => (
          <Grid item xs={12} sm={6} md={section.gridSize} key={index}>
            <Box
              sx={{
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: 3,
                position: 'relative',
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.3s ease-in-out',
                },
              }}
            >
              <CardMedia
                component="img"
                image={section.img}
                alt={section.title}
                sx={{
                  height: 200,
                  objectFit: 'cover',
                  transition: 'filter 0.3s ease',
                  filter: 'brightness(0.4)' 
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
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: '15px',
                  opacity: 0,
                  transition: 'opacity 0.3s ease-in-out',
                  opacity: 1 
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    textShadow: '1px 1px 5px rgba(0, 0, 0, 0.8)',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                  }}
                >
                  {section.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'white',
                    marginTop: 1,
                    textAlign: 'center',
                    maxWidth: '80%',
                    fontSize: '14px',
                    opacity: 0.8,
                  }}
                >
                  {section.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AlbumSections;
