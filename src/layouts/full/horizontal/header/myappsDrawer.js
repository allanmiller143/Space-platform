import { Box, Typography, Grid, Divider } from '@mui/material';
import AppLinks from '../../vertical/header/AppLinks';

const MyAppsDrawer = () => {
  return (
    <Box
      sx={{
        width: 320,
        pt: 2,
      }}
    >
      <Typography variant="h5" mb={4}>
        Meus Aplicativos
      </Typography>

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box p={0}>
            <AppLinks />
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ mt: 1 }} />
    </Box>
  );
};

export default MyAppsDrawer;
