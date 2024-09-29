/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Grid, Typography, Button, Stack, CardContent } from '@mui/material';
import CustomTextField from '../../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../forms/theme-elements/CustomFormLabel';
import { useState } from 'react';
import BlankCard from '../../../shared/BlankCard';
import { toast } from 'sonner';
import Loading from '../../../Loading/Loading';
import { getData, putFormData } from '../../../../Services/Api';

const EditarRedesSociais = () => {
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString); // Parse para obter o objeto
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);

  // Estados para cada campo de redes sociais
  const [facebook, setFacebook] = useState(currentUserls.social?.facebook || '');
  const [whatsapp, setWhatsapp] = useState(currentUserls.info.phone || '');
  const [instagram, setInstagram] = useState(currentUserls.social?.instagram || '');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    const socialMediaData = {
      facebook,
      whatsapp,
      instagram,
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(socialMediaData));

    if (!facebook || !whatsapp || !instagram) {
      toast.warning('Por favor, preencha todos os campos de redes sociais: Facebook, WhatsApp, Instagram');
      setLoading(false);
      return;
    }

    try {
      const response = await putFormData(`${currentUserls.type}/${currentUserls.email}/social`, formData, token);
      if (response.status === 200 || response.status === 201) {
        const updatedUser = await getData(`find/${currentUserls.email}`);
        if (updatedUser.status === 200) {
          const user = updatedUser.userInfo;
          localStorage.setItem('currentUser', JSON.stringify(user));
          toast.success('Redes sociais atualizadas com sucesso');
        } else {
          toast.error(`Erro ao obter dados do usuário:\n ${updatedUser.message}`);
        }
      } else {
        toast.error(`Erro ao atualizar redes sociais:\n ${response.message}`);
      }
    } catch (error) {
      toast.error(`Erro ao atualizar redes sociais:\n ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid item lg={5} xs={12}>
      {loading && <Loading data={{ open: loading }} />}

      <BlankCard>
        <CardContent>
          <Typography variant="h5" mb={1}>
            Redes Sociais
          </Typography>
          <Typography color="textSecondary" mb={3}>
            Para atualizar suas redes sociais, edite e salve aqui
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CustomFormLabel htmlFor="facebook">Facebook</CustomFormLabel>
                <CustomTextField
                  id="facebook"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <CustomFormLabel htmlFor="whatsapp">WhatsApp</CustomFormLabel>
                <CustomTextField
                  id="whatsapp"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <CustomFormLabel htmlFor="instagram">Instagram</CustomFormLabel>
                <CustomTextField
                  id="instagram"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }} mt={3}>
              <Button type="submit" size="large" variant="contained" color="primary">
                Salvar
              </Button>
              <Button size="large" variant="text" color="error">
                Cancelar
              </Button>
            </Stack>
          </form>
        </CardContent>
      </BlankCard>
    </Grid>
  );
};

export default EditarRedesSociais;
