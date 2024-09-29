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
import fetchCepData from '../../../../Services/SearchCep';
import DropDownFilter from '../../../../views/authentication/authForms/DropDownFilter';

const EditarEndereco = () => {
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString); // Parse para obter o objeto
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);

  // Estados para cada campo de endereço
  const [cep, setCep] = useState(currentUserls.address?.cep || '');
  const [rua, setRua] = useState(currentUserls.address?.street || '');
  const [numero, setNumero] = useState(currentUserls.address?.number || '');
  const [bairro, setBairro] = useState(currentUserls.address?.neighborhood || '');
  const [estado, setEstado] = useState(currentUserls.address?.state || '');
  const [cidade, setCidade] = useState(currentUserls.address?.city || '');
  const [complemento, setComplemento] = useState(currentUserls.address?.complement || '');


  const handleCepChange = async (value) => {
    setCep(value);
    if (value.length === 8) {
      try {
        const cepData = await fetchCepData(value);
        setRua(cepData.street);
        setBairro(cepData.district);
        setEstado(cepData.state);
        setCidade(cepData.city);
        console.log(cepData);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };    

  const localItens = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' }
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formJson = {
      'cep': cep,
      'street':rua,
      'number':numero,
      'neighborhood':bairro,
      'state': estado,
      'city': cidade,
      'complement' : complemento,
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(formJson));

    if(!cep || !rua || !numero || !bairro || !estado || !cidade){
      toast.warning("Por favor, preencha todos os campos de endereço: Rua, Número, Bairro, Cidade, Estado e CEP");
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
          toast.success('Endereço atualizado com sucesso'); 
        } else {
          toast.error(`Erro ao obter dados do usuário:\n ${responseUserData.message}`);
        }
      }
    } catch (error) {
      toast.error(`Erro ao atualizar bio:\n ${error.message}`);
    } finally {
      setLoading(false);
    }

  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setEstado(selectedValue);
  };

  return (
    <Grid item xs={12}>
      {loading && <Loading data={{ open: loading }} />}

      <BlankCard>
        <CardContent>
          <Typography variant="h5" mb={1}>
            Endereço
          </Typography>
          <Typography color="textSecondary" mb={3}>
            Para alterar seu endereço, edite e salve aqui
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <CustomFormLabel htmlFor="text-cep">CEP</CustomFormLabel>
                <CustomTextField
                  id="text-cep"
                  value={cep}
                  onChange={(e) => handleCepChange(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomFormLabel htmlFor="text-cidade">Cidade</CustomFormLabel>
                <CustomTextField
                  id="text-cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={10} sm={10}>
                <CustomFormLabel htmlFor="text-rua">Rua</CustomFormLabel>
                <CustomTextField
                  id="text-rua"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item xs={2} sm={2}>
                <CustomFormLabel htmlFor="text-numero">Número</CustomFormLabel>
                <CustomTextField
                  id="text-numero"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <CustomFormLabel htmlFor="text-bairro">Bairro</CustomFormLabel>
                <CustomTextField
                  id="text-bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <CustomFormLabel htmlFor="state">Estado</CustomFormLabel>
                <DropDownFilter 
                    handleSelectChange={handleSelectChange} 
                    initialValue={estado}
                    data={{ label: '', itens: localItens}} 
                />
            </Grid>


            <Grid item xs={12}>
                <CustomFormLabel htmlFor="text-complemento">Complemento</CustomFormLabel>
                <CustomTextField
                    id="text-complemento"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                    variant="outlined"
                    fullWidth
                    multiline
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

export default EditarEndereco;
