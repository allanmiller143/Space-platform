import { useState } from "react";
import {Box,Typography,TextField,Button,Grid,Card,CardContent,CircularProgress,IconButton,Select,MenuItem,InputLabel,FormControl,} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HouseIcon from "@mui/icons-material/House";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Main from "./Componentes/Main";
import { Container } from "@mui/system";

const SharePropertyForm = () => {
  const [formData, setFormData] = useState({
    tipoAnuncio: "venda",
    valor: "",
    comissao: "",
    caucao: "1",
    parcelas: "1",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [corretores, setCorretores] = useState([]);
  const [filteredCorretores, setFilteredCorretores] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Função para enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados enviados:", formData);

    // Simulação de carregamento
    setIsLoading(true);
    setTimeout(() => {
      const mockCorretores = [
        { id: 1, nome: "Carlos Silva", cidade: "São Paulo", estado: "SP" },
        { id: 2, nome: "Ana Pereira", cidade: "Rio de Janeiro", estado: "RJ" },
        { id: 3, nome: "João Santos", cidade: "Belo Horizonte", estado: "MG" },
        { id: 4, nome: "Maria Oliveira", cidade: "Salvador", estado: "BA" },
        { id: 4, nome: "Allan Miller", cidade: "Surubim", estado: "PE" },
      ];
      setCorretores(mockCorretores);
      setFilteredCorretores(mockCorretores);
      setIsLoading(false);
    }, 2000);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = corretores.filter(
      (corretor) =>
        corretor.nome.toLowerCase().includes(query) ||
        corretor.cidade.toLowerCase().includes(query) ||
        corretor.estado.toLowerCase().includes(query)
    );
    setFilteredCorretores(filtered);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container

    >
      <Main/>
      {/* Introdução com Cards explicativos */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Compartilhar Anúncio
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "#fff",
                overflow: "hidden",
                textAlign: "center",
              }}
            >
              <CardContent>
                <HouseIcon sx={{ fontSize: 40, color: "#00796b" }} />
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                  Tipo de Anúncio
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Escolha entre vender ou alugar seu imóvel e compartilhe com
                  corretores especializados.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "#fff",
                overflow: "hidden",
                textAlign: "center",
              }}
            >
              <CardContent>
                <AttachMoneyIcon sx={{ fontSize: 40, color: "#f57c00" }} />
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                  Valor e Comissão
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Defina o valor de venda/aluguel e a comissão que você deseja
                  pagar ao corretor.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "#fff",
                overflow: "hidden",
                textAlign: "center",
              }}
            >
              <CardContent>
                <StorefrontIcon sx={{ fontSize: 40, color: "#d32f2f" }} />
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                  Caução e Parcelamento
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Para aluguel, defina a taxa de caução e se ela será parcelada.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <form onSubmit={handleSubmit}>
        {/* Definição dos Termos */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h6" gutterBottom>
            Defina os Termos do Compartilhamento
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="tipoAnuncio-label">Tipo de Anúncio</InputLabel>
                <Select
                  labelId="tipoAnuncio-label"
                  id="tipoAnuncio"
                  value={formData.tipoAnuncio}
                  onChange={handleChange}
                  name="tipoAnuncio"
                  label="Tipo de Anúncio"
                >
                  <MenuItem value="venda">Venda</MenuItem>
                  <MenuItem value="aluguel">Aluguel</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Valor (R$)"
                type="number"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
                placeholder="Ex: 1000"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Comissão (%)"
                type="number"
                name="comissao"
                value={formData.comissao}
                onChange={handleChange}
                placeholder="Ex: 5"
              />
            </Grid>

            {formData.tipoAnuncio === "aluguel" && (
              <>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="caucao-label">Taxa de Caução</InputLabel>
                    <Select
                      labelId="caucao-label"
                      id="caucao"
                      value={formData.caucao}
                      onChange={handleChange}
                      name="caucao"
                      label="Taxa de Caução"
                    >
                      <MenuItem value="1">1 mês</MenuItem>
                      <MenuItem value="2">2 meses</MenuItem>
                      <MenuItem value="3">3 meses</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="parcelas-label">Parcelas da Caução</InputLabel>
                    <Select
                      labelId="parcelas-label"
                      id="parcelas"
                      value={formData.parcelas}
                      onChange={handleChange}
                      name="parcelas"
                      label="Parcelas"
                    >
                      <MenuItem value="1">1 vez</MenuItem>
                      <MenuItem value="2">2 vezes</MenuItem>
                      <MenuItem value="3">3 vezes</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
          </Grid>
        </Box>

        {/* Botão para compartilhar o anúncio */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ padding: 1.5 }}
            >
              Compartilhar Anúncio
            </Button>
          </Grid>
        </Grid>
      </form>

      {/* Seção de Carregamento */}
      {isLoading && (
        <Box sx={{ textAlign: "center", marginTop: 4 }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ marginTop: 2 }}>
            Buscando corretores disponíveis...
          </Typography>
        </Box>
      )}

      {/* Seção de Corretores Disponíveis */}
      {!isLoading && corretores.length > 0 && (
        <>
          <Box sx={{ marginTop: 4, marginBottom: 2 }}>
            <Typography variant="h5" gutterBottom>
              Corretores Disponíveis
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                marginBottom: 2,
              }}
            >
              <TextField
                fullWidth
                placeholder="Filtrar por nome, cidade ou estado"
                value={searchQuery}
                onChange={handleSearch}
              />
              <IconButton color="primary">
                <SearchIcon />
              </IconButton>
            </Box>
          </Box>

          <Grid container spacing={3}>
            {filteredCorretores.map((corretor) => (
              <Grid item xs={12} sm={6} md={4} key={corretor.id}>
                <Card
                  sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: "#fff",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#f5f5f5",
                      padding: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <AccountCircleIcon
                      sx={{ fontSize: 40, color: "gray" }}
                    />
                    <Box>
                      <Typography variant="h6">{corretor.nome}</Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {corretor.cidade}, {corretor.estado}
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ width: "100%" }}
                    >
                      Selecionar
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default SharePropertyForm;
