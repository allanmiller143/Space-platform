/* eslint-disable react/prop-types */
import {Box,Typography,TextField,Button,Grid,Select,MenuItem,InputLabel,FormControl,CircularProgress,Card as MuiCard,Divider,} from "@mui/material";
import { toast } from "sonner";
import Helper from "./Helper";
import { getData } from "../../../../Services/Api";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const StepOne = ({ formData, setFormData, setIsLoading, isLoading, setCorretores, corretores, setFilteredCorretores, setActiveStep }) => {
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


    if(corretores.length === 0){
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
        toast.error("Ocorreu um erro ao buscar os corretores");
        console.error(error);
      } finally {
        setIsLoading(false); // Desativa o loading
        setActiveStep(1); // Avança para o próximo passo

      }
  }else{
    setActiveStep(1); // Avança para o próximo passo
  }

    console.log(formData);
  };


  const vantagens = [
    {
      icon: <CheckCircleIcon color="success" fontSize="large" />,
      text: "Expertise no mercado imobiliário para negociar o melhor valor.",
    },
    {
      icon: <CheckCircleIcon color="success" fontSize="large" />,
      text: "Acesso a uma ampla rede de potenciais compradores.",
    },
    {
      icon: <CheckCircleIcon color="success" fontSize="large" />,
      text: "Gestão completa de documentação e contratos.",
    },
    {
      icon: <CheckCircleIcon color="success" fontSize="large" />,
      text: "Economia de tempo e esforço com a divulgação do imóvel.",
    },
  ]; 

  return (
    <MuiCard elevation={3} sx={{ padding: 4, borderRadius: 4 }}>
      <Grid container spacing={4}>
        {/* Seção de Vantagens */}
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 5 }}>
            Vantagens de confiar em nossos corretores
          </Typography>
          <Grid container spacing={2}>
            {vantagens.map((advantage, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <MuiCard elevation={1} sx={{ display: "flex", alignItems: "center", padding: 2, borderRadius: 1, marginBottom: 2 }}>
                  {advantage.icon}
                  <Typography variant="body1" sx={{ marginLeft: 2 }}>
                    {advantage.text}
                  </Typography>
                </MuiCard>
              </Grid>
            ))}
          </Grid>
        </Grid>

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
    </MuiCard>
  );
};

export default StepOne;
