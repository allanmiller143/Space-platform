/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { IconButton, Box, AppBar, useMediaQuery, Toolbar, styled, Stack, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { toggleMobileSidebar } from 'src/store/customizer/CustomizerSlice';
import { IconMenu2 } from '@tabler/icons';
import Profile from 'src/layouts/full/vertical/header/Profile';
import Navigation from 'src/layouts/full/vertical/header/Navigation';
import Logo from 'src/layouts/full/shared/logo/Logo';
import { Link } from 'react-router-dom';
import Notifications from 'src/layouts/full/vertical/header/Notifications';
import MyAppsDrawer from './myappsDrawer';

const Header = ({ socket }) => {
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = cuString ? JSON.parse(cuString) : null;
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const customizer = useSelector((state) => state.customizer);
  const dispatch = useDispatch();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: customizer.TopbarHeight,
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    margin: '0 auto',
    width: '100%',
    color: `${theme.palette.text.secondary} !important`,
  }));

  return (
    <AppBarStyled position="sticky" color="default" elevation={8}>
      <ToolbarStyled
        sx={{
          maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
        }}
      >
        <Box sx={{ width: lgDown ? '45px' : 'auto', overflow: 'hidden' }}>
          <Logo />
        </Box>
        

        {lgDown ? (
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={() => dispatch(toggleMobileSidebar())}
          >
            <IconMenu2 />
          </IconButton>
        ) : null}

        {lgUp && <Navigation socket={socket} />}

        <Box flexGrow={1} />

        <Stack spacing={1} direction="row" alignItems="center">
          {!currentUserls && (
            <>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/auth/login"
              >
                Login
              </Button>
              <Button
                color="primary"
                fullWidth
                component={Link}
                to="/auth/register2"
              >
                Criar conta
              </Button>
            </>
          )}
          {currentUserls && (
            <>
              <MyAppsDrawer />
              <Notifications />
              <Profile />
            </>
          )}
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  toggleSidebar: PropTypes.func,
};

export default Header;
