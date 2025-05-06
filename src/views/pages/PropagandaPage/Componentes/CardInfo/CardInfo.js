/* eslint-disable react/prop-types */
import {Box,CardContent,Typography,Button,Dialog} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoIcon from "src/assets/images/logos/logoIcon.svg";
import { toast } from "sonner";

const CardInfoDialog = ({open, onClose}) => {
  const navigate = useNavigate();
  const cuString = localStorage.getItem("currentUser");
  const currentUserls = JSON.parse(cuString);


  // Navegar para a página de criação de conta
  const handleNavigate = () => {
    if (currentUserls !== null && currentUserls.type !== "client") {
      toast.success("Parece que você já criou uma conta");
      navigate("/inserirPropaganda");
    } else {
      navigate("/auth/register2");
    }
  };

  return (
    <Dialog open fullWidth maxWidth="sm" sx = {{ borderRadius: "50px ! important", }} onClose={onClose}>
      <Box textAlign="center" bgcolor="primary.light" >
        <Box pt="65px" pb="40px" px={5}>
          {/* Logo */}
          <img src={LogoIcon} alt="logo" height="50" width="50" />

          {/* Título */}
          <Typography
            variant="h2"
            fontWeight="700"
            mt={4}
            sx={{ fontSize: { lg: "40px", xs: "35px" } }}
          >
            Divulgar
          </Typography>

          {/* Descrição */}
          <Typography variant="body1" mt={2}>
            Crie sua conta gratuitamente e divulgue na space imóveis:{" "}
          </Typography>


            <CardContent
              sx={{ backgroundColor: "primary.light", textAlign: "left" }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Como funciona:
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
                1. Crie sua conta em poucos passos.<br />
                2. Publique os detalhes do seu anúncio.<br />
                3. Deixe os interessados entrarem em contato!
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleNavigate}
                fullWidth
                sx={{ borderRadius: "8px", mt: 1 }}
              >
                Criar Conta Agora
              </Button>
            </CardContent>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CardInfoDialog;
