import { useEffect, useState } from "react";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Avatar, IconButton, Chip, CircularProgress, Box 
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import ApagarAnuncios from "./ApagarAnuncios";
import loadData from "./LoadData";

// Função para formatar a data no formato "DD/MM"
const formatDate = (isoString) => {
  if (!isoString) return "N/A";
  const date = new Date(isoString);
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
};

const DataTable = ({ type }) => {
  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await loadData(setLoading);
      setDataList(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (type) {
      setFilteredData(dataList.filter(item => item.type === type));
    } else {
      setFilteredData(dataList);
    }
  }, [type, dataList]);

  const handleDelete = (id) => {
    setOpenDeleteDialog(true);
    setSelectedAd(dataList.find((item) => item.id === id));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="500px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <TableContainer component={Paper} sx={{ maxHeight: 600, overflow: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Anúncio</TableCell>
              <TableCell>Data de criação</TableCell>
              <TableCell>Data de expiração</TableCell>
              <TableCell>Cliques</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Avatar alt="Imagem" src={item.photoUrl} sx={{ width: 70, height: 70 }} />
                </TableCell>
                <TableCell>
                  <Chip label={formatDate(item.createdAt) } color="primary" />
                </TableCell>
                <TableCell>
                  <Chip label={item.validUntil === item.createdAt ? 'Aguardando pagamento' : formatDate(item.validUntil)} color="error" />
                </TableCell>
                <TableCell> {item.totalViews} </TableCell>
                <TableCell> {item.announcerEmail} </TableCell>
                <TableCell> {item.verified === "pending" ? "Aguardando aprovação" : item.verified === "rejected" ? "Rejeitado" : (item.verified === "verified" && item.active) ? "Aprovado" : "Aguardando pagamento"} </TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ApagarAnuncios open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} anuncio={selectedAd} anuncios={dataList} setAnuncios={setDataList} />
      </TableContainer>
    </Box>
  );
};

export default DataTable;
