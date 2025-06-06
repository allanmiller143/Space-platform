/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Box, Typography, Button, Tooltip, Fab, IconButton } from "@mui/material";
import { IconArrowLeft, IconCamera, IconHeart, IconShare, IconThumbUp } from "@tabler/icons";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import moment from 'moment';
import { deleteData, postData } from "../../../../Services/Api";
import GalleryPhotos from "./GalleryPhotos";
import ShareComponent from "../../../../components/apps/userprofile/feed/ShareComponent";
import socket from "../../../../Services/socket";
import QRCodeGenerator from "./QrCode";

const Gallery = ({ property }) => {
  const navigate = useNavigate();
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = cuString ? JSON.parse(cuString) : null; // Verifica se o usuário está definido
  const token = localStorage.getItem('token');
  const url = window.location.href;
  const [favorite, setFavorite] = useState(false);
    const back = () => {
      navigate(-1);
    };

    const sendNotification = () => {
        const data = {
          'sender': currentUserls.email,
          'receiver': property.seller.email,
          'title': 'Curtiu seu imóvel',
          'type': 'like'
        };
        socket.emit('send_notification', data);
    };
  
    const toggleFavorite = async () => {
      if (!currentUserls) {
        toast.warning('Para favoritar, faça o login');
        return;
      }
      try {
        const isFavorite = currentUserls.favorites.some(fav => fav.propertyId === property.id);
        if (isFavorite) {
          setFavorite(false);
          await UnFavorite(); // Chama UnFavorite sem passar o evento
        } else {
          setFavorite(true);
          await Favorite(); // Chama Favorite sem passar o evento
        }
      } catch (error) {
        toast.error(`Erro ao processar a solicitação:\n ${error.message}`);
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
        sendNotification();
      } else {
        toast.error('Erro ao favoritar, por favor tente novamente mais tarde ou entre em contato com o suporte.');
        setFavorite(false);
      }
    };
  
    const UnFavorite = async () => {
      const unfavoriteResponse = await deleteData(`favorites/${currentUserls.email}/${property.id}`, token);
      if (unfavoriteResponse.status === 200 || unfavoriteResponse.status === 204) {
        currentUserls.favorites = currentUserls.favorites.filter(fav => fav.propertyId !== property.id);
        localStorage.setItem('currentUser', JSON.stringify(currentUserls));
        setFavorite(false);
      } else {
        toast.error('Erro ao desfavoritar, por favor tente novamente mais tarde ou entre em contato com o suporte.');
        setFavorite(true);

      }
    };

      useEffect(() => {
        if (property && currentUserls) {
          const isFavorite = currentUserls.favorites.some(fav => fav.propertyId === property.id);
          setFavorite(isFavorite);
        }
      }, []);
    
      const FormattedDateComponent = ({ date }) => {
        // Format the date using moment
        const formattedDate = moment(date).format("DD/MM/YYYY HH:mm");
      
        return (
          <Typography variant="body1" sx = {{ mb: 2}}>
            Imóvel postado em: <b>{formattedDate}</b>
          </Typography>
        );
      };
    
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
  

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
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
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <QRCodeGenerator url={url} />
                <ShareComponent post={property} url = '/imovel/' sx={{ ml: 'auto' }} />  
                <Tooltip title= { favorite ? "Desfavoritar" : "Favoritar"} sx = {{ml : '12px'}}>
                  <IconButton onClick={() => toggleFavorite()} color={favorite ? 'primary' : 'default'}>
                    <IconThumbUp />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
          <GalleryPhotos property={property} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'start',mt: 2, justifyContent : 'space-between' }}>
            <Box>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'grey.600' }}>
                <IconCamera fontSize="small" sx={{ mr: 2, ml: 1, color: 'grey.600' }} /> {property.pictures.length} Fotos
              </Typography>
              {FormattedDateComponent({ date: property.createdAt })}  
            </Box>
          </Box>

          <Typography variant="h2"  sx={{ mb: 3, fontSize: { xs: '20px', sm: '36px', }, }}>
            {`${property.propertyType === 'house' ? 'Casa' : property.propertyType === 'apartment' ? 'Apartamento' : property.propertyType === 'land' ? 'Terreno' : 'Fazenda/Chácara'} com
             ${property.bedrooms} Quartos e ${property.bathrooms} Banheiros, ${property.suites} suítes, com ${property.parkingSpaces} vagas próximo do ${property.address.neighborhood}, ${property.address.city}`}
          </Typography>

          {prices()}
        </>
      )}
    </Box>
  );
};

export default Gallery;
