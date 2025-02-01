/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { Stack, Typography, TextField, IconButton, Box, Button } from '@mui/material';
import ChildCard from 'src/components/shared/ChildCard';
import { IconMail, IconMapPin, IconEdit, IconPhone, IconBrandWhatsapp, IconGlobe } from '@tabler/icons';
import { toast } from 'sonner';
import { getData, putFormData } from '../../../../Services/Api';
import Loading from '../../../Loading/Loading';

const InfoCard = ( {userData}) => {
  const [isEditing, setIsEditing] = useState({ site: false, email: false, phone: false, whatsapp: false, address: false });
  const [address] = useState({ city: userData.address.city, state: userData.address.state });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString); // Parse para obter o objeto
  const socialsMap = currentUserls.socials.reduce((acc, social) => {
    acc[social.type] = social.url === '.' ? '' : social.url;
    return acc;
  }, {});
  
  // Definindo os estados com base no mapeamento
  const [whatsapp, setWhatsapp] = useState(socialsMap["whatsapp"] || '');
  const [site, setSite] = useState(socialsMap["site"] || 'https://meusite.com');
  const [email, setEmail] = useState(socialsMap["email"] || 'email@gmail.com');
  const [phone, setPhone] = useState(socialsMap["phone"] || '(11) 99999-9999');
  
  
  


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
    setIsEditing({ site: false, email: false, phone: false, whatsapp: false, address: false });
    setLoading(true);
    const formJson = {
      socials : [
        {type : 'facebook', url : socialsMap["facebook"] !== '.' ? socialsMap["facebook"] : '.'},
        {type : 'whatsapp', url : whatsapp !== '(11) 99999-9999' ? whatsapp : '.'},
        {type : 'instagram', url : socialsMap["instagram"] !== '.' ? socialsMap["instagram"] : '.'},
        {type : 'site', url : site !== 'https://meusite.com' ? site : '.'},
        {type : 'email', url : email !== 'email@gmail.com' ? email : '.'},
        {type : 'otherPhone', url : phone !== '' ? phone : '.'},
      ],
    };


    console.log(formJson);
  
    const formData = new FormData();
    formData.append('data', JSON.stringify(formJson));

    try {
      const response = await putFormData(`${userData.type}/${userData.email}`, formData, token);
      if (response.status === 200 || response.status === 201) {
        const updatedUser = await getData(`find/${userData.email}`);
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
    <Box position={'relative'}  sx={{display: {xs: 'none',lg: 'block' }}}>
      {loading && <Loading data={{ open: loading, absolute: true }} />}
      <ChildCard sx={{ mt: 3, position: 'relative' }}>
        <Typography color="gray" fontWeight={600} variant="h6" mb={2}>
          Informações gerais
        </Typography>
        <Stack direction="row" marginTop={3} gap={2} alignItems="center" mb={3}>
          <IconGlobe size="21" />
          {isEditing.site ? (
            <Box>
              <TextField
                value={site}
                onChange={(e) => setSite(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mb: 1 }}
              />
              <Button onClick={() => setIsEditing({ ...isEditing, site: false })}>Cancelar</Button>
              <Button onClick={ handleSubmit} color="primary" sx={{ ml: 1 }}>
                Salvar
              </Button>
            </Box>
          ) : (
            <Typography>
              {site}
              {
                currentUserls.email === userData.email ? <IconButton onClick={() => setIsEditing({ ...isEditing, site: true })} size="small"> <IconEdit size="16" /> </IconButton> : null
              }
            </Typography>
          )}
        </Stack>
        <Stack direction="row" gap={2} alignItems="center" mb={3}>
          <IconMail size="21" />
          {isEditing.email ? (
            <Box>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mb: 1 }}
              />
              <Button onClick={() => setIsEditing({ ...isEditing, email: false })}>Cancelar</Button>
              <Button onClick={ handleSubmit} color="primary" sx={{ ml: 1 }}>
                Salvar
              </Button>
            </Box>
          ) : (
            <Typography>
              {email}
              {currentUserls.email === userData.email ? <IconButton onClick={() => setIsEditing({ ...isEditing, email: true })} size="small"> <IconEdit size="16" /> </IconButton> : null}
            </Typography>
          )}
        </Stack>
        <Stack direction="row" gap={2} alignItems="center" mb={3}>
          <IconPhone size="21" />
          {isEditing.phone ? (
            <Box>
              <TextField
                value={phone}
                onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                variant="outlined"
                size="small"
                sx={{ mb: 1 }}
              />
              <Button onClick={() => setIsEditing({ ...isEditing, phone: false })}>Cancelar</Button>
              <Button onClick={ handleSubmit} color="primary" sx={{ ml: 1 }}>
                Salvar
              </Button>
            </Box>
          ) : (
            <Typography>
              {phone}
              {currentUserls.email === userData.email ? <IconButton onClick={() => setIsEditing({ ...isEditing, phone: true })} size="small"> <IconEdit size="16" /> </IconButton> : null}
            </Typography>
          )}
        </Stack>
        <Stack direction="row" gap={2} alignItems="center" mb={3}>
          <IconBrandWhatsapp size="21" />
          {isEditing.whatsapp ? (
            <Box>
              <TextField
                value={whatsapp}
                onChange={(e) => setWhatsapp(formatPhoneNumber(e.target.value))}
                variant="outlined"
                size="small"
                sx={{ mb: 1 }}
              />
              <Button onClick={() => setIsEditing({ ...isEditing, whatsapp: false })}>Cancelar</Button>
              <Button onClick={ handleSubmit} color="primary" sx={{ ml: 1 }}>
                Salvar
              </Button>
            </Box>
          ) : (
            <Typography>
              {whatsapp}
              {currentUserls.email === userData.email ? <IconButton onClick={() => setIsEditing({ ...isEditing, whatsapp: true })} size="small"> <IconEdit size="16" /> </IconButton> : null}
            </Typography>
          )}
        </Stack>
        <Stack direction="row" gap={2} alignItems="center" mb={1}>
          <IconMapPin size="21" />
          <Typography>
            {address.city} - {address.state} - Brasil
          </Typography>
    
        </Stack>
      </ChildCard>
    </Box>
  );
};

export default InfoCard;
