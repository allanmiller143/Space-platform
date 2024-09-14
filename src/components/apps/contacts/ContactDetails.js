import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  Divider,
  IconButton,
  Stack,
  Grid,
  Tooltip,
} from '@mui/material';
import {
  isEdit,
  UpdateContact,
  DeleteContact,
  toggleStarredContact,
} from 'src/store/apps/contacts/ContactSlice';
import BlankCard from '../../shared/BlankCard';
import { IconPencil, IconStar, IconTrash, IconDeviceFloppy } from '@tabler/icons';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import emailIcon from 'src/assets/images/breadcrumb/emailSv.png';

const ContactDetails = () => {
  const contactDetail = useSelector(
    (state) => state.contactsReducer.contacts[state.contactsReducer.contactContent - 1],
  );
  const editContact = useSelector((state) => state.contactsReducer.editContact);
  const dispatch = useDispatch();

  const tableData = [
    {
      id: 1,
      title: 'Nome',
      alias: 'firstname',
      gdata: contactDetail ? contactDetail.firstname : '',
      type: 'text',
    },
    {
      id: 2,
      title: 'Sobrenome',
      alias: 'lastname',
      gdata: contactDetail ? contactDetail.lastname : '',
      type: 'text',
    },
    {
      id: 3,
      title: 'Imobiliária',
      alias: 'company',
      gdata: contactDetail ? contactDetail.company : '',
      type: 'text',
    },
    {
      id: 4,
      title: 'Especialidade',
      alias: 'department',
      gdata: contactDetail ? contactDetail.department : '',
      type: 'text',
    },
    {
      id: 5,
      title: 'E-mail',
      alias: 'email',
      gdata: contactDetail ? contactDetail.email : '',
      type: 'email',
    },
    {
      id: 6,
      title: 'Telefone',
      alias: 'phone',
      gdata: contactDetail ? contactDetail.phone : '',
      type: 'phone',
    },
    {
      id: 7,
      title: 'Endereço',
      alias: 'address',
      gdata: contactDetail ? contactDetail.address : '',
      type: 'text',
    },
    {
      id: 8,
      title: 'Observações',
      alias: 'notes',
      gdata: contactDetail ? contactDetail.notes : '',
      type: 'text',
    },
  ];

  return (
    <>
      {/* ------------------------------------------- */}
      {/* Parte de Detalhes do Contato */}
      {/* ------------------------------------------- */}
      {contactDetail && !contactDetail.deleted ? (
        <>
          {/* ------------------------------------------- */}
          {/* Parte do Cabeçalho */}
          {/* ------------------------------------------- */}
          <Box p={3} py={2} display={'flex'} alignItems="center">
            <Typography variant="h5">Detalhes do Corretor</Typography>
            <Stack gap={0} direction="row" ml={'auto'}>
              <Tooltip title={contactDetail.starred ? 'Remover destaque' : 'Destacar'}>
                <IconButton onClick={() => dispatch(toggleStarredContact(contactDetail.id))}>
                  <IconStar
                    stroke={1.3}
                    size="18"
                    style={{
                      fill: contactDetail.starred ? '#FFC107' : '',
                      stroke: contactDetail.starred ? '#FFC107' : '',
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title={editContact ? 'Salvar' : 'Editar'}>
                <IconButton onClick={() => dispatch(isEdit())}>
                  {!editContact ? (
                    <IconPencil size="18" stroke={1.3} />
                  ) : (
                    <IconDeviceFloppy size="18" stroke={1.3} />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Excluir">
                <IconButton>
                  <IconTrash size="18" stroke={1.3} />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
          <Divider />
          {/* ------------------------------------------- */}
          {/* Parte da Tabela de Contato */}
          {/* ------------------------------------------- */}
          <Box sx={{ overflow: 'auto' }}>
            {!editContact ? (
              <Box>
                <Box p={3}>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      alt={contactDetail.image}
                      src={contactDetail.image}
                      sx={{ width: '72px', height: '72px' }}
                    />
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h6" mb={0.5}>
                        {contactDetail.firstname} {contactDetail.lastname}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={0.5}>
                        {contactDetail.department}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {contactDetail.company}
                      </Typography>
                    </Box>
                  </Box>
                  <Grid container>
                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Número de Telefone
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {contactDetail.phone}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Endereço de E-mail
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {contactDetail.email}
                      </Typography>
                    </Grid>
                    <Grid item lg={12} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Endereço
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {contactDetail.address}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Especialidade
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5} fontWeight={600}>
                        {contactDetail.department}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} xs={12} mt={4}>
                      <Typography variant="body2" color="text.secondary">
                        Imobiliária
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                        {contactDetail.company}
                      </Typography>
                    </Grid>
                    <Grid item lg={12} xs={12} mt={4}>
                      <Typography variant="body2" mb={1} color="text.secondary">
                        Observações
                      </Typography>
                      <Typography variant="subtitle1" mb={0.5}>
                        {contactDetail.notes}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
                <Box p={3} gap={1} display="flex">
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={() => dispatch(isEdit())}
                  >
                    Editar
                  </Button>
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    onClick={() => dispatch(DeleteContact(contactDetail.id))}
                  >
                    Excluir
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <BlankCard sx={{ p: 0 }}>
                  <Scrollbar sx={{ height: { lg: 'calc(100vh - 360px)', md: '100vh' } }}>
                    <Box pt={1}>
                      {tableData.map((data) => (
                        <Box key={data.id} px={3} py={1.5}>
                          <Typography variant="subtitle1" fontWeight={600} mb={0.5}>
                            {data.title}
                          </Typography>
                          <TextField
                            id="firstname"
                            size="small"
                            fullWidth
                            type="text"
                            value={data.gdata}
                            onChange={(e) =>
                              dispatch(UpdateContact(contactDetail.id, data.alias, e.target.value))
                            }
                          />
                        </Box>
                      ))}
                      <Box p={3}>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => dispatch(isEdit())}
                        >
                          Salvar Contato
                        </Button>
                      </Box>
                    </Box>
                  </Scrollbar>
                </BlankCard>
              </>
            )}
          </Box>
        </>
      ) : (
        <Box p={3} height="50vh" display={'flex'} justifyContent="center" alignItems={'center'}>
          {/* ------------------------------------------- */}
          {/* Se não houver Contato  */}
          {/* ------------------------------------------- */}
          <Box>
            <Typography variant="h4">Por favor, selecione um corretor</Typography>
            <br />
            <img src={emailIcon} alt={emailIcon} width={'250px'} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default ContactDetails;
