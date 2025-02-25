import React from 'react';
import { Grid, Link, Typography, Container, Box, IconButton, Divider } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

import logoIcon from 'src/assets/images/logos/logo.svg';

const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: '#F2ECF9', color: '#ffffff', py: 6, mt: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {/* Logo e descrição */}
          <Grid item xs={12} sm={4} textAlign="center">
            <img src={logoIcon} alt="icon" width={150} />
            <Typography fontSize="16px" color="#000" mt={2}>
              Construindo experiências digitais modernas e inovadoras.
            </Typography>
          </Grid>

          {/* Links úteis */}
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" fontWeight="bold" color="#6E35B7">
              Links Rápidos
            </Typography>
            <Box display="flex" flexDirection="column" mt={2}>
              <Link href="/" color="#000" underline="hover" sx={{ transition: '0.3s', '&:hover': { color: '#6E35B7' } }}>
                Home
              </Link>
              <Link href="/templates/sobre" color="#000" underline="hover" sx={{ transition: '0.3s', '&:hover': { color: '#6E35B7' } }}>
                Sobre Nós
              </Link>
              <Link href="/templates/contato" color="#000" underline="hover" sx={{ transition: '0.3s', '&:hover': { color: '#6E35B7' } }}>
                Contato
              </Link>
              <Link href="/marketplace" color="#000" underline="hover" sx={{ transition: '0.3s', '&:hover': { color: '#6E35B7' } }}>
                Classificados
              </Link>
              <Link href="/anunciar" color="#000" underline="hover" sx={{ transition: '0.3s', '&:hover': { color: '#6E35B7' } }}>
                Quero anunciar 
              </Link>

            </Box>
          </Grid>

          {/* Redes sociais */}
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" fontWeight="bold" color="#6E35B7">
              Conecte-se Conosco
            </Typography>
            <Box display="flex" justifyContent="center" gap={2} mt={2}>
              <IconButton sx={{ color: '#000', transition: '0.3s', '&:hover': { color: '#1877F2' } }} href="https://facebook.com" target="_blank">
                <Facebook fontSize="large" />
              </IconButton>
              <IconButton sx={{ color: '#000', transition: '0.3s', '&:hover': { color: '#1DA1F2' } }} href="https://twitter.com" target="_blank">
                <Twitter fontSize="large" />
              </IconButton>
              <IconButton sx={{ color: '#000', transition: '0.3s', '&:hover': { color: '#E1306C' } }} href="https://instagram.com" target="_blank">
                <Instagram fontSize="large" />
              </IconButton>
              <IconButton sx={{ color: '#000', transition: '0.3s', '&:hover': { color: '#0077B5' } }} href="https://linkedin.com" target="_blank">
                <LinkedIn fontSize="large" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Linha divisória */}
        <Divider sx={{ backgroundColor: '#333', my: 4 }} />

        {/* Copyright */}
        <Typography variant="body2" color="#000" textAlign="center">
          © {new Date().getFullYear()} Space imóveis. Todos os direitos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
