import React, { useContext } from "react";
import {Typography,Button,Box,Snackbar,Alert,Grid, Divider, Paper,} from "@mui/material";
import {CheckCircle,Replay,Home,Description,Person,} from "@mui/icons-material";
import ContractContext from "../../../ContractContext/ContractContext";

const ContractDetails = () => {
  const { history, setHistory, setCurrentStep } = useContext(ContractContext);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const handleAcceptOffer = () => {
    setHistory((prev) => ({
      ...prev,
      negociation: { ...prev.negociation, buyer: "accepted" },
      status: "finalized",
    }));
    setSnackbarMessage("Proposta aceita com sucesso!");
    setSnackbarOpen(true);
  };

  const handleNewOffer = () => {
    setHistory((prev) => ({
      ...prev,
      negociation: { ...prev.negociation, buyer: "pending" },
      status: "pending",
    }));
    setActiveStep(1);
    setSnackbarMessage("Faça uma nova proposta.");
    setSnackbarOpen(true);
  };

  return (
    <Paper variant="outlined">
      <Typography variant="h6" fontWeight={600} gutterBottom sx = {{textAlign : "center", mt : 5}}>
        Revise as informações antes de partir para o próximo passo
      </Typography>
      <Box sx={{ mx: "auto", p: 5 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            <Home sx={{ verticalAlign: "middle", mr: 1 }} />
            Informações do Imóvel
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx = {{mb : 0.5}}>
                <strong>Endereço:</strong> {history.property.address.street}
              </Typography>
              <Typography variant="body1" sx = {{mb : 0.5}}>
                <strong>Número:</strong> {history.property.address.number}
              </Typography>
              <Typography variant="body1" sx = {{mb : 0.5}}>
                <strong>Bairro:</strong> {history.property.address.neighborhood}
              </Typography>
              <Typography variant="body1" sx = {{mb : 0.5}}>
                <strong>Cidade/Estado:</strong> {history.property.address.city}/{history.property.address.state}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx = {{mb : 0.5}}>
                <strong>CEP:</strong> {history.property.address.cep}
              </Typography>
              <Typography variant="body1" sx = {{mb : 0.5}}>
                <strong>Latitude:</strong> {history.property.address.latitude}
              </Typography>
              <Typography variant="body1" sx = {{mb : 0.5}}>
                <strong>Longitude:</strong> {history.property.address.longitude}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Seção 2: Detalhes da Proposta */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            <Description sx={{ verticalAlign: "middle", mr: 1 }} />
            Detalhes da Proposta
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                <strong>Tipo:</strong> {history.proposalType === "rent" ? "Aluguel" : "Compra"}
              </Typography>

              {history.proposalType === "rent" && (
                <>
                  <Typography variant="body1">
                    <strong>Valor:</strong> R$ {history.property.prices.rentPrice.toLocaleString("pt-BR")},00
                  </Typography>
                  <Typography variant="body1">
                    <strong>Dia do Pagamento:</strong> Todo dia {history.paymentDay}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Duração do Contrato:</strong> {history.contractDuration}
                  </Typography>
                </>
              )}
              {history.property.type === "buy" && (
                <>
                  <Typography variant="body1">
                    <strong>Valor:</strong> R$ {history.property.prices.sellPrice.toLocaleString("pt-BR")},00
                  </Typography>
                </>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                <strong>Caução:</strong> R$ {history.property.prices.deposit.toLocaleString("pt-BR")},00
              </Typography>
              <Typography variant="body1">
                <strong>Parcelamento:</strong> {history.property.prices.depositInstallments} vezes
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Seção 3: Informações do Cliente */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            <Person sx={{ verticalAlign: "middle", mr: 1 }} />
            Informações do Cliente
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx = {{mb : 0.5}}>
                <strong>Nome:</strong> {history.client.fullName}
              </Typography>
              <Typography variant="body1" sx = {{mb : 0.5}}>
                <strong>CPF:</strong> {history.client.cpf}
              </Typography>
              <Typography variant="body1" sx = {{mb : 0.5}}>
                <strong>RG:</strong> {history.client.rg}
              </Typography>
              <Typography variant="body1" sx = {{mb : 0.5}}>
                <strong>Estado Civil:</strong> {history.client.maritalStatus}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} >
              <Typography variant="body1" sx = {{mb : 0.5}}>
                <strong>Profissão:</strong> {history.client.profession}
              </Typography>
              <Typography variant="body1" sx = {{mb : 0.5}}>
                <strong>Telefone:</strong> {history.client.phone}
              </Typography>
              <Typography variant="body1" sx = {{mb : 0.5}} >
                <strong>Email:</strong> {history.client.email}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Seção 4: Status da Negociação */}
        <Box
          sx={{
            bgcolor: history.negociation.seller === "accepted" ? "success.light" : "error.light",
            p: 2,
            borderRadius: 2,
            textAlign: "center",
            my: 3,
          }}
        >
          <Typography
            variant="body1"
            fontWeight={600}
            color={history.negociation.seller === "accepted" ? "success.dark" : "error.dark"}
          >
            {history.negociation.seller === "accepted"
              ? "O proprietário aceitou a sua proposta!"
              : "O proprietário rejeitou a proposta."}
          </Typography>
        </Box>

        {/* Botões de Ação */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}>
          {history.negociation.seller === "accepted" ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAcceptOffer}
              startIcon={<CheckCircle />}
              sx={{ borderRadius: 2 }}
            >
              Aceitar Contrato
            </Button>
          ) : (
            <Button
              variant="contained"
              color="error"
              onClick={handleNewOffer}
              startIcon={<Replay />}
              sx={{ borderRadius: 2 }}
            >
              Fazer Nova Proposta
            </Button>
          )}
        </Box>

        {/* Snackbar para Feedback */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity="info" sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Paper>
  );
};

export default ContractDetails;