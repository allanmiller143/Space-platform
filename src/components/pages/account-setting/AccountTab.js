/* eslint-disable no-unused-vars */
import { CardContent, Grid, Typography } from '@mui/material';

// componentes
import EditarFoto from './EditProfileComponentes/EditarFoto';
import DadosPessoais from './EditProfileComponentes/DadosPessoais';
import EditarEndereco from './EditProfileComponentes/EditarEndereco';
import EditarBio from './EditProfileComponentes/EditarBio';
import { Box } from '@mui/system';
import EditarRedesSociais from './EditProfileComponentes/EditarRedesSociais';


const AccountTab = () => {


  return (
    <Grid container spacing={3}>
        <EditarFoto />      
        <EditarBio/>
        <DadosPessoais />
        <EditarRedesSociais/>
        <EditarEndereco />
    </Grid>
  );
};

export default AccountTab;
