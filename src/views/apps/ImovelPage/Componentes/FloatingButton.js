/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { useNavigate } from 'react-router-dom';

export default function FloatingButton({advertiser}) {
  const navigate = useNavigate();  
  const onclick = () => {
    navigate(`/imoveis/${advertiser.email.replaceAll(/[.]/g, '-')}`);
}  
  return (
    <Box sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', bottom: 16, right: 16 }} onClick={onclick}>
      <Fab variant="extended" color='primary'>
        <NavigationIcon sx={{ mr: 1 }} />
            Mais Imóveis
      </Fab>

    </Box>
  );
}
