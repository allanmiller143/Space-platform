/* eslint-disable react/prop-types */

import { Box, Typography, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DrawerList from '../../DrawerList';


const Header = ({selectedPage, setSelectedPage}) => {

  return (
      <Box width='100%' margin="0 auto"
        sx={{
          boxShadow: 2,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}>
        <Box
          maxWidth="lg"
          margin="0 auto"
          py={2}
          mb = {3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Menu e Título */}
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <DrawerList selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
            <Typography variant="h5" fontWeight="bold" color="primary">
              Space iMóveis Dash
            </Typography>
          </Box>

          {/* Ícones de ação */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="primary">
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
  );
};

export default Header;
