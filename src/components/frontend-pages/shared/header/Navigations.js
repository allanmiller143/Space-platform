/* eslint-disable no-unused-vars */
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';
import { Chip } from '@mui/material';

import { NavLink, useLocation } from 'react-router-dom';

export const NavLinks = [
  // {
  //   title: 'Feed',
  //   to: '/templates/feed',
  // },
  {
    title: 'Buscar Imóveis',
    to: '/marketplace',
  },
  {
    title: 'Produtos',
    to: '/templates/produtos',
  },
  {
    title: 'Sobre nós',
    to: '/templates/sobre',
  },
  {
    title: 'Planos e preços',
    to: '/templates/precos',
  },
  {
    title: 'Fale conosco',
    to: '/templates/contato',
  },
];

const Navigations = () => {
  const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: '15px',
    color: theme.palette.text.secondary,
    fontWeight: 500,
    '&.active': {
      backgroundColor: 'rgba(93, 135, 255, 0.15)',
      color: theme.palette.primary.main,
    },
  }));

  const location = useLocation();

  return (
    <>
      {NavLinks.map((navlink, i) => (
        <StyledButton
          color="inherit"
          component={NavLink}
          to={navlink.to}
          className={({ isActive }) => (isActive ? 'active' : '')}
          variant="text"
          key={i}
        >
          {navlink.title}{' '}
          {navlink.new ? (
            <Chip
              label="New"
              size="small"
              sx={{
                ml: '6px',
                borderRadius: '8px',
                color: 'primary.main',
                backgroundColor: 'rgba(93, 135, 255, 0.15)',
              }}
            />
          ) : null}
        </StyledButton>
      ))}
    </>
  );
};

export default Navigations;
