import { CardContent, Grid, Typography } from '@mui/material';

// componentes
import BlankCard from '../../shared/BlankCard';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import EditarFoto from './EditProfileComponentes/EditarFoto';
import DadosPessoais from './EditProfileComponentes/DadosPessoais';


const AccountTab = () => {


  return (
    <Grid container spacing={3}>
      {/* Alterar Perfil */}
      <EditarFoto />
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
      <DadosPessoais />

    </Grid>
  );
};

export default AccountTab;
