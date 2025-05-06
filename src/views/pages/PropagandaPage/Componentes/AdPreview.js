import { Box, Container, Typography, Button, Chip } from '@mui/material';
import { ArrowOutward, FavoriteBorder, ShareOutlined } from '@mui/icons-material';
import Image from '../../../../assets/images/posters/preview.png';
const AdPreview = ({ previewImage }) => {
  return (
    <Box sx={{ 
      position: "relative",
      py: 8,
      bgcolor: "background.paper",
      overflow: "hidden"
    }}>
      {/* Elemento decorativo (estilo consistente com a primeira opção) */}
      <Box sx={{
        position: "absolute",
        top: "-50px",
        right: "-100px",
        width: "300px",
        height: "300px",
        bgcolor: "#F5F0FF",
        borderRadius: "50%",
        zIndex: 0
      }} />
      
      <Container>
        <Box sx={{ 
          position: "relative",
          maxWidth: "1000px",
          mx: "auto",
          textAlign: "center",
          mb: 6
        }}>
          <Typography variant="h2" sx={{ 
            fontSize: { xs: "2rem", md: "2.5rem" },
            fontWeight: 700,
            mb: 2
          }}>
            Seu anúncio na <Box component="span" sx={{ color: "#6E35B7" }}>Space Imóveis</Box>
          </Typography>
          <Typography sx={{ color: "text.secondary", maxWidth: "600px", mx: "auto" }}>
            Veja como sua loja ou negócio será exibido para milhares de clientes
          </Typography>
        </Box>
        
        {/* Container do Preview */}
        <Box sx={{
          position: "relative",
          maxWidth: "lg",
          mx: "auto",
          borderRadius: "12px 12px 0 0",
          overflow: "hidden",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "40px",
            bgcolor: "#6E35B7",
            zIndex: 2
          }
        }}>
          {/* Barra de navegação simulada */}
          <Box sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "40px",
            display: "flex",
            alignItems: "center",
            px: 2,
            zIndex: 3,
            "& svg": { color: "white" }
          }}>
            <ArrowOutward sx={{ fontSize: "1rem", mr: 1 }} />
            <Typography variant="caption" sx={{ color: "white", fontWeight: 500 }}>
              spaceimoveis.com.br/anuncio
            </Typography>
          </Box>
          
          {/* Rodapé simulado */}
          <Box sx={{ 
            bgcolor: "background.paper",
            borderTop: "1px solid #f0f0f0"
          }}>
            <img src={Image} alt="Logo" style={{ width: "100%", borderRadius: "0 0 8px 8px" }} />
            <Button
              sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                padding: '8px 12px',
                borderRadius: '8px',
                backgroundColor: 'primary.main',
                color: '#fff',
                zIndex: 10000,
              }}
              onClick={() => window.open('https://spaceimoveis.com.br', '_blank')} // Abre o link em uma nova aba
            >
              Saiba mais
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AdPreview;