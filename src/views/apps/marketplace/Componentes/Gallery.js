/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Button, Modal, Tooltip } from '@mui/material';
import Gallery from 'src/components/lightbox/lightbox';
import { IconCamera, IconVideo, IconArrowLeft, IconShare, IconHeart } from '@tabler/icons';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import "leaflet/dist/leaflet.css";
import { MyLocation } from '@mui/icons-material';
import { deleteData, postData } from '../../../../Services/Api';

const PropertyGallery = ({ property }) => {
  const [openGallery, setOpenGallery] = useState(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const navigate = useNavigate();
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = cuString ? JSON.parse(cuString) : null; // Verifica se o usuário está definido
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (property && currentUserls) {
      const isFavorite = currentUserls.favorites.some(fav => fav.propertyId === property.id);
      setFavorite(isFavorite);
    }
  }, [property, currentUserls]);

  const formatPrice = (price) => {
    return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '';
  };

  const prices = () => {
    if (property.announcementType === 'both') {
      return (
        <Typography variant="h3" component="p" sx={{ mb: 3 }}>
          {`Preço de compra R$ ${formatPrice(property.prices.sellPrice)}`}<br />
          {`Aluguel R$ ${formatPrice(property.prices.rentPrice)}`}
        </Typography>
      );
    } else if (property.announcementType === 'rent') {
      return (
        <Typography variant="h3" component="p" sx={{ mb: 3 }}>
          {`Aluguel R$ ${formatPrice(property.prices.rentPrice)}`}
        </Typography>
      );
    } else {
      return (
        <Typography variant="h3" component="p" sx={{ mb: 3 }}>
          {`Preço de venda R$ ${formatPrice(property.prices.sellPrice)}`}
        </Typography>
      );
    }
  };

  const back = () => {
    navigate(-1);
  };

  const toggleFavorite = async () => {
    if (!currentUserls) {
      toast.warning('Para favoritar, faça o login');
      return;
    }

    setLoading(true);
    try {
      const isFavorite = currentUserls.favorites.some(fav => fav.propertyId === property.id);
      if (isFavorite) {
        await UnFavorite(); // Chama UnFavorite sem passar o evento
      } else {
        await Favorite(); // Chama Favorite sem passar o evento
      }
    } catch (error) {
      toast.error(`Erro ao processar a solicitação:\n ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const Favorite = async () => {
    const favoriteData = {
      propertyId: property.id,
      email: currentUserls.email
    };
    const favoriteResponse = await postData('favorites', favoriteData, token);
    if (favoriteResponse.status === 200 || favoriteResponse.status === 201) {
      currentUserls.favorites.push({ propertyId: property.id });
      localStorage.setItem('currentUser', JSON.stringify(currentUserls));
      setFavorite(true);
    } else {
      toast.error('Erro ao favoritar, por favor tente novamente mais tarde ou entre em contato com o suporte.');
      console.log(favoriteResponse);
    }
  };

  const UnFavorite = async () => {
    const unfavoriteResponse = await deleteData(`favorites/${currentUserls.email}/${property.id}`, token);
    console.log(property.id);
    if (unfavoriteResponse.status === 200 || unfavoriteResponse.status === 204) {
      currentUserls.favorites = currentUserls.favorites.filter(fav => fav.propertyId !== property.id);
      localStorage.setItem('currentUser', JSON.stringify(currentUserls));
      setFavorite(false);
    } else {
      toast.error('Erro ao desfavoritar, por favor tente novamente mais tarde ou entre em contato com o suporte.');
      console.log(unfavoriteResponse);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {property && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
            <Button
              variant="outlined"
              onClick={back}
            >
              <IconArrowLeft sx={{ mr: 1 }} /> Voltar
            </Button>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Tooltip title="Compartilhar">
                <Button
                  variant="outlined"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success('Link da página copiado para a área de transferência!');
                  }}
                >
                  <IconShare />
                </Button>
              </Tooltip>
              <Tooltip title="Salvar">
                <Button
                  variant="outlined"
                  sx={{ backgroundColor:  '#fff' }}
                  onClick={toggleFavorite}
                >
                  <IconHeart color={favorite ? 'red' : '#000'} />
                </Button>
              </Tooltip>
            </Box>
          </Box>

          <Box
            sx={{
              position: 'relative',
              transition: 'opacity 0.3s ease-in-out',
              cursor: 'pointer',
              '&:hover::before': {
                content: '"🔍 Ver Galeria"',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                zIndex: 1,
                opacity: 1,
                transition: 'opacity 0.3s ease-in-out',
              },
            }}
            onClick={() => setOpenGallery(true)}
          >
            <Box
              sx={{
                backgroundImage: `url(${property.pictures[0].url})`,
                backgroundSize: 'cover',
                height: 550,
              }}
            ></Box>
          </Box>

          {openGallery && <Gallery onClose={() => setOpenGallery(false)} pictures={property.pictures} />}

          <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center', opacity: 0.7, mt: 2 }}>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'grey.600' }}>
              <IconCamera fontSize="small" sx={{ mr: 2, ml: 1, color: 'grey.600' }} /> {property.pictures.length} Fotos
            </Typography>
            {/* Modal para Vídeo, se necessário */}
            <Modal
              open={openVideoModal}
              onClose={() => setOpenVideoModal(false)}
              aria-labelledby="video-modal-title"
              aria-describedby="video-modal-description"
            >
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                height: '80%',
                bgcolor: 'background.paper',
                boxShadow: 30,
                p: 0,
                overflow: 'hidden',
                borderRadius: '15px',
              }}>
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/VIDEO_ID" // Substitua VIDEO_ID pelo ID real do vídeo
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Box>
            </Modal>
          </Box>

          <Typography variant="h2" component="h1" sx={{ mb: 3 }}>
            {`${property.propertyType === 'house' ? 'Casa' : property.propertyType === 'apartment' ? 'Apartamento' : property.propertyType === 'land' ? 'Terreno' : 'Fazenda/Chácara'} com
             ${property.bedrooms} Quartos e ${property.bathrooms} Banheiros, ${property.suites} suítes, com ${property.parkingSpaces} vagas próximo do ${property.address.neighborhood}, ${property.address.city}`}
          </Typography>

          {prices()}

        </>
      )}
    </Box>
  );
};

export default PropertyGallery;
