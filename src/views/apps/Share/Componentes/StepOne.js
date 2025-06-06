/* eslint-disable react/prop-types */
import {Box,Typography,TextField,Button,Grid,Select,MenuItem,InputLabel,FormControl,CircularProgress,Card as MuiCard,Divider,} from "@mui/material";
import { toast } from "sonner";
import Helper from "./Helper";
import { getData } from "../../../../Services/Api";
import { useEffect, useState } from "react";

const StepOne = ({ formData, setFormData, setIsLoading, isLoading, setCorretores, corretores, setFilteredCorretores, setActiveStep }) => {

  const [stillLoading, setStillLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let requiredFields;
    if (formData.tipoAnuncio === "ambos") {
      requiredFields = ["tipoAnuncio", "valorVenda", "valorAluguel", "comissao"];
    } else if (formData.tipoAnuncio === "aluguel") {
      requiredFields = ["tipoAnuncio", "valorAluguel", "comissao"];
    } else {
      requiredFields = ["tipoAnuncio", "valorVenda", "comissao"];
    }

    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      toast.warning(`Os seguintes campos são obrigatórios: ${emptyFields.join(", ")}`);
      return;
    }

    if (formData.comissao > 10) {
      toast.warning(`Normalmente a comissão fica entre 1% e 5%`);
      return;
    }

    if(corretores.length === 0 && !stillLoading){
      loadRealtors(false);
    }else{
      setActiveStep(1); 
    }
  };

  useEffect(() => {
    loadRealtors(true);
  }, []);

  async function loadRealtors(onOpen) {
    if((corretores.length === 0 || onOpen) && !stillLoading){
      if(!onOpen){
        setIsLoading(true);
      }else{
        setStillLoading(true);
      }
      try {
        const response = await getData(`realtors-and-realstates?page=-1`);
        if (response.status === 200 || response.status === 201) {
          setCorretores(response.userInfo || []);
          setFilteredCorretores(response.userInfo || []);
        } else {
          toast.error(`Erro ao buscar os corretores: ${response.message}`);
        }
      } catch (error) {
        toast.error("Ocorreu um erro ao buscar os corretores");
      } finally {
        setIsLoading(false); // Desativa o loading
        if(!onOpen){
          setActiveStep(1); // Avança para o próximo passo
        }else{
          setStillLoading(false);
        }
      }
    }else{
      setActiveStep(1);
    }

  }

  return (
    <>
      <Grid container spacing={4} mt={3}>
        {/* Formulário */}
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Defina os Termos do Compartilhamento
          </Typography>
          <Divider sx={{ marginBottom: 3 }} />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="tipoAnuncio-label">Tipo de Anúncio</InputLabel>
                  <Select
                    labelId="tipoAnuncio-label"
                    id="tipoAnuncio"
                    value={formData.tipoAnuncio}
                    name="tipoAnuncio"
                    label="Tipo de Anúncio"
                    disabled
                  >
                    <MenuItem value="venda">Venda</MenuItem>
                    <MenuItem value="aluguel">Aluguel</MenuItem>
                    <MenuItem value="ambos">Ambos</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Helper formData={formData} setFormData={setFormData} />
              {(formData.tipoAnuncio === "venda" || formData.tipoAnuncio === "ambos") && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Valor de Venda (R$)"
                    type="number"
                    name="valorVenda"
                    value={formData.valorVenda}
                    placeholder="Ex: 1000"
                    disabled={formData.tipoAnuncio === "aluguel"}
                  />
                </Grid>
              )}
              {(formData.tipoAnuncio === "aluguel" || formData.tipoAnuncio === "ambos") && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Valor de Aluguel (R$)"
                    type="number"
                    name="valorAluguel"
                    value={formData.valorAluguel}
                    placeholder="Ex: 1000"
                    disabled={formData.tipoAnuncio === "venda"}
                  />
                </Grid>
              )}
            </Grid>
              <Box display={"flex"} justifyContent="flex-end" mt={3}>
                <Box>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  p = {2}
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : "Ir para o próximo passo"}
                </Button></Box>
              </Box>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default StepOne;
