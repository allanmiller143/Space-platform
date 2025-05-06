/* eslint-disable react/prop-types */
import { Box, CardMedia, Button, Typography, Divider } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

const SmallPreview = ({ anuncios, title, label }) => {

  if (!anuncios.length) return null; 

  return (
    <Box maxWidth="280px" width="100%">
      {title && <Divider />}
      
      <Box sx={{ mt: 2 }}>
        {title && <Typography variant="h5">{title}</Typography>}
        {label && <Typography variant="body2" sx={{ mt: 1 }}>{label}</Typography>}
      </Box>

      <Carousel
        animation="slide"
        autoPlay
        indicators
        interval={15000}
        indicatorContainerProps={{ style: { display: 'flex', justifyContent: 'center', marginTop: '10px' } }}
        indicatorIconButtonProps={{ style: { color: '#ddd', margin: '0 4px' } }}
        activeIndicatorIconButtonProps={{ style: { color: '#1976d2' } }}
        sx={{ mt: 2 }}
      >
        {anuncios.map(({ id, imageUrl, link }) => (
          <Box key={id} sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="400"
              image={imageUrl}
              alt={`Anúncio ${id}`}
              sx={{ borderRadius: 1, objectFit: 'cover' }}
            />

            <Button
              sx={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                padding: '6px 10px',
                borderRadius: '6px',
                backgroundColor: 'primary.main',
                color: '#fff',
                zIndex: 10,
              }}
              onClick={() => window.open(link, '_blank')}
            >
              Saiba mais
            </Button>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default SmallPreview;
