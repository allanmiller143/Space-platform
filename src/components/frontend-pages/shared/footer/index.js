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
        titleText: 'Carece de dados',
      },
      {
        title: false,
        titleText: 'Dados de negócio...',
        link: '/planos/gratis',
      },
      {
        title: false,
        titleText: 'Dados de negócio...',
        link: '/planos/corretor',
      },
      {
        title: false,
        titleText: 'Dados de negócio...',
        link: '/planos/imobiliaria',
      },
      {
        title: false,
        titleText: 'Dados de negócio...',
        link: '/planos/pro',
      },
    ],
  },
  {
    id: 2,
    children: [
      {
        title: true,
        titleText: 'Carece de dados',
      },
      {
        title: false,
        titleText: 'Dados de negócio...',
        link: '/ferramentas/calendario',
      },
      {
        title: false,
        titleText: 'Dados de negócio...',
        link: '/ferramentas/mensagens',
      },
      {
        title: false,
        titleText: 'Dados de negócio...',
        link: '/ferramentas/agenda',
      },
      {
        title: false,
        titleText: 'Dados de negócio...',
        link: '/ferramentas/rede-social',
      },
      {
        title: false,
        titleText: 'Dados de negócio...',
        link: '/ferramentas/gestao-imoveis',
      },
      {
        title: false,
        titleText: 'Dados de negócio...',
        link: '/ferramentas/gestao-anuncios',
      },
    ],
  },
  {
    id: 3,
    children: [
      {
        title: true,
        titleText: 'Carece de dados',
      },
      {
        title: false,
        titleText: 'Dados de negócio...',
        link: '/sobre',
      },
      {
        title: false,
        titleText: 'Dados de negócio...',
        link: '/contato',
      },
      {
        title: false,
        titleText: 'Dados de negócio...',
        link: '/blog',
      },
      {
        title: false,
        titleText: 'Dados de negócio...',
        link: '/carreiras',
      },
      {
        title: false,
        titleText: 'Dados de negócio...',
        link: '/parceiros',
      },
    ],
  },
];

const Footer = () => {
  return (
    <>
      
    </>
  );
};

export default Footer;
