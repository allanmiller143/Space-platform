/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import Galleri from 'src/components/lightbox/lightbox';

const GalleryPhotos = ({ property }) => {
  const [openGallery, setOpenGallery] = useState(false);
  const [selectedPic, setSelectedPic] = useState(0);

  return (
    <Box>
      {property && (
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
            <Box
              sx={{
                flex: 2,
                maxWidth: "730px",
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
                      height: property.pictures.length <= 5 ? "190px": '150px',
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
                <Grid container spacing={3}>
                  <Grid item xs = {6}> 

                  </Grid>
                
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
                </Grid>
              )}
            </Grid>
          </Box>      
        )}
    </Box>
  );
};

export default GalleryPhotos;
