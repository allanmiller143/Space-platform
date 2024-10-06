import React, { useState } from 'react';
import { Stack, Typography, TextField, IconButton, Box, Button } from '@mui/material';
import ChildCard from 'src/components/shared/ChildCard';
import { IconBriefcase, IconMail, IconMapPin, IconEdit, IconPhone, IconBrandWhatsapp, IconGlobe } from '@tabler/icons';

const InfoCard = () => {
  const [isEditing, setIsEditing] = useState({ site: false, email: false, phone: false, whatsapp: false, address: false });
  const [site, setSite] = useState('https://meusite.com');
  const [email, setEmail] = useState('meuemail@exemplo.com');
  const [phone, setPhone] = useState('(11) 99999-9999');
  const [whatsapp, setWhatsapp] = useState('(11) 98888-8888');
  const [address, setAddress] = useState({ city: 'São Paulo', state: 'SP' });

  const handleSave = (field) => {
    setIsEditing({ ...isEditing, [field]: false });
    // Aqui você pode adicionar lógica para salvar as informações no localStorage ou em um backend
  };

  return (
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
            <Button onClick={() => handleSave('site')} color="primary" sx={{ ml: 1 }}>
              Salvar
            </Button>
          </Box>
        ) : (
          <Typography>
            {site}
            <IconButton onClick={() => setIsEditing({ ...isEditing, site: true })} size="small">
              <IconEdit size="16" />
            </IconButton>
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
            <Button onClick={() => handleSave('email')} color="primary" sx={{ ml: 1 }}>
              Salvar
            </Button>
          </Box>
        ) : (
          <Typography>
            {email}
            <IconButton onClick={() => setIsEditing({ ...isEditing, email: true })} size="small">
              <IconEdit size="16" />
            </IconButton>
          </Typography>
        )}
      </Stack>
      <Stack direction="row" gap={2} alignItems="center" mb={3}>
        <IconPhone size="21" />
        {isEditing.phone ? (
          <Box>
            <TextField
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ mb: 1 }}
            />
            <Button onClick={() => setIsEditing({ ...isEditing, phone: false })}>Cancelar</Button>
            <Button onClick={() => handleSave('phone')} color="primary" sx={{ ml: 1 }}>
              Salvar
            </Button>
          </Box>
        ) : (
          <Typography>
            {phone}
            <IconButton onClick={() => setIsEditing({ ...isEditing, phone: true })} size="small">
              <IconEdit size="16" />
            </IconButton>
          </Typography>
        )}
      </Stack>
      <Stack direction="row" gap={2} alignItems="center" mb={3}>
        <IconBrandWhatsapp size="21" />
        {isEditing.whatsapp ? (
          <Box>
            <TextField
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ mb: 1 }}
            />
            <Button onClick={() => setIsEditing({ ...isEditing, whatsapp: false })}>Cancelar</Button>
            <Button onClick={() => handleSave('whatsapp')} color="primary" sx={{ ml: 1 }}>
              Salvar
            </Button>
          </Box>
        ) : (
          <Typography>
            {whatsapp}
            <IconButton onClick={() => setIsEditing({ ...isEditing, whatsapp: true })} size="small">
              <IconEdit size="16" />
            </IconButton>
          </Typography>
        )}
      </Stack>
      <Stack direction="row" gap={2} alignItems="center" mb={1}>
        <IconMapPin size="21" />
        {isEditing.address ? (
          <Box>
            <TextField
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              variant="outlined"
              size="small"
              sx={{ mb: 1 }}
            />
            <TextField
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
              variant="outlined"
              size="small"
              sx={{ mb: 1 }}
            />
            <Button onClick={() => setIsEditing({ ...isEditing, address: false })}>Cancelar</Button>
            <Button onClick={() => handleSave('address')} color="primary" sx={{ ml: 1 }}>
              Salvar
            </Button>
          </Box>
        ) : (
          <Typography>
            {address.city} - {address.state} - Brasil
            <IconButton onClick={() => setIsEditing({ ...isEditing, address: true })} size="small">
              <IconEdit size="16" />
            </IconButton>
          </Typography>
        )}
      </Stack>
    </ChildCard>
  );
};

export default InfoCard;
