/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { styled } from '@mui/material/styles';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons';
import './carousel.css';
import { useTheme } from '@mui/material/styles';
import CardImovel from '/src/components/spaceUI/card-imovel/cardImovel';
import Loading from 'src/components/Loading/Loading';
import { putData } from 'src/Services/Api';
import { toast } from 'sonner';


function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <Box
      className={className}
      sx={{
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        right: '-55px', // Offset from the right side
        transform: 'translateY(-50%)',
        backgroundColor: (theme) => theme.palette.grey[100],
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1, // Make sure the arrow is on top of the slider content
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
      className={className}
      sx={{
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        left: '-55px', // Offset from the left side
        transform: 'translateY(-50%)',
        backgroundColor: (theme) => theme.palette.grey[100],
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1, // Make sure the arrow is on top of the slider content
      }}
      onClick={onClick}
    >
      <IconArrowLeft />
    </Box>
  );
}
const LeaderShipCarousel = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);

  const filter = async () => {
    setLoading(true); 
    try {
      const response = await putData(`properties/filter?page=${1}&verified=true`, {});
      if (response.status === 200 || response.status === 201) {
        setProperties(response.data.result);
        console.log(response.data.result);
      } else {
        toast.error(`Erro ao buscar as propriedades:\n ${response.message}`);
      }
    } catch (error) {
      toast.error(`Erro ao buscar as propriedades:\n ${error.message}`);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    filter();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          nextArrow: null,
          prevArrow: null,
          arrows: false,
        },
      },
      {
        breakpoint: 1130,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          nextArrow: null,
          prevArrow: null,
          arrows: false,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          nextArrow: null,
          prevArrow: null,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          nextArrow: null,
          prevArrow: null,
          arrows: false,
          centerMode: true,
        },
      },
    ],
  };

  
  if (loading) {
    return <Loading data={{ open: loading }} />;
  }

  return (
    <Box sx={{ marginLeft: '15px' }}>
      <Slider {...settings} className="leadership-carousel">
        {properties.map((property, index) => (
          <Box key={index} sx={{ padding: '0 15px' }}>
            <CardImovel data={property} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default LeaderShipCarousel;
