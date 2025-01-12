/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
import  { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, TablePagination, TableSortLabel, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import DeleteDialog from './ImoveisDeleteDialog';  // Importando o novo componente
import { toast } from 'sonner';
import { deleteData, getData } from 'src/Services/Api';
import ImageViewer from './ImoveisImageView';
import Spinner from 'src/views/spinner/Spinner';
import Loading from '../../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import DashBoardWaitingAvaliationProperties from './imoveisStatusDilalog';
import { Button } from '@mui/material';
import Step5_Modal from '../../../views/apps/imoveis/partials/confimarCadastroDialog';
const columns = [
  { id: 'galeria', label: 'Galeria', minWidth: 100 },
  { id: 'endereco', label: 'Endereço', minWidth: 170 },
  { id: 'tipo', label: 'Tipo', minWidth: 100 },
  { id: 'finalidade', label: 'Finalidade', minWidth: 100 },
  { id: 'preco_aluguel',label: 'Aluguel',minWidth: 100,align: 'right', format: (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),},
  { id: 'preco_venda',label: 'Venda',minWidth: 100,align: 'right', format: (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),},
  { id: 'verified', label: 'Status', minWidth: 100 },

];

const ImoveisTableList = () => {
  const [imoveis, setImoveis] = useState([]);
  const [filteredImoveis, setFilteredImoveis] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('endereco');
  const [order, setOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingImovel, setEditingImovel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [imovelToDelete, setImovelToDelete] = useState(null);
  const [imovelToSee, setImovelToSee] = useState(null);
  const [openStep, setOpenStep] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token') || '';
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = cuString ? JSON.parse(cuString) : null;
  const [openAdviceDialog, setOpenAdviceDialog] = useState(false);

  useEffect(() => {
    GetUserProperties();
    setOpenAdviceDialog(true);
  }, []);

  const GetUserProperties = async () => {
    try {
      setLoading(true);
      const route = `properties/seller/${currentUserls.email}?limit=200`;
      const response = await getData(route);
      if (response.status === 200 || response.status === 201) {
        console.log(response.userInfo.properties);
        const data = response.userInfo.properties.map((property) => ({
          id: property.id,
          imagem: property.pictures[0]?.url || '',
          endereco: `${property.address.city} - ${property.address.state}`,
          tipo: property.propertyType === 'house' ? 'Casa' : property.propertyType === 'apartment' ? 'Apartamento' :  property.propertyType === 'land' ? 'Terreno' : 'Fazenda/Chácara',
          preco: property.prices.rentPrice || property.prices.sellPrice,
          finalidade: property.announcementType === 'both' ? 'Ambas' : property.announcementType === 'rent' ? 'Aluguel' : 'Venda',
          preco_aluguel: property.prices.rentPrice || 0,
          preco_venda: property.prices.sellPrice || 0,
          verified : property.verified,
          fullImovel : property
        }));
        setImoveis(data);
        setFilteredImoveis(data);

      } 
      else {
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
        imovel.endereco.toLowerCase().includes(term) || imovel.tipo.toLowerCase().includes(term) || imovel.finalidade.toLowerCase().includes(term),
    );
    setFilteredImoveis(filtered);
    setPage(0);
  };
  
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    const sorted = [...filteredImoveis].sort((a, b) => {
      if (a[property] < b[property]) return isAsc ? -1 : 1;
      if (a[property] > b[property]) return isAsc ? 1 : -1;
      return 0;
    });
    setFilteredImoveis(sorted);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (imovel) => {
    setEditingImovel(imovel);
    navigate('/apps/imoveis/edit', { state: { mode: 'edit', imovel: imovel.fullImovel } });
  };

  const handleDeleteClick = (id) => {
    setImovelToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleSeeClick = (imovel) => {
    setImovelToSee(imovel);
    setOpenStep(true);
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
  };

  const handleSaveEdit = (updatedImovel) => {
    if (imoveis.some(imovel => imovel.id === updatedImovel.id)) {
      const updatedImoveis = imoveis.map((imovel) =>
        imovel.id === updatedImovel.id ? updatedImovel : imovel
      );
      setImoveis(updatedImoveis);
      setFilteredImoveis(updatedImoveis);
    } else {
      const newImoveis = [...imoveis, updatedImovel];
      setImoveis(newImoveis);
      setFilteredImoveis(newImoveis);
    }
    setEditingImovel(null);
  };

  const handleCancelEdit = () => {
    setEditingImovel(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Paper>
      {isLoading && <Loading data={{ open: isLoading }} />}

      {editingImovel ? (
        <ImoveisEditForm
          imovel={editingImovel}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      ) : (
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
            <TextField
              label="Buscar imóveis"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              style={{ flexGrow: 1, marginRight: '1rem' }}
            />
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.id !== 'galeria' ? (
                        <TableSortLabel
                          active={orderBy === column.id}
                          direction={orderBy === column.id ? order : 'asc'}
                          onClick={() => handleSort(column.id)}
                        >
                          {column.label}
                        </TableSortLabel>
                      ) : (
                        column.label
                      )}
                    </TableCell>
                  ))}
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={12} align="center" sx={{ height: 20 }}>
                      <Spinner height="30vh" />
                    </TableCell>
                  </TableRow>
                ) : filteredImoveis.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={12} align="center" sx={{ height: 250 }}>
                      Nenhum imóvel encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  (rowsPerPage > 0
                    ? filteredImoveis.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : filteredImoveis
                  ).map((imovel) => (
                    <TableRow hover key={imovel.id}>
                      <TableCell>
                        <ImageViewer src={imovel.imagem} alt="Imóvel" />
                      </TableCell>
                      <TableCell>{imovel.endereco}</TableCell>
                      <TableCell>{imovel.tipo}</TableCell>
                      <TableCell>{imovel.finalidade}</TableCell>
                      <TableCell align="right">{columns[4].format(imovel.preco_aluguel)}</TableCell>
                      <TableCell align="right">{columns[5].format(imovel.preco_venda)}</TableCell>
                      <TableCell>
                        <Button color='primary' sx={{color : `${imovel.verified === 'pending' ? 'black' : imovel.verified === 'verified' ? 'green' : 'red'}`, textTransform : 'capitalize', fontWeight : 'active', fontSize : '11px'}} onClick={() => handleSeeClick(imovel)}>{imovel.verified === 'pending' ? 'Análise' : imovel.verified === 'verified' ? 'Aprovado' : 'Rejeitado'}</Button>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEdit(imovel)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteClick(imovel.id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredImoveis.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}
      {deleteConfirmOpen && (
        <DeleteDialog
          open={deleteConfirmOpen}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
      {openStep &&(<DashBoardWaitingAvaliationProperties open={openStep} handleClose={()=> setOpenStep(false)} property={imovelToSee}/>)}
      {/* {openAdviceDialog &&(<Step5_Modal open={openAdviceDialog} handleClose={()=> setOpenAdviceDialog(false)} />)} */}

    </Paper>

    
  );
};

export default ImoveisTableList;
