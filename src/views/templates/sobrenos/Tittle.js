import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const Tittle = () => {
    return (
    <Box textAlign="center" mb={3} display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Typography variant="h1" fontWeight={700} lineHeight="1.2"  mb={3} sx={{ fontSize: { xs: '40px', sm: '56px', }, }} >
            Space {' '} 
            <Typography variant="h1" sx={{ fontSize: { xs: '40px', sm: '60px', }, }} fontWeight={700} component="span" color="primary.main"> Imoveis</Typography>
        </Typography>  
        <Box  sx ={{width: { xs: '100%', md : '80%' }}}  p={2}>
            <Typography variant="h2" fontWeight={600} mb={1 } sx={{ fontSize: { xs: '30px', sm: '36px', }}} >
                Conectando {' '} 
                <Typography variant="h1" sx={{ fontSize: { xs: '30px', sm: '36px', }, }} fontWeight={700} component="span" color="primary.main"> pessoas</Typography>
                {' '}  e {' '}
                <Typography variant="h1" sx={{fontSize: {xs: '30px', sm: '36px',}}} fontWeight={700} component="span" color="primary.main"> oportunidades</Typography>
                {' '} no universo {' '}
                <Typography variant="h1" sx={{fontSize: {xs: '30px', sm: '36px',}}} fontWeight={700} component="span" color="primary.main"> imobiliário</Typography>
            </Typography>  
        </Box>
    </Box>
    );
};

export default Tittle;
