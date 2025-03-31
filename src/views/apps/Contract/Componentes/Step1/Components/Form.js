import React, { useContext, useState } from "react";
import {Typography,TextField,Button,Card,CardContent,Divider,Grid,Box,CircularProgress,FormControl,InputLabel,Select,MenuItem,Snackbar,Alert,} from "@mui/material";
import { MonetizationOn } from "@mui/icons-material";
import ContractContext from "../../../ContractContext/ContractContext";
import { sendOffer } from "../../../Utils/StepsFunctions";

const Form = () => {
  const { property,loading,setCurrentStep,setHistory } = useContext(ContractContext);
  const [proposalType, setProposalType] = useState("");
  const [paymentDay, setPaymentDay] = useState(""); // Dia do mês para pagamento do aluguel
  const [contractDuration, setContractDuration] = useState(""); // Duração do contrato (meses ou anos)
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Verifica se já existe uma proposta
                         

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid item xs={12} md={7}>
        <CardContent>
          <Typography variant="h6">Faça sua proposta</Typography>
          <Typography variant="body2" mt={1} mb={2}>
            Preencha os campos abaixo para enviar uma proposta para o dono do imóvel.
          </Typography>
          <Divider />

          {/* Tipo de Proposta */}
          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel id="proposal-type-label">Tipo de Proposta</InputLabel>
            <Select
              labelId="proposal-type-label"
              id="proposal-type"
              value={proposalType}
              label="Tipo de Proposta"
              onChange={(e) => setProposalType(e.target.value)}
            >
              {(property.announcementType === "rent" || property.announcementType === "both") && (
                <MenuItem value="rent">Alugar</MenuItem>
              )}
              {(property.announcementType === "sell" || property.announcementType === "both") && (
                <MenuItem value="buy">Comprar</MenuItem>
              )}
            </Select>
          </FormControl>

          {/* Campos adicionais para aluguel */}
          {proposalType === "rent" && (
            <>
              {/* Dia do pagamento (1 a 31) */}
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="payment-day-label">Dia do pagamento</InputLabel>
                <Select
                  labelId="payment-day-label"
                  id="payment-day"
                  value={paymentDay}
                  label="Dia do pagamento"
                  onChange={(e) => setPaymentDay(e.target.value)}
                >
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Duração do contrato */}
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="contract-duration-label">Duração do contrato</InputLabel>
                <Select
                  labelId="contract-duration-label"
                  id="contract-duration"
                  value={contractDuration}
                  label="Duração do contrato"
                  onChange={(e) => setContractDuration(e.target.value)}
                >
                  <MenuItem value="6 meses">6 meses</MenuItem>
                  <MenuItem value="1 ano">1 ano</MenuItem>
                  <MenuItem value="2 anos">2 anos</MenuItem>
                  <MenuItem value="3 anos">3 anos</MenuItem>
                </Select>
              </FormControl>
            </>
          )}

          {/* Mensagem Opcional */}
          <TextField
            fullWidth
            label="Mensagem (opcional)"
            variant="outlined"
            multiline
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ mt: 2 }}
          />

          {/* Botão Enviar Proposta */}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
            onClick={()=>{sendOffer( proposalType, setError,setHistory, paymentDay, contractDuration,property,setCurrentStep)}}
            startIcon={<MonetizationOn />}
          >
            Seguir para o próximo passo
          </Button>

          {/* Snackbar para erros */}
          <Snackbar
            open={!!error}
            autoHideDuration={3000}
            onClose={() => setError(null)}
            anchorOrigin={{ vertical: "top", horizontal: "end" }}
          >
            <Alert onClose={() => setError(null)} severity="error" sx={{ width: "100%" }}>
              {error}
            </Alert>
          </Snackbar>
        </CardContent>
    </Grid>
  );
};

export default Form;