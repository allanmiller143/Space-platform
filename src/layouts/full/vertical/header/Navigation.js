import { Box, Button} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';


const AppDD = () => {
  const location = useLocation();



  return (
    <Box sx={{ display: {md: 'flex', xs : 'none'}, alignItems: 'center', gap: 2 }}>
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
        Classificados
      </Button>

      {/* <Button
        color="inherit"
        sx={{
          color: (theme) => theme.palette.text.secondary,
          bgcolor: location.pathname === '/marketplace' ? 'primary.light' : '',
        }}
        variant="text"
        to="/apps/calendar"
        component={Link}
      >
        Calendário
      </Button> */}
    </Box>
  );
};

export default AppDD;
