/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Grid } from "@mui/material";
import Galleri from "../../../../components/lightbox/lightbox";

const GalleryPhotos = ({ property }) => {
  const [openGallery, setOpenGallery] = useState(false);
  const [selectedPic, setSelectedPic] = useState(0);

  return (
    <Box>
      {property && (
        <Box sx={{ mt: 2 }}>
          {/* Todas as fotos em grade */}
          <Grid container spacing={2}>
            {property.pictures.map((image, index) => (
              <Grid item  sm={6} md={4} lg={2} key={index}>
                <Box
                  sx={{
                    
                    height: "120px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                  onClick={() => {
                    setSelectedPic(index);
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
                      borderRadius: "12px",
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Lightbox */}
          {openGallery && (
            <Galleri
              onClose={() => setOpenGallery(false)}
              pictures={property.pictures}
              initialPic={selectedPic}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default GalleryPhotos;
