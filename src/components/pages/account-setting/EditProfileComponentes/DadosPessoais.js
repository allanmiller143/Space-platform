/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Grid, Typography, Button, Stack, CardContent } from '@mui/material';
import CustomTextField from '../../../forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../forms/theme-elements/CustomFormLabel';
import { useState } from 'react';
import BlankCard from '../../../shared/BlankCard';
import { getData, putData, putFormData } from '../../../../Services/Api';
import { toast } from 'sonner';
import Loading from '../../../Loading/Loading';

const DadosPessoais = () => {
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString); // Parse para obter o objeto
  const token = localStorage.getItem('token');
  const [loading,setLoading] = useState(false);

  // Estados para cada campo editável
  const [name, setName] = useState(currentUserls.name || '');
  const [phone, setPhone] = useState(currentUserls.info.phone || '');
  const [cnpj, setCnpj] = useState(currentUserls.info.cnpj || '');
  const [creci, setCreci] = useState(currentUserls.info.creci || '');
  const [rg, setRg] = useState(currentUserls.info.rg || '');
  const [cpf, setCpf] = useState(currentUserls.info.cpf || '');

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


  const handleSubmit = async () => {
    event.preventDefault();
    setLoading(true);
    const formJson = {
        'name': name,
        'phone': phone,
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(formJson));

    if(!name || !phone){
      toast.warning("Por favor, preencha todos os campos de endereço: Nome, Telefone");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await putFormData(`${currentUserls.type}/${currentUserls.email}`, formData, token);
      if (response.status === 200 || response.status === 201) {
        const responseUserData = await getData(`find/${currentUserls.email}`);
        if (responseUserData.status === 200) {
          const user = responseUserData.userInfo;
          localStorage.setItem('currentUser', JSON.stringify(user));
          toast.success('Dados pessoais atualizados com sucesso'); 
        } else {
          toast.error(`Erro ao obter dados do usuário:\n ${responseUserData.message}`);
        }
      }else{
        toast.error(`Erro ao atualizar dados pessoais:\n ${response.message}`);
      }
    } catch (error) {
      toast.error(`Erro ao atualizar bio:\n ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid item lg ={7} xs={12}>
      {loading && <Loading data = {{open:loading}}/>}

      <BlankCard>
        <CardContent>
          <Typography variant="h5" mb={1}>
            Detalhes Pessoais
          </Typography>
          <Typography color="textSecondary" mb={3}>
            Para alterar seus detalhes pessoais, edite e salve aqui
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <CustomFormLabel htmlFor="text-name">
                  {currentUserls.type === 'realstate' ? 'Razão Social' : 'Nome Completo'}
                </CustomFormLabel>
                <CustomTextField
                  id="text-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomFormLabel htmlFor="text-email">E-mail</CustomFormLabel>
                <CustomTextField
                  id="text-email"
                  value={currentUserls.email}
                  variant="outlined"
                  fullWidth
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <CustomFormLabel htmlFor="text-phone">Telefone</CustomFormLabel>
                <CustomTextField
                  id="text-phone"
                  value={phone}
                  onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              {currentUserls.type === 'realstate' && (
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="text-cnpj">CNPJ</CustomFormLabel>
                  <CustomTextField
                    id="text-cnpj"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                    variant="outlined"
                    fullWidth
                    disabled
                  />
                </Grid>
              )}

              {(currentUserls.type === 'realstate' || currentUserls.type === 'realtor') && (
                <Grid item xs={12} sm={6}>
                  <CustomFormLabel htmlFor="text-creci">CRECI</CustomFormLabel>
                  <CustomTextField
                    id="text-creci"
                    value={creci}
                    onChange={(e) => setCreci(e.target.value)}
                    variant="outlined"
                    fullWidth
                    disabled
                  />
                </Grid>
              )}

              {currentUserls.type !== 'realstate' && (
                <>
                  <Grid item xs={12} sm={6}>
                    <CustomFormLabel htmlFor="text-rg">RG</CustomFormLabel>
                    <CustomTextField
                      id="text-rg"
                      value={rg}
                      onChange={(e) => setRg(e.target.value)}
                      variant="outlined"
                      fullWidth
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <CustomFormLabel htmlFor="text-cpf">CPF</CustomFormLabel>
                    <CustomTextField
                      id="text-cpf"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      variant="outlined"
                      fullWidth
                      disabled
                    />
                  </Grid>
                </>
              )}
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

export default DadosPessoais;
