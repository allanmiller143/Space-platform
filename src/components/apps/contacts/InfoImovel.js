import {Box,Typography,Avatar,Grid,} from '@mui/material';


const InfoImovel = ({imovel}) => {

  return (
    <Box>
        <Typography variant="h6" fontWeight={600} mb ={3} >Informações do Imovel</Typography>
        <Box display="flex" alignItems="start" mb={3}>
        <Avatar
            alt={imovel.image}
            src={imovel.image}
            sx={{ width: '72px', height: '72px' }}
        />
        <Box sx={{ ml: 2 }}>
            <Grid container >
            <Grid item md={8} xs={12}>
                <Typography variant="body2" color="text.secondary">
                    Nome
                </Typography>
                <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                    Allan MIller Silva Lima
                </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
                <Typography variant="body2" color="text.secondary">
                    Número de Telefone
                </Typography>
                <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                    {imovel.phone}
                </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
                <Typography variant="body2" color="text.secondary">
                    email 
                </Typography>
                <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                    {imovel.email}
                </Typography>
            </Grid>
            </Grid> 
        </Box>
        </Box>
    </Box> 
  );
};

export default InfoImovel;
