/* eslint-disable react/prop-types */
import { Box, Typography, TextField, Button, Grid, Select, MenuItem, InputLabel, FormControl, CircularProgress } from "@mui/material";
import { Card, Divider } from "antd";
import { toast } from "sonner";
import Helper from "./Helper";
import { getData } from "../../../../Services/Api";

const StepOne = ({ formData, setFormData, setIsLoading,isLoading, setCorretores, setFilteredCorretores, setActiveStep }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Dados enviados:", formData);

    let requiredFields;
    if (formData.tipoAnuncio === "ambos") {
      requiredFields = ["tipoAnuncio", "valorVenda", "valorAluguel", "comissao", "caucao", "parcelas"];
    } else if (formData.tipoAnuncio === "aluguel") {
      requiredFields = ["tipoAnuncio", "valorAluguel", "comissao", "caucao", "parcelas"];
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

    setIsLoading(true);

    try {
      const response = await getData(`realtor`);
      if (response.status === 200 || response.status === 201) {
        setCorretores(response.userInfo.users || []);
        setFilteredCorretores(response.userInfo.users || []);
        console.log(response.userInfo.users);
      } else {
        toast.error(`Erro ao buscar os corretores: ${response.message}`);
        console.error(`Erro ao buscar os corretores: ${response.message}`);
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao buscar os corretores');
      console.error(error);
    } finally {
        setIsLoading(false); // Desativa o loading
        setActiveStep(1); // Avança para o próximo passo
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Card>
      <Grid item xs={6}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: 4, marginTop: 1 }}>
            <Typography variant="h3" gutterBottom mb={2}>
              Defina os Termos do Compartilhamento
            </Typography>
            <Divider />
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
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Valor de Aluguel (R$)"
                      type="number"
                      name="valorAluguel"
                      value={formData.valorAluguel}
                      placeholder="Ex: 1000"
                      disabled={formData.tipoAnuncio === "aluguel"}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="caucao-label">Meses de Caução</InputLabel>
                      <Select
                        labelId="caucao-label"
                        id="caucao"
                        value={formData.caucao}
                        onChange={handleChange}
                        name="caucao"
                        label="Meses de Caução"
                      >
                        <MenuItem value="1">1 mês. Total R${formData.valorAluguel}</MenuItem>
                        <MenuItem value="2">2 meses. Total R${formData.valorAluguel * 2}</MenuItem>
                        <MenuItem value="3">3 meses. Total R${formData.valorAluguel * 3}</MenuItem>
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
                        <MenuItem value="1">1 vez de R${formData.valorAluguel * 3}</MenuItem>
                        <MenuItem value="2">2 vezes de R${formData.valorAluguel * 1.5}</MenuItem>
                        <MenuItem value="3">3 vezes de R${formData.valorAluguel}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                sx={{ padding: 1.5 }}
                disabled={isLoading} // Desativa o botão enquanto o loading está ativo
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : "Ir para o próximo passo"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Card>
  );
};

export default StepOne;
