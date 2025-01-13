/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box, Stack, Button } from '@mui/material';
import Profile from 'src/layouts/full/vertical/header/Profile';
import Logo from 'src/layouts/full/shared/logo/Logo';
import { Link } from 'react-router-dom';
import Notifications from 'src/layouts/full/vertical/header/Notifications';
import MyAppsDrawer from './myappsDrawer';
import Navigation from 'src/layouts/full/vertical/header/Navigation';

const Header = () => {
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = cuString ? JSON.parse(cuString) : null;

  return (
    <Box
      position="sticky"
      color="default"
      elevation={8}
      sx={{
        zIndex: 1101,
        width: '100%',
        backdropFilter: 'blur(4px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.05), rgba(0,0,0,0.15))',
          backdropFilter: 'blur(4px)',
        },
      }}
    >
      <Box
        sx={{
          maxWidth: 'lg',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          position: 'relative',
        }}
      >
        <Logo />
        <Navigation />
        <Box flexGrow={1} />

        <Stack spacing={1} direction="row" alignItems="center">
          {!currentUserls ? (
            <>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/auth/login"
              >
                Login
              </Button>
              <Button color="primary" component={Link} to="/auth/register2">
                Criar conta
              </Button>
            </>
          ) : (
            <>
              <MyAppsDrawer />
              <Notifications />
              <Profile />
            </>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default Header;
