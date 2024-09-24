/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Grid, Typography, Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { CardContent } from '@mui/material';
import BlankCard from '../../../shared/BlankCard';
import Avatar from '@mui/material/Avatar';
import user1 from 'src/assets/images/profile/user-1.jpg';
import { Box } from '@mui/system';

const EditarFoto = () => {
  return (
    <>
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
    </>
  );
};

export default EditarFoto;
