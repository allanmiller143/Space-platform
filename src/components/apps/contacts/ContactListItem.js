
import React from 'react';
import {ListItemText,Box,Avatar,ListItemButton,Typography,Stack,ListItemAvatar,} from '@mui/material';

const ContactListItem = ({
  imovel,
  selected
}) => {

  const type = (type) => {
    switch (type) {
      case "house":
        return "Casa";
      case "apartment":
        return "Apartamento";
      case "farm":
        return "Fazenda/Chácaras";
      case "land":
        return "Terreno";
      default:
        return "";
    }
  };

  return (
    <ListItemButton sx={{ mb: 1 }} selected={ selected}>
      <ListItemAvatar>
        <Avatar alt={''} src={(imovel.pictures && imovel.pictures.length > 0 ? imovel.pictures[0].url : '') } />
      </ListItemAvatar>
      <ListItemText>
        <Stack direction="row" gap="10px" alignItems="center">
          <Box mr="auto">
            <Typography variant="subtitle1" noWrap sx={{ maxWidth: '200px' }}>
              {type(imovel.propertyType)} em  {imovel.address.neighborhood} {imovel.address.city}, {imovel.address.state}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {imovel.address.street}, {imovel.address.number}
            </Typography>
          </Box>
        </Stack>
      </ListItemText>
    </ListItemButton>
  );
};


export default ContactListItem;
