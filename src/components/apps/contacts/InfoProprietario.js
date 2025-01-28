import {Box,Typography,Avatar,Grid,} from '@mui/material';


const InfoProprietario = ({user}) => {

  return (
    <Box>
        <Typography variant="h6" fontWeight={600} mb ={3} >Informações do proprietário</Typography>
        <Box display="flex" alignItems="start" mb={3}>
        <Avatar
            alt={(user.seller && user.seller.profile && user.seller.profile.url) ? user.seller.profile.url : '' }
            src={(user.seller && user.seller.profile && user.seller.profile.url) ? user.seller.profile.url : '' }
            sx={{ width: '72px', height: '72px' }}
        />
        <Box sx={{ ml: 2 }}>
            <Grid container >
            <Grid item md={8} xs={12}>
                <Typography variant="body2" color="text.secondary">
                Nome
                </Typography>
                <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                {user.seller.name}
                </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
                <Typography variant="body2" color="text.secondary">
                Número de Telefone
                </Typography>
                <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                {user.seller.info.phone}
                </Typography>
            </Grid>
            <Grid item md={4} xs={12}>
                <Typography variant="body2" color="text.secondary">
                email 
                </Typography>
                <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                {user.seller.email}
                </Typography>
            </Grid>
            </Grid> 
        </Box>
        </Box>
    </Box> 
  );
};

export default InfoProprietario;
