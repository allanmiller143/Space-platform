import React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';
import Logo from '../../../../layouts/full/shared/logo/Logo';
import Navigations from './Navigations';
import { IconMenu2 } from '@tabler/icons';
import Profile from '../../../../layouts/full/vertical/header/Profile';
import PhoneDrawer from './PhoneDrawer';

const HpHeader = () => {
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString); 

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    justifyContent: 'center',
    [theme.breakpoints.up('lg')]: {
      minHeight: '100px',
    },
    backgroundColor: theme.palette.primary.light,
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    color: theme.palette.text.secondary,
    justifyContent: 'space-between',
  }));

  //   sidebar
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };



  return (
    <AppBarStyled position="sticky" elevation={0}>
      <Container
        sx={{
          maxWidth: '1400px !important',
        }}
      >
        <ToolbarStyled>
          <Logo />
          {lgDown ? (
            <IconButton color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
              <IconMenu2 size="20" />
            </IconButton>
          ) : null}
          {lgUp ? (
            <>
              <Stack spacing={1} direction="row" alignItems="center">
                <Navigations />
              </Stack>
              {
                !currentUserls ? (
                  <Button color="primary" variant="contained" href="/auth/login">Log In</Button>
                ) : <Profile/>
              }
            </>
          ) : null}
        </ToolbarStyled>
      </Container>
      <PhoneDrawer open={open} setOpen={setOpen} />

    </AppBarStyled>
  );
};

export default HpHeader;
