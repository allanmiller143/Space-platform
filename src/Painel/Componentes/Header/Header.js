
import { Box, Card, Typography, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationContext from '../../../Services/Notification/NotificationContext/NotificationContext';
import { useContext } from 'react';
import DrawerList from '../../DrawerList';


const Header = () => {
  const { socket } = useContext(NotificationContext);

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
            <DrawerList />
            <Typography variant="h5" fontWeight="bold" color="primary">
              Space iMóveis
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
