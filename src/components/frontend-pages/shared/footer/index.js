import React from 'react';
import { Box, Grid, Typography, Container, Divider, Stack, Tooltip } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';

import IconFacebook from 'src/assets/images/frontend-pages/icons/icon-facebook.svg';
import IconTwitter from 'src/assets/images/frontend-pages/icons/icon-twitter.svg';
import IconInstagram from 'src/assets/images/frontend-pages/icons/icon-instagram.svg';

import LogoIcon from 'src/assets/images/logos/logoIcon.svg';

const footerLinks = [
  {
    id: 1,
    children: [
      {
        title: true,
        titleText: 'Planos',
      },
      {
        title: false,
        titleText: 'Grátis',
        link: '/planos/gratis',
      },
      {
        title: false,
        titleText: 'Corretor',
        link: '/planos/corretor',
      },
      {
        title: false,
        titleText: 'Imobiliária',
        link: '/planos/imobiliaria',
      },
      {
        title: false,
        titleText: 'Pro',
        link: '/planos/pro',
      },
    ],
  },
  {
    id: 2,
    children: [
      {
        title: true,
        titleText: 'Ferramentas',
      },
      {
        title: false,
        titleText: 'Calendário',
        link: '/ferramentas/calendario',
      },
      {
        title: false,
        titleText: 'Mensagens',
        link: '/ferramentas/mensagens',
      },
      {
        title: false,
        titleText: 'Agenda',
        link: '/ferramentas/agenda',
      },
      {
        title: false,
        titleText: 'Rede Social',
        link: '/ferramentas/rede-social',
      },
      {
        title: false,
        titleText: 'Gestão de Imóveis',
        link: '/ferramentas/gestao-imoveis',
      },
      {
        title: false,
        titleText: 'Gestão de Anúncios',
        link: '/ferramentas/gestao-anuncios',
      },
    ],
  },
  {
    id: 3,
    children: [
      {
        title: true,
        titleText: 'Empresa',
      },
      {
        title: false,
        titleText: 'Sobre Nós',
        link: '/sobre',
      },
      {
        title: false,
        titleText: 'Contato',
        link: '/contato',
      },
      {
        title: false,
        titleText: 'Blog',
        link: '/blog',
      },
      {
        title: false,
        titleText: 'Carreiras',
        link: '/carreiras',
      },
      {
        title: false,
        titleText: 'Parceiros',
        link: '/parceiros',
      },
    ],
  },
];

const Footer = () => {
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          pt: {
            xs: '30px',
            lg: '60px',
          },
        }}
      >
        <Grid container spacing={3} justifyContent="space-between" mb={7}>
          {footerLinks.map((footerlink, i) => (
            <Grid item xs={6} sm={4} lg={2} key={i}>
              {footerlink.children.map((child, i) => (
                <React.Fragment key={i}>
                  {child.title ? (
                    <Typography fontSize="17px" fontWeight="600" mb="22px">
                      {child.titleText}
                    </Typography>
                  ) : (
                    <NavLink to={child.link}>
                      <Typography
                        sx={{
                          display: 'block',
                          padding: '10px 0',
                          fontSize: '15px',
                          color: (theme) => theme.palette.text.primary,
                          '&:hover': {
                            color: (theme) => theme.palette.primary.main,
                          },
                        }}
                        component="span"
                      >
                        {child.titleText}
                      </Typography>
                    </NavLink>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          ))}
          <Grid item xs={6} sm={6} lg={2}>
            <Typography fontSize="17px" fontWeight="600" mb="22px">
              Siga-nos
            </Typography>

            <Stack direction="row" gap="20px">
              <Tooltip title="Facebook">
                <NavLink to="#">
                  <img src={IconFacebook} alt="facebook" width={22} height={22} />
                </NavLink>
              </Tooltip>
              <Tooltip title="Twitter">
                <NavLink to="#">
                  <img src={IconTwitter} alt="twitter" width={22} height={22} />
                </NavLink>
              </Tooltip>
              <Tooltip title="Instagram">
                <NavLink to="#">
                  <img src={IconInstagram} alt="instagram" width={22} height={22} />
                </NavLink>
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>

        <Divider />

        <Box
          py="40px"
          useflexgap="true"
          flexWrap="wrap"
          display="flex"
          justifyContent="space-between"
        >
          <Stack direction="row" gap={1} alignItems="center">
            <img src={LogoIcon} width={20} height={20} alt="logo" />
            <Typography variant="body1" fontSize="15px">
              Todos os direitos reservados por SpaceImóveis.{' '}
            </Typography>
          </Stack>
          <Typography variant="body1" fontSize="15px">
            Desenvolvido por{' '}
            <Typography component={Link} color="primary.main" to="https://spaceimoveis.com/">
              SpaceImóveis
            </Typography>
            .
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Footer;
