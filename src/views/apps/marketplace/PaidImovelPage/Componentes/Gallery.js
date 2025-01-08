/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Box, Typography, Grid, Button, Tooltip } from "@mui/material";
import Galleri from 'src/components/lightbox/lightbox';
import { IconArrowLeft, IconCamera, IconHeart, IconShare } from "@tabler/icons";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import moment from 'moment';
import { deleteData, postData } from "../../../../../Services/Api";

const Gallery = ({ property }) => {
  const [openGallery, setOpenGallery] = useState(false);
  const [selectedPic, setSelectedPic] = useState(0);
  const navigate = useNavigate();
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = cuString ? JSON.parse(cuString) : null; // Verifica se o usuário está definido
  const token = localStorage.getItem('token');
  const [favorite, setFavorite] = useState(false);
    const back = () => {
      navigate(-1);
    };
  
    const toggleFavorite = async () => {
      if (!currentUserls) {
        toast.warning('Para favoritar, faça o login');
        return;
      }
  
      try {
        const isFavorite = currentUserls.favorites.some(fav => fav.propertyId === property.id);
        if (isFavorite) {
          await UnFavorite(); // Chama UnFavorite sem passar o evento
        } else {
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

      useEffect(() => {
        if (property && currentUserls) {
          console.log(property);
          const isFavorite = currentUserls.favorites.some(fav => fav.propertyId === property.id);
          setFavorite(isFavorite);
        }
      }, [property, currentUserls]);
    
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

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
            <Box
              sx={{
                flex: 2,
                maxWidth: "700px",
                height: "400px",
                borderRadius: "12px",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.02)",
                },
                // Exibe a imagem principal em qualquer tamanho de tela
              }}
              onClick={() => setOpenGallery(true)}
            >
              <img
                src={property.pictures[0].url}
                alt={property.pictures[0].alt || "Imagem principal"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            </Box>

            {openGallery && (
              <Galleri
                onClose={() => setOpenGallery(false)}
                pictures={property.pictures}
                initialPic={selectedPic}
              />
            )}

            {/* Miniaturas - visível apenas em telas grandes */}
            <Grid
              container
              flex={1}
              spacing={1}
              justifyContent="center"
              sx={{
                display: { xs: "none", sm: "flex" }, // Oculta as miniaturas em telas pequenas
              }}
            >
              {property.pictures.slice(1, 5).map((image, index) => (
                <Grid item xs={6} key={index}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "133px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                    onClick={() => {
                      setSelectedPic(index + 1);
                      setOpenGallery(true);
                    }}
                  >
                    <img
                      src={image.url}
                      alt={image.alt || `Imagem ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </Box>
                </Grid>
              ))}

              {/* Mais Fotos - visível apenas em telas grandes */}
              {property.pictures.length > 5 && (
                <Grid item xs={6}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "80px",
                      position: "relative",
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      borderRadius: "8px",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.9)",
                      },
                    }}
                    onClick={() => {
                      setSelectedPic(5);
                      setOpenGallery(true);
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="span"
                      sx={{ fontWeight: "bold", fontSize: "1rem" }}
                    >
                      + {property.pictures.length - 5} fotos
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center', opacity: 0.7, mt: 2 }}>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'grey.600' }}>
              <IconCamera fontSize="small" sx={{ mr: 2, ml: 1, color: 'grey.600' }} /> {property.pictures.length} Fotos
            </Typography>
           
          </Box>

          {
            FormattedDateComponent({ date: property.createdAt })  
          }

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

export default Gallery;
