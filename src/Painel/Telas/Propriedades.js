import { Box } from "@mui/system";
import DashBoardPropertiesGraphic from "../Componentes/Metricas/DashBoardPropertiesGraphic";
import ImoveisList from "../Componentes/NovosImoveis/NovosImoveis";


const Propriedades = () => {

  return (
    <Box maxWidth="lg" margin="0 auto" >
        <DashBoardPropertiesGraphic />
        <ImoveisList/>
    </Box>
  );
};

export default Propriedades;
