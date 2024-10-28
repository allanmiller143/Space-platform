import { useState } from 'react';
import { Box, Menu, Typography, Button, Divider, Grid } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { IconChevronDown, IconHelp } from '@tabler/icons';
import AppLinks from './AppLinks';
import QuickLinks from './QuickLinks';
import React from 'react';

const AppDD = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const location = useLocation();

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <>
      <Box>
        <Button
          aria-label="Exibir 11 notificacoes"
          color="inherit"
          variant="text"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            bgcolor: anchorEl2 ? 'primary.light' : '',
            color: anchorEl2 ? 'primary.main' : (theme) => theme.palette.text.secondary,
          }}
          onClick={handleClick2}
          endIcon={<IconChevronDown size="15" style={{ marginLeft: '-5px', marginTop: '2px' }} />}
        >
          Ferramentas
        </Button>
        <Menu
          id="msgs-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          sx={{
            '& .MuiMenu-paper': {
              width: '600px',
            },
            '& .MuiMenu-paper ul': {
              p: 0,
            },
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box p={3}>
                <AppLinks />
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Link to="/faq">
                    <Typography
                      variant="subtitle2"
                      fontWeight="600"
                      color="textPrimary"
                      display="flex"
                      alignItems="center"
                      gap="4px"
                    >
                      <IconHelp width={24} />
                      Perguntas Frequentes
                    </Typography>
                  </Link>
                  <Button variant="contained" color="primary" size="small">
                    Ler mais
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Menu>
      </Box>

      

      <Button
        color="inherit"
        sx={{
          color: (theme) => theme.palette.text.secondary,
          bgcolor: location.pathname === '/user-profile' ? 'primary.light' : '',
        }}
        variant="text"
        to={`/user-profile/`}
        component={Link}
      >
        Minha página
      </Button>
      
      <Button
        color="inherit"
        sx={{
          color: (theme) => theme.palette.text.secondary,
          bgcolor: location.pathname === '/apps/imoveis/list' ? 'primary.light' : '',
        }}
        variant="text"
        to="/apps/imoveis/list"
        component={Link}
      >
        Meus imóveis
      </Button>
      <Button
        color="inherit"
        sx={{
          color: (theme) => theme.palette.text.secondary,
          bgcolor: location.pathname === '/apps/chats' ? 'primary.light' : '',
        }}
        variant="text"
        to="/apps/chats"
        component={Link}
      >
        Mensagens
      </Button>
      <Button
        color="inherit"
        sx={{
          color: (theme) => theme.palette.text.secondary,
          bgcolor: location.pathname === '/marketplace' ? 'primary.light' : '',
        }}
        variant="text"
        to="/marketplace"
        component={Link}
      >
        Buscar imóveis
      </Button>
      <Button
        color="inherit"
        sx={{
          color: (theme) => theme.palette.text.secondary,
          bgcolor: location.pathname === '/templates/feed' ? 'primary.light' : '',
        }}
        variant="text"
        to="/templates/feed"
        component={Link}
      >
        Feed
      </Button>
    </>
  );
};

export default AppDD;
