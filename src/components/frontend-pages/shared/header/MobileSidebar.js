/* eslint-disable react/jsx-key */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Logo from '../../../../layouts/full/shared/logo/Logo';
import { NavLinks } from './Navigations';
import { Chip, Divider, Typography } from '@mui/material';
import Profile from '../../../../layouts/full/vertical/header/Profile';

const MobileSidebar = () => {
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString);

  return (
    <>
      {/* Header Section */}
      <Box p={1}>
        {!currentUserls ? (
          <Box pl={3}>
            <Logo />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Profile />
            <Typography variant="caption">
              <strong>{currentUserls.name}</strong>
            </Typography>
          </Box>
        )}
      </Box>

      {/* Divider */}
      <Divider />

      {/* Navigation Links */}
      <Box p={3}>
        <Stack direction="column" spacing={2}>
          {NavLinks.map((navlink) => (
            <Button
              key={navlink.to}
              color="inherit"
              href={navlink.to}
              sx={{ justifyContent: 'start' }}
            >
              {navlink.title}
              {navlink.new && (
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
              )}
            </Button>
          ))}
        </Stack>
      </Box>

      {/* Login Button */}
      {!currentUserls && (
        <Box
          sx={{
            width: '200px',
            display: 'flex',
            justifyContent: 'center',
            margin: '0 auto',
          }}
        >
          <Button
            color="primary"
            variant="contained"
            href="/auth/login"
            sx={{ width: '100%' }}
          >
            Log In
          </Button>
        </Box>
      )}
    </>
  );
};

export default MobileSidebar;
