import React, { useState, useRef } from 'react';
import { Avatar, CardContent, Divider, Stack, Typography, Box, Paper } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';

import user1 from 'src/assets/images/profile/user-1.jpg';
import user2 from 'src/assets/images/profile/user-2.jpg';
import user3 from 'src/assets/images/profile/user-3.jpg';
import user4 from 'src/assets/images/profile/user-4.jpg';
import user5 from 'src/assets/images/profile/user-5.jpg';

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
        left: '95px',
        zIndex: 1,
        bottom: '45px',
        right: 0,
        backgroundColor: (theme) => theme.palette.grey[100],
        width: '32px',
        height: '32px',
        borderRadius: '50%',
      }}
      onClick={onClick}
    >
      <IconChevronRight strokeWidth={1.5} size={20} />
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
        left: '20px',
        zIndex: 1,
        bottom: '45px',
        right: '60px',
        backgroundColor: (theme) => theme.palette.grey[100],
        width: '32px',
        height: '32px',
        borderRadius: '50%',
      }}
      onClick={onClick}
    >
      <IconChevronLeft strokeWidth={1.5} size={20} />
    </Box>
  );
}

const Reviews = [
  {
    id: 1,
    img: user1,
    name: 'Mariano Souza',
    text: 'A Space Imóveis tornou meu sonho realidade! Atendimento excelente e imóveis incríveis. Recomendo muito!'
  },
  {
    id: 2,
    img: user2,
    name: 'Carlos Eduardo',
    text: 'Equipe super atenciosa e comprometida. Encontrei o imóvel perfeito para minha família com total segurança!'
  },
  {
    id: 3,
    img: user3,
    name: 'Fernanda Lima',
    text: 'A experiência com a Space Imóveis foi incrível! Processo ágil, transparente e atendimento diferenciado.'
  },
  {
    id: 4,
    img: user4,
    name: 'Mariana Martins',
    text: 'Muito satisfeita! A Space Imóveis oferece um serviço de altíssima qualidade e profissionais competentes.'
  },
  {
    id: 5,
    img: user5,
    name: 'Bernardo Oliveira',
    text: 'Ótima experiência! Encontrei meu apartamento dos sonhos com a Space Imóveis de forma rápida e segura!'
  },
];

const ReviewCarousel = () => {
  const [oldSlide, setOldSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(1);
  const [activeSlide2, setActiveSlide2] = useState(1);

  let sliderRef = useRef(null);

  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (current, next) => {
      setOldSlide(current);
      setActiveSlide(next);
    },
    afterChange: (current) => setActiveSlide2(current),
  };

  return (
    <Box width="100%" mb = {4}>
      <Slider
        ref={(slider) => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {Reviews.map((review, i) => (
          <div key={i}>
            <Paper variant="outlined" sx={{ borderRadius: '16px', px: '20px !important' }}>
              <Box sx={{ py: '48px !important' }}>
                <Typography variant="h4" lineHeight={1.4} mb={3} fontWeight={600} fontSize="24px">
                  Depoimentos de Clientes
                </Typography>
                
                <Stack direction="row" alignItems="center" gap={3} mb={3}>
                  <Avatar src={review.img} alt="user" />
                  <Typography variant="body1" fontWeight={600}>
                    {review.name}
                  </Typography>
                </Stack>
                <Typography variant="body1" lineHeight={1.8} mb={2}>
                  {review.text}
                </Typography>
                <Divider />

                <Typography fontSize="14px" fontWeight={500} ml={5} mt={3}>
                  {activeSlide +1} / {Reviews.length}
                </Typography>
              </Box>
            </Paper>
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default ReviewCarousel;
