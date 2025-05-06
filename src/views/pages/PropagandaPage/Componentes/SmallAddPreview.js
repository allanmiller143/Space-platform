import { Box, Container, Typography, Button, Chip, Grid } from '@mui/material';
import { ArrowOutward, FavoriteBorder, ShareOutlined } from '@mui/icons-material';
import Image from '../../../../assets/images/posters/preview.png';
const SmallAddPreview = ({ previewImage }) => {
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
      
      <Container sx={{ display: "flex", alignItems: "center", flexDirection: { xs: "column-reverse", md: "row" }}}>
        <Box sx={{ 
          position: "relative",
          maxWidth: "lg",
          mx: "auto",
          mb: 6
        }}>

          <Grid container spacing={0} alignItems="center">
                    {/* Texto à esquerda (ocupando mais espaço) */}
                    <Grid item xs={12} md={10}>
                        <Typography variant="h1" sx={{ 
                            fontSize: { xs: "2.5rem", md: "3.5rem" },
                            lineHeight: 1.1,
                            mb: 3,
                            fontWeight: 800
                        }}>
                            <Box component="span" sx={{ color: "#6E35B7" }}>Seu Anuncio lateral</Box> aparece assim na space
                        </Typography>
                        
                        <Typography variant="body1" sx={{ 
                            fontSize: "1.1rem",
                            mb: 4,
                            color: "text.secondary"
                        }}>
                            Sua loja ou negócio <strong>diretamente no caminho</strong> de quem busca imóveis. 
                            Anuncie na Space Imóveis e apareça <strong>exatamente quando importa</strong>.
                        </Typography>
                    </Grid>    
          </Grid>              
        </Box>
        
        {/* Container do Preview */}
        <Box sx={{
          position: "relative",
          maxWidth: "280px",
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
            <img src={Image} alt="Logo" style={{ width: "100%",height: "400px",borderRadius: "0 0 8px 8px", objectFit: "cover" }} />
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

export default SmallAddPreview;