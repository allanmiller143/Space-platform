import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { styled } from '@mui/material/styles';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons';
import './carousel.css';
import { useTheme } from '@mui/material/styles';
import CardImovel from '/src/components/spaceUI/card-imovel/cardImovel';

import user1 from 'src/assets/images/frontend-pages/homepage/user1.jpg';
import user2 from 'src/assets/images/frontend-pages/homepage/user2.jpg';
import user3 from 'src/assets/images/frontend-pages/homepage/user3.jpg';
import user4 from 'src/assets/images/frontend-pages/homepage/user4.jpg';
import user5 from 'src/assets/images/frontend-pages/homepage/user5.jpg';

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={className}
      sx={{
        cursor: 'pointer',
        position: 'absolute',
        top: { xs: 'unset ', sm: '-100px' },
        bottom: { xs: '-60px', sm: 'unset' },
        right: 0,
        backgroundColor: (theme) => theme.palette.grey[100],
        width: '48px',
        height: '48px',
        borderRadius: '50%',
      }}
      onClick={onClick}
    >
      <IconArrowRight />
    </Box>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={className}
      sx={{
        cursor: 'pointer',
        position: 'absolute',
        top: { xs: 'unset ', sm: '-100px' },
        bottom: { xs: '-60px', sm: 'unset' },
        right: '60px',
        backgroundColor: (theme) => theme.palette.grey[100],
        width: '48px',
        height: '48px',
        borderRadius: '50%',
      }}
      onClick={onClick}
    >
      <IconArrowLeft />
    </Box>
  );
}

const LeaderShipCarousel = () => {
  const theme = useTheme();

  const slideStyle = {
    padding: '0 30px', // Adicionar padding entre os slides
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    className: 'slider variable-width',
    centerMode: false,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const UserBox = styled(Box)(() => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : 'white',
    maxWidth: 'calc(100% - 51px)',
    marginLeft: '15px',
    borderRadius: '8px',
    marginTop: '-30px !important',
    boxShadow: '0px 6px 12px rgba(127, 145, 156, 0.12)',
    marginBottom: '10px',
  }));

  return (
    <Slider {...settings} className="leadership-carousel" style={{ marginLeft: '15px' }}>
      <div style={slideStyle}>
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' , paddingRight: '15px' }}>
          <CardImovel
            title="Casa Moderna em Condomínio"
            description="Rua das Flores, 123 - Jardim Primavera"
            imgsrc="/mobiliado/imagem-7.jpg"
          />
        </Grid>
      </div>
      <div style={slideStyle}>
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' , paddingRight: '15px' }}>
          <CardImovel
            title="Casa Moderna em Condomínio"
            description="Rua das Flores, 123 - Jardim Primavera"
            imgsrc="/mobiliado/imagem-7.jpg"
          />
        </Grid>
      </div>
      <div style={slideStyle}>
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' , paddingRight: '15px' }}>
          <CardImovel
            title="Casa Moderna em Condomínio"
            description="Rua das Flores, 123 - Jardim Primavera"
            imgsrc="/mobiliado/imagem-7.jpg"
          />
        </Grid>
      </div>
      <div style={slideStyle}>
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' , paddingRight: '15px' }}>
          <CardImovel
            title="Casa Moderna em Condomínio"
            description="Rua das Flores, 123 - Jardim Primavera"
            imgsrc="/mobiliado/imagem-7.jpg"
          />
        </Grid>
      </div>
      <div style={slideStyle}>
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' , paddingRight: '15px' }}>
          <CardImovel
            title="Casa Moderna em Condomínio"
            description="Rua das Flores, 123 - Jardim Primavera"
            imgsrc="/mobiliado/imagem-7.jpg"
          />
        </Grid>
      </div>
      <div style={slideStyle}>
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' , paddingRight: '15px' }}>
          <CardImovel
            title="Casa Moderna em Condomínio"
            description="Rua das Flores, 123 - Jardim Primavera"
            imgsrc="/mobiliado/imagem-7.jpg"
          />
        </Grid>
      </div>
      
    </Slider>
  );
};

export default LeaderShipCarousel;
