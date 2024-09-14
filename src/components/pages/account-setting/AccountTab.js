import React from 'react';
import { CardContent, Grid, Typography, MenuItem, Box, Avatar, Button, Stack } from '@mui/material';

// componentes
import BlankCard from '../../shared/BlankCard';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomSelect from '../../forms/theme-elements/CustomSelect';

// imagens
import user1 from 'src/assets/images/profile/user-1.jpg';

// localizações
const locations = [
  {
    value: 'us',
    label: 'Estados Unidos',
  },
  {
    value: 'uk',
    label: 'Reino Unido',
  },
  {
    value: 'india',
    label: 'Índia',
  },
  {
    value: 'russia',
    label: 'Rússia',
  },
];

// moeda
const currencies = [
  {
    value: 'us',
    label: 'Dólar Americano ($)',
  },
  {
    value: 'uk',
    label: 'Libra Esterlina (£)',
  },
  {
    value: 'india',
    label: 'Rúpia Indiana (₹)',
  },
  {
    value: 'russia',
    label: 'Rublo Russo (₽)',
  },
];

const AccountTab = () => {
  const [location, setLocation] = React.useState('india');

  const handleChange1 = (event) => {
    setLocation(event.target.value);
  };

  //   moeda
  const [currency, setCurrency] = React.useState('india');

  const handleChange2 = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <Grid container spacing={3}>
      {/* Alterar Perfil */}
      <Grid item xs={12} lg={6}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Alterar Perfil
            </Typography>
            <Typography color="textSecondary" mb={3}>Altere sua foto de perfil aqui</Typography>
            <Box textAlign="center" display="flex" justifyContent="center">
              <Box>
                <Avatar
                  src={user1}
                  alt={user1}
                  sx={{ width: 120, height: 120, margin: '0 auto' }}
                />
                <Stack direction="row" justifyContent="center" spacing={2} my={3}>
                  <Button variant="contained" color="primary" component="label">
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
              </Box>
            </Box>
          </CardContent>
        </BlankCard>
      </Grid>
      {/*  Alterar Senha */}
      <Grid item xs={12} lg={6}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Alterar Senha
            </Typography>
            <Typography color="textSecondary" mb={3}>Para alterar sua senha, por favor confirme aqui</Typography>
            <form>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="text-cpwd"
              >
                Senha Atual
              </CustomFormLabel>
              <CustomTextField
                id="text-cpwd"
                value="MathewAnderson"
                variant="outlined"
                fullWidth
                type="password"
              />
              {/* 2 */}
              <CustomFormLabel htmlFor="text-npwd">Nova Senha</CustomFormLabel>
              <CustomTextField
                id="text-npwd"
                value="MathewAnderson"
                variant="outlined"
                fullWidth
                type="password"
              />
              {/* 3 */}
              <CustomFormLabel htmlFor="text-conpwd">Confirmar Senha</CustomFormLabel>
              <CustomTextField
                id="text-conpwd"
                value="MathewAnderson"
                variant="outlined"
                fullWidth
                type="password"
              />
            </form>
          </CardContent>
        </BlankCard>
      </Grid>
      {/* Editar Detalhes */}
      <Grid item xs={12}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Detalhes Pessoais
            </Typography>
            <Typography color="textSecondary" mb={3}>Para alterar seus detalhes pessoais, edite e salve aqui</Typography>
            <form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-name"
                  >
                    Seu Nome
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-name"
                    value="Mathew Anderson"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 2 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-store-name"
                  >
                    Nome da Loja
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-store-name"
                    value="Maxima Studio"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 3 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-location"
                  >
                    Localização
                  </CustomFormLabel>
                  <CustomSelect
                    fullWidth
                    id="text-location"
                    variant="outlined"
                    value={location}
                    onChange={handleChange1}
                  >
                    {locations.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 4 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-currency"
                  >
                    Moeda
                  </CustomFormLabel>
                  <CustomSelect
                    fullWidth
                    id="text-currency"
                    variant="outlined"
                    value={currency}
                    onChange={handleChange2}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 5 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-email"
                  >
                    E-mail
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-email"
                    value="info@modernize.com"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 6 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-phone"
                  >
                    Telefone
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-phone"
                    value="+91 12345 65478"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* 7 */}
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-address"
                  >
                    Endereço
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-address"
                    value="814 Howard Street, 120065, India"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </BlankCard>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }} mt={3}>
          <Button size="large" variant="contained" color="primary">
            Salvar
          </Button>
          <Button size="large" variant="text" color="error">
            Cancelar
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AccountTab;
