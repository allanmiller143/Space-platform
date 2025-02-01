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

  const socialsMap = currentUserls.socials.reduce((acc, social) => {
    acc[social.type] = social.url === '.' ? '' : social.url;
    return acc;
  }, {});
  
  // Definindo os estados com base no mapeamento
  const [facebook, setFacebook] = useState(socialsMap["facebook"] || '');
  const [whatsapp, setWhatsapp] = useState(socialsMap["whatsapp"] || '');
  const [instagram, setInstagram] = useState(socialsMap["instagram"] || '');
  const [site, setSite] = useState(socialsMap["site"] || '');
  const [email, setEmail] = useState(socialsMap["email"] || '');
  const [phone, setPhone] = useState(socialsMap["phone"] || '');

  
  const isValidSocialHandle = (value) => {
    if(value === ''){
      return true;
    }
    return value.startsWith('@') && !/http|www/.test(value);
  };



  const formatPhoneNumber = (value) => {
    if (!value) return '';
    const cleaned = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    if (cleaned.length <= 2) {
      return `(${cleaned}`;
    } else if (cleaned.length <= 7) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    } else if (cleaned.length <= 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Validações
    if (!isValidSocialHandle(facebook)) {
      toast.error('Por favor, insira apenas o nome de usuário do Facebook, começando com "@", sem links.');
      setLoading(false);
      return;
    }
    if (!isValidSocialHandle(instagram)) {
      toast.error('Por favor, insira apenas o nome de usuário do Instagram, começando com "@", sem links.');
      setLoading(false);
      return;
    }

    const formJson = {
      socials : [
        {type : 'facebook', url : facebook || '.'},
        {type : 'whatsapp', url : whatsapp || '.'},
        {type : 'instagram', url : instagram || '.'},
        {type : 'site', url : site || '.'},
        {type : 'email', url : email || '.'},
        {type : 'otherPhone', url : phone || '.'},
      ],
    };


    console.log(formJson);
  
    const formData = new FormData();
    formData.append('data', JSON.stringify(formJson));

    try {
      const response = await putFormData(`${currentUserls.type}/${currentUserls.email}`, formData, token);
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
                  error={!isValidSocialHandle(facebook) && facebook !== ''}
                  helperText={
                    !isValidSocialHandle(facebook) && facebook !== ''
                      ? 'Insira apenas o @, sem links.'
                      : ''
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <CustomFormLabel htmlFor="whatsapp">WhatsApp</CustomFormLabel>
                <CustomTextField
                  id="whatsapp"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(formatPhoneNumber(e.target.value))}
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
                  error={!isValidSocialHandle(instagram) && instagram !== ''}
                  helperText={
                    !isValidSocialHandle(instagram) && instagram !== ''
                      ? 'Insira apenas o @, sem links.'
                      : ''
                  }
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
