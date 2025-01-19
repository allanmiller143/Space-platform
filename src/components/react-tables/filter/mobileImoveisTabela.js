import { useState, useEffect } from 'react';
import { Box, Card, CardContent, CardActions, Typography, Grid, TextField, IconButton, Button, CircularProgress, ListItem, ListItemAvatar, ListItemText, Avatar, Popover, MenuItem, Paper } from '@mui/material';
import DeleteDialog from './ImoveisDeleteDialog'; 
import { toast } from 'sonner';
import { deleteData, getData } from 'src/Services/Api';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import DashBoardWaitingAvaliationProperties from './imoveisStatusDilalog';

const MobileImoveisCards = () => {
  const [imoveis, setImoveis] = useState([]);
  const [filteredImoveis, setFilteredImoveis] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [imovelToDelete, setImovelToDelete] = useState(null);
  const [openStep, setOpenStep] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);  // Para controlar o PopOver
  const [selectedImovel, setSelectedImovel] = useState(null);  // Para controlar o imóvel selecionado
  const navigate = useNavigate();

  const token = localStorage.getItem('token') || '';
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = cuString ? JSON.parse(cuString) : null;

  useEffect(() => {
    GetUserProperties();
  }, []);

  const GetUserProperties = async () => {
    try {
      setLoading(true);
      const route = `properties/seller/${currentUserls.email}?limit=200`;
      const response = await getData(route);
      if (response.status === 200 || response.status === 201) {
        const data = response.userInfo.properties.map((property) => ({
          id: property.id,
          imagem: property.pictures[0]?.url || '',
          endereco: `${property.address.street}, ${property.address.number} - ${property.address.neighborhood} - ${property.address.city}, ${property.address.state}`,
          tipo: property.propertyType === 'house' ? 'Casa' : property.propertyType === 'apartment' ? 'Apartamento' : property.propertyType === 'land' ? 'Terreno' : 'Fazenda/Chácara',
          preco: property.prices.rentPrice || property.prices.sellPrice,
          finalidade: property.announcementType === 'both' ? 'Ambas' : property.announcementType === 'rent' ? 'Aluguel' : 'Venda',
          preco_aluguel: property.prices.rentPrice || 0,
          preco_venda: property.prices.sellPrice || 0,
          verified: property.verified,
          fullImovel: property,
        }));
        setImoveis(data);
        setFilteredImoveis(data);
      } else {
        navigate('/error');
      }
    } catch (error) {
      navigate('/error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = imoveis.filter(
      (imovel) =>
        imovel.endereco.toLowerCase().includes(term) || imovel.tipo.toLowerCase().includes(term) || imovel.finalidade.toLowerCase().includes(term)
    );
    setFilteredImoveis(filtered);
  };

  const handleDeleteClick = (id) => {
    setImovelToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (imovelToDelete !== null) {
      setIsLoading(true);
      try {
        const response = await deleteData(`properties/${imovelToDelete}`, token);
        if (response.status === 200 || response.status === 201) {
          toast.success('Imóvel excluído com sucesso');
          const updatedImoveis = imoveis.filter((imovel) => imovel.id !== imovelToDelete);
          setImoveis(updatedImoveis);
          setFilteredImoveis(updatedImoveis);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    setDeleteConfirmOpen(false);
    setImovelToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setImovelToDelete(null);
    handlePopoverClose(); 
  };

  const handleSeeClick = (imovel) => {
    setSelectedImovel(imovel);
    setOpenStep(true);
  };

  const handleEdit = (imovel) => {
    navigate('/apps/imoveis/edit', { state: { mode: 'edit', imovel: imovel.fullImovel } });
  };

  const handlePopoverOpen = (event, imovel) => {
    setAnchorEl(event.currentTarget);
    setSelectedImovel(imovel);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedImovel(null);
  };


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
      <Box p={1}>
        {isLoading && <Loading data={{ open: isLoading }} />}

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <TextField
            label="Buscar imóveis"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
              },
              '& .MuiInputLabel-root': {
                fontWeight: 'bold',
              },
            }}
          />
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="30vh">
            <CircularProgress />
          </Box>
        ) : filteredImoveis.length === 0 ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="250px">
            <Typography variant="h6">Nenhum imóvel encontrado.</Typography>
          </Box>
        ) : (
          <Grid container spacing={1} mt = {1} sx ={{ overflowY: 'auto', maxHeight: 'calc(100vh - 300px)' }}>
            {filteredImoveis.map((imovel) => (
              <Grid item xs={12} sm={6} md={4} key={imovel.id}>
                <Box>
                    <ListItem sx={{ padding: 0, marginBottom: 1, cursor: "pointer" }} onClick={(e) => handlePopoverOpen(e, imovel)}>
                      <ListItemAvatar>
                        <Avatar
                          src={imovel.imagem}
                          alt={imovel.nome}
                          sx={{ width: 55, height: 55, borderRadius: 1, mr:1  }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                          primary={
                              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                  <Typography>{`${imovel.tipo}, ${imovel.finalidade}`}</Typography>
                                  <Box
                                      sx={{
                                          width: 10,
                                          height: 10,
                                          borderRadius: '50%',
                                          backgroundColor:
                                              imovel.verified === 'pending'
                                                  ? 'yellow'
                                                  : imovel.verified === 'verified'
                                                  ? 'green'
                                                  : 'red',
                                          display: 'inline-block',
                                          marginRight: 1, // Adiciona um pequeno espaço à direita
                                      }}
                                  />
                                  </Box>
                          }
                          secondary={imovel.endereco}
                          primaryTypographyProps={{ fontWeight: "bold" }}
                          secondaryTypographyProps={{
                              sx: {
                                  display: '-webkit-box',
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  WebkitLineClamp: 2,
                                  fontSize: '11px',
                              },
                          }}
                      />
                    </ListItem>
                </Box>

                <Popover
                  id={id}
                  open={open && selectedImovel?.id === imovel.id}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={() => handleEdit(selectedImovel)}>Editar</MenuItem>
                  <MenuItem onClick={() => handleSeeClick(selectedImovel)}>Ver Situação</MenuItem>
                  <MenuItem onClick={() => handleDeleteClick(selectedImovel.id)}>Apagar</MenuItem>
                </Popover>
              </Grid>
            ))}
          </Grid>
        )}

        <DeleteDialog
          open={deleteConfirmOpen}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}

        />
          {openStep &&(<DashBoardWaitingAvaliationProperties open={openStep} handleClose={()=> {setOpenStep(false); handlePopoverClose();}} property={selectedImovel}/>)}

      </Box>
  );
};

export default MobileImoveisCards;
