import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Grid } from 'swiper/modules';

// Importar estilos do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';

const SwipperRender = ({ items }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Grid]}
      spaceBetween={30}
      slidesPerView={4}
      grid={{
        rows: 1,
        fill: 'row'
      }}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        // quando a largura da janela é >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        // quando a largura da janela é >= 480px
        480: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        // quando a largura da janela é >= 640px
        640: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        // quando a largura da janela é >= 1024px
        1024: {
          slidesPerView: 4,
          spaceBetween: 30
        }
      }}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index}>
          {item.content}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwipperRender;
