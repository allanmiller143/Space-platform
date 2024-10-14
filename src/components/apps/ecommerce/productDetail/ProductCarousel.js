/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';


const ProductCarousel = ({post}) => {
  const [state, setState] = React.useState({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, []);

  const { nav1, nav2 } = state;
  const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 4,
    arrows: false,
    swipeToSlide: true,
    slidesToScroll: 1,
    centerMode: true,
    className: 'centerThumb',
    speed: 500,
  };

  return (
    <Box>
      <Slider asNavFor={nav2} ref={(slider) => (slider1.current = slider)}>

        {post.PostMedia.map((step) => (
          <Box key={step.id}>
            <img
              src={step.url}
              alt={step.url}
              width="100%"
              style={{ borderRadius: '5px',maxHeight:'480px' }}
              />
          </Box>
        ))}
      </Slider>
      <Slider asNavFor={nav1} ref={(slider) => (slider2.current = slider)} {...settings}>

        {post.PostMedia.map((step) => (
          <Box key={step.id} sx={{ p: 1, cursor: 'pointer' }}>
            <img
              src={step.url}
              alt={step.url}
              style={{ borderRadius: '5px',width:'80px',maxHeight:'80px', maxwidth:'60px' }}
              />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ProductCarousel;
