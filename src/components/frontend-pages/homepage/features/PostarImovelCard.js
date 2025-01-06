import { useState } from "react";
import { 
  Box, 
  Grid, 
  CardContent, 
  Typography, 
  Button, 
  Collapse 
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Screen1 from "src/assets/images/frontend-pages/homepage/screen1.png";
import LogoIcon from "src/assets/images/logos/logoIcon.svg";
import { toast } from "sonner";

const PostarImovelCard = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString); 

  // Alternar o estado de expansão
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Navegar para a página de criação de conta
  const handleNavigate = () => {
    if(currentUserls !== null && currentUserls.type !== 'client') {
      toast.success('Parece que você ja criou uma conta');
      navigate('/apps/imoveis/edit')
    }else{
      navigate("/auth/register2");
    }
  };

  return (
    <Grid
      item
      xs={12}
      lg={5}
      sx={{
        order: {
          xs: 3,
          lg: 2,
        },
      }}
    >
      <Box
        textAlign="center"
        mb={3}
        bgcolor="primary.light"
        borderRadius="24px"
      >
        <Box pt="65px" pb="40px" px={5}>
          {/* Logo */}
          <img src={LogoIcon} alt="logo" height="50" width="50" />

          {/* Título */}
          <Typography
            variant="h2"
            fontWeight="700"
            mt={4}
            sx={{
              fontSize: {
                lg: "40px",
                xs: "35px",
              },
            }}
          >
            Postar meu imóvel 
          </Typography>

          {/* Descrição */}
          <Typography variant="body1" mt={2}>
            Crie sua conta gratuitamente e poste seu imóvel: {" "}
            <Typography component="span" fontWeight={600}>
              Novas contas tem direito a uma postagem grátis
            </Typography>
          </Typography>

          {/* Imagem */}
          <Box mt={5} mb={2}>
            <img
              src={Screen1}
              alt="icon1"
              width={405}
              height={245}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>

          {/* Botão "Saiba mais" */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleExpandClick}
            endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
          >
            Saiba mais
          </Button>

          {/* Conteúdo da "gaveta" expansível */}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent
              sx={{
                backgroundColor: "primary.light",
                textAlign: "left",
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Como funciona:
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                1. Crie sua conta em poucos passos.<br />
                2. Publique os detalhes do seu imóvel.<br />
                3. Deixe os interessados entrarem em contato!
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleNavigate}
                fullWidth
                sx={{
                  borderRadius: "8px",
                  mt: 1,
                }}
              >
                Criar Conta Agora
              </Button>
            </CardContent>
          </Collapse>
        </Box>
      </Box>
    </Grid>
  );
};

export default PostarImovelCard;
