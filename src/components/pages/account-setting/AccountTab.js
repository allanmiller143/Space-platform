import React from 'react';
import { Grid, CardContent, Typography } from '@mui/material';
import BlankCard from '../../shared/BlankCard';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import user1 from 'src/assets/images/profile/user-1.jpg';
import DadosPessoais from './EditProfileComponentes/DadosPessoais';

const AccountTab = () => {
  const [location, setLocation] = React.useState('india');
  const [currency, setCurrency] = React.useState('india');

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={6}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Alterar Perfil
            </Typography>
            <Typography color="textSecondary" mb={3}>
              Altere sua foto de perfil aqui
            </Typography>
            <Avatar
              src={user1}
              alt="User Profile"
              sx={{ width: 120, height: 120, margin: '0 auto' }}
            />
            <Stack direction="row" justifyContent="center" spacing={2} my={3}>
              <Button variant="contained" component="label">
                Enviar
                <input hidden accept="image/*" multiple type="file" />
              </Button>
              <Button variant="outlined" color="error">
                Redefinir
              </Button>
            </Stack>
            <Typography variant="subtitle1" color="textSecondary" mb={4}>
              Permitido JPG, GIF ou PNG. Tamanho máximo de 800K
            </Typography>
          </CardContent>
        </BlankCard>
      </Grid>

      <Grid item xs={12}>
        <BlankCard>
          <CardContent>
            <DadosPessoais
              location={location}
              setLocation={setLocation}
              currency={currency}
              setCurrency={setCurrency}
            />
          </CardContent>
        </BlankCard>
      </Grid>
    </Grid>
  );
};

export default AccountTab;
