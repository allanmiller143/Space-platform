/* eslint-disable react/prop-types */
import {Box,Typography,TextField,Button,Grid,Card,CardContent,CircularProgress,IconButton, Avatar} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PageContainer from 'src/components/container/PageContainer';

const Realtors = ({ isLoading, corretores, setSearchQuery, setFilteredCorretores, searchQuery, filteredCorretores }) => {

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = corretores.filter(
      (corretor) =>
        corretor.name.toLowerCase().includes(query) ||
        corretor.address.city.toLowerCase().includes(query) ||
        corretor.address.state.toLowerCase().includes(query)
    );
    setFilteredCorretores(filtered);
  };


  return (
    <PageContainer title="Imóveis para venda ou locação" description="Space iMóveis">


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
                    <Avatar
                      alt={corretor.name}
                      src={(corretor.profile !== null || corretor.profile !== undefined) && corretor.profile.url}
                      sx={{ fontSize: 40, color: "gray" }}
                      
                    />
                    <Box>
                      <Typography variant="h6">{corretor.name}</Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {corretor.address.city}, {corretor.address.state}
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
    </PageContainer>
  );
};

export default Realtors;
