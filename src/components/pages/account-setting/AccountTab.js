/* eslint-disable no-unused-vars */
import { CardContent, Grid, Typography } from '@mui/material';

// componentes
import BlankCard from '../../shared/BlankCard';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import EditarFoto from './EditProfileComponentes/EditarFoto';
import DadosPessoais from './EditProfileComponentes/DadosPessoais';
import EditarEndereco from './EditProfileComponentes/EditarEndereco';
import EditarBio from './EditProfileComponentes/EditarBio';
import { Box } from '@mui/system';


const AccountTab = () => {


  return (
    <Grid container spacing={3}>
        <EditarFoto />      
        <EditarBio/>
        <DadosPessoais />
        <EditarEndereco />

    </Grid>
  );
};

export default AccountTab;
