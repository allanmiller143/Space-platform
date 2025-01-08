/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { putData } from '../../../../Services/Api';
import BlogCard from '../../../apps/blog/BlogCard';
import { Typography } from '@mui/material';

const CarrosselHome = ({ posts }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  const filter = async () => {
    setLoading(true);
    try {
      const response = await putData(`properties/filter?page=${1}&verified=true`, {});
      if (response.status === 200 || response.status === 201) {
        setProperties(response.data.result);
      } else {
        navigate('/error');
      }
    } catch (error) {
      navigate('/error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filter();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    appendDots: (dots) => (
      <div
        style={{
          position: 'absolute',
          bottom: '-20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <ul
          style={{
            margin: 0,
            padding: 0,
            display: 'flex',
            listStyle: 'none',
            gap: '10px',
          }}
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: theme.palette.grey[400],
          transition: 'background-color 0.3s ease',
        }}
      />
    ),
  };

  return (
    <Box py={3} maxWidth='lg' margin='0 auto'>
      <Typography
        variant="h2"
        component="h1"
        sx={{
          textAlign: 'center',
          marginBottom: '20px',
          fontWeight: 'bold',
          color: theme.palette.primary.main,
        }}
      >
        Imóveis para Todos os Gostos
      </Typography>
      <Box sx={{ padding: '20px', position: 'relative', marginBottom: '20px' }}>
        <Slider {...settings}>
          {properties.map((post) => (
            <div key={post.id} style={{ padding: '0 10px' }}>
              <BlogCard post={post} />
            </div>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

CarrosselHome.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CarrosselHome;
