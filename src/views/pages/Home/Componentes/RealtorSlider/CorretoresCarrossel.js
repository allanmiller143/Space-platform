import React, { useEffect } from "react";
import Slider from "react-slick";
import { Box, Card, CardContent, Avatar, Typography, Button } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getData } from "../../../../../Services/Api";
import { useNavigate } from "react-router-dom";


const CorretoresCarrossel = () => {
  const slidesToShow = 4;
  const [corretores, setCorretores] = React.useState([]);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const settings = {
    dots: false,
    infinite: corretores.length > slidesToShow,
    speed: 500,
    slidesToShow: Math.min(slidesToShow, corretores.length),
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: Math.min(2, corretores.length) } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  const handleSeguir = (email) => {
    navigate(`/user-profile/${email.replaceAll(/[.]/g, '-')}`);

  };

  async function loadData() {
    try {
      const response = await getData("realtor");
      if(response.status === 200 || response.status === 201){
        setCorretores(response.userInfo.users);
      }else{
        navigate('/error');
      }
      console.log(response.userInfo.users);
    } catch (error) {
      console.error("Erro ao buscar os corretores:", error);
    }
  }
  
  useEffect(() => {
    loadData();
  }, []);

  if(corretores.length === 0 || !currentUser){
    return (
      null
    )
  }

  return (
    <Box sx={{ width: "100%", maxWidth: "lg", margin: "auto", mt: 1, px: 1, py: 2 }}>
      
      <Typography variant="h5" fontWeight="bold" mb={2} ml={1}>
        Sugestão de corretores para seguir
      </Typography>

      {corretores.length > 0 ? (
        <Slider {...settings}>
          {corretores.map((corretor, index) => (
            <Box key={index} sx={{ px: 1, py : 1 }}> {/* Espaçamento entre os cards */}
              <Card sx={{ p: 2, textAlign: "center", boxShadow: 3 }}>
                <Avatar
                  src= {corretor.profile ? corretor.profile.url : ""}
                  alt={corretor.name}
                  sx={{ width: 80, height: 80, margin: "auto", mb: 2 }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {corretor.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {corretor.email}
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => handleSeguir(corretor.email)}
                  >
                    Ver perfil
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      ) : (
        <Typography variant="body1" textAlign="center" color="text.secondary">
          Nenhum corretor disponível no momento.
        </Typography>
      )}
    </Box>
  );
};

export default CorretoresCarrossel;
