import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const ContatoTittle = () => {
    return (
    <Box textAlign="center" mb={3} display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Box  sx ={{width: { xs: '100%', md : '80%' }}}  p={2}>
            <Typography variant="h2" fontWeight={600} mb={1 } sx={{ fontSize: { xs: '30px', sm: '36px', }}} >
                Entre em  {' '} 
                <Typography variant="h1" sx={{ fontSize: { xs: '30px', sm: '36px', }, }} fontWeight={700} component="span" color="primary.main"> contato</Typography>
                {' '}  conosco {' '}
            </Typography>  
        </Box>
    </Box>
    );
};

export default ContatoTittle;
