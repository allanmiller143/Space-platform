/* eslint-disable react/prop-types */
import { CheckCircle } from "@mui/icons-material";
import { Box, Typography, TextField, Button, Grid, Card, CardContent, CircularProgress, Avatar } from "@mui/material";
import { useState } from "react";
import PageContainer from 'src/components/container/PageContainer';

const StepTwo = ({ isLoading, corretores, setSearchQuery, setFilteredCorretores, searchQuery, filteredCorretores, setActiveStep, formData, setFormData }) => {
  const [selectedCorretor, setSelectedCorretor] = useState(formData.selectedUser); // Novo estado para o corretor selecionado

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

  const handleSelectCorretor = (corretor) => {
    setSelectedCorretor(corretor); // Marca o corretor como selecionado
    console.log("Corretor selecionado:", corretor);
    setFormData({ ...formData, selectedUser: corretor });
  };

  const handleContinue = () => {
    if (selectedCorretor) {
      setActiveStep(2); // Vai para o próximo passo apenas se um corretor estiver selecionado
      console.log("form:", formData);
    }
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
            </Box>
          </Box>

          <Grid container spacing={3}>
            {filteredCorretores.map((corretor) => (
              <Grid item xs={12} sm={6} md={4} key={corretor.id}>
                <Card
                  sx={{
                    borderRadius: 1,
                    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff", // Destacar o corretor selecionado
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                  onClick={() => handleSelectCorretor(corretor)} // Seleciona o corretor ao clicar no card
                >


                      
                  
                  <Box sx={{ display: "flex", alignItems: "center", padding: 1, gap: 2 }}>
                    <Avatar
                      alt={corretor.name}
                      src={corretor.profile?.url || ""}
                      sx={{
                        width: 64,
                        height: 64,
                        border: "2px solid #f0f0f0",
                        backgroundColor: "#f5f5f5",
                      }}
                    />
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "600",
                          color: "#333",
                        }}
                      >
                        {corretor.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {corretor.address.city}, {corretor.address.state}
                      </Typography>
                    </Box>
                    {selectedCorretor && selectedCorretor.email === corretor.email && // Exibe o nome do corretor selecionado
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        padding: 2,
                      }}
                    >
                      <CheckCircle fontSize="small" sx={{ marginRight: 1, color: "green" }} />
                    </Typography>}
                  </Box>

                  {/* Botão de ação */}
                  <CardContent sx={{ padding: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                        borderRadius: 1,
                        padding: "5px 0",
                        boxShadow: "none",
                        "&:hover": {
                          backgroundColor: "#004aad",
                        },
                      }}
                    >
                      Selecionar
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Botões de navegação */}
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <Box>
              <Button fullWidth variant="outlined" onClick={() => setActiveStep(0)}>
                Voltar
              </Button>
            </Box>
            <Box>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleContinue}
                disabled={!selectedCorretor} // Desabilita o botão se nenhum corretor estiver selecionado
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : "Ir para o próximo passo"}
              </Button>
            </Box>
          </Box>
        </>
      )}
    </PageContainer>
  );
};

export default StepTwo;
