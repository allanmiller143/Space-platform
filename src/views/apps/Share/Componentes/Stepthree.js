/* eslint-disable react/prop-types */
import { CheckCircle } from "@mui/icons-material";
import { Box, Typography, TextField, Button, Grid, Card, CardContent, CircularProgress, Avatar, Divider } from "@mui/material";
import { useState } from "react";
import PageContainer from 'src/components/container/PageContainer';
import PropertyCard from "./PropertyCard";

const Stepthree = ({ isLoading, corretores, setSearchQuery, setFilteredCorretores, formData, filteredCorretores, setActiveStep, property }) => {
  const [selectedCorretor, setSelectedCorretor] = useState(null);

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

  const handleContinue = () => {
    if (selectedCorretor) {
      setActiveStep(2);
    }
  };

  return (
    <PageContainer title="Imóveis para venda ou locação" description="Space iMóveis">
      <>
        <Box>
          <PropertyCard property={property} />
        </Box>

        {/* Seção com informações do imóvel, anunciante e comissão */}
        <Box sx={{ marginTop: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Detalhes do Imóvel</Typography>
              <Typography variant="body1">
                <strong>Endereço:</strong> {formData.property?.address.latitude || "Não informado"}
              </Typography>
              <Typography variant="body1">
                <strong>Preço:</strong> {formData.property?.price || "Não informado"}
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>Informações do Anunciante</Typography>
              <Typography variant="body1">
                <strong>Nome:</strong> {formData.seller?.name || "Não informado"}
              </Typography>
              <Typography variant="body1">
                <strong>Contato:</strong> {formData.seller?.contact || "Não informado"}
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>Comissão</Typography>
              <Typography variant="body1">
                <strong>Valor:</strong> {formData.commission?.value || "Não informado"}
              </Typography>
              <Typography variant="body1">
                <strong>Percentual:</strong> {formData.commission?.percentage || "Não informado"}%
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <Box>
            <Button fullWidth variant="outlined" onClick={() => setActiveStep(1)}>
              Voltar
            </Button>
          </Box>
          <Box>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleContinue}
              disabled={!selectedCorretor}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Ir para o próximo passo"}
            </Button>
          </Box>
        </Box>
      </>
    </PageContainer>
  );
};

export default Stepthree;
