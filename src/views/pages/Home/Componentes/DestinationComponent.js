import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Skeleton } from "@mui/material";

const DestinationComponent = () => {
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [exploreDestinations, setExploreDestinations] = useState([]);

  useEffect(() => {
    // Simula uma chamada à API com atraso de 2 segundos
    setTimeout(() => {
      setExploreDestinations([
        {
          name: "Camoos do Jordão",
          image: "https://i.pinimg.com/736x/1d/a9/1a/1da91a0a7faea9dd077fb1c30b720fd2.jpg",
          accommodations: 881,
        },
        { name: "São Paulo", image: "https://i.pinimg.com/474x/38/ab/71/38ab71a1bea85602a4dbe1368ab3443d.jpg", accommodations: 2653 },
        { name: "Rio de Janeiro", image: "https://i.pinimg.com/236x/9c/50/59/9c5059e30552b37fca9210e5149e93fb.jpg", accommodations: 5002 },
        { name: "Gramado", image: "https://i.pinimg.com/236x/2e/14/ce/2e14ce8e30ec4ac81083e9849a3ceb40.jpg", accommodations: 1683 },
        { name: "Porto de Galinhas", image: "https://i.pinimg.com/236x/15/cf/b0/15cfb0bda1cf040528cba5f2f32da57e.jpg", accommodations: 1406 },
        { name: "Monte Verde", image: "https://i.pinimg.com/236x/9b/d2/db/9bd2dbcebd321e0a6a4e2c1ac48ccb33.jpg", accommodations: 363 },
      ]);
      setLoading(false); // Atualiza para falso após carregar os dados
    }, 2000);
  }, []);

  return (
    <Box sx={{ maxWidth: "lg", margin: "0 auto" , px : {xs : 1, sm: 2},
  }}>
      {/* Explore Section */}
      <Typography variant="h4" sx={{ fontSize: { xs: "1rem", sm: "1.5rem" }, mt: 2, mb: {sm :1, xs :0} }}>
        Imóveis por todo o Brasil
      </Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: "15px" }}>
        Confira agora os melhores imóveis em todo o Brasil
      </Typography>

      <Grid container spacing={1}>
        {loading
          ? // Exibe Skeletons enquanto os dados estão carregando
            Array.from(new Array(6)).map((_, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <Box
                  sx={{
                    borderRadius: "8px",
                    boxShadow: 2,
                    overflow: "hidden",
                    backgroundColor: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    height: 220,
                  }}
                >
                  <Skeleton variant="rectangular" height={120} />
                  <Box
                    sx={{
                      padding: "8px 12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      flexGrow: 1,
                    }}
                  >
                    <Skeleton variant="text" width="80%" />
                    <Skeleton variant="text" width="60%" />
                  </Box>
                </Box>
              </Grid>
            ))
          : // Exibe os dados reais quando o carregamento termina
            exploreDestinations.map((destination, index) => (
              <Grid item xs={6} sm={4} md={2} key={index}>
                <Box
                  sx={{
                    borderRadius: "8px",
                    boxShadow: 2,
                    overflow: "hidden",
                    backgroundColor: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    height: 220,
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      height: 120,
                      width: "100%",
                      objectFit: "cover",
                    }}
                    src={destination.image}
                    alt={destination.name}
                  />
                  <Box
                    sx={{
                      padding: "8px 12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      flexGrow: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {destination.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "gray" }}>
                      {destination.accommodations} acomodações
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default DestinationComponent;
