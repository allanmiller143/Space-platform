import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import Main from "./Componentes/Main";
import PageContainer from "src/components/container/PageContainer";
import Realtors from "./Componentes/Realtors";
import { useParams } from "react-router";
import { getData } from "../../../Services/Api";
import { toast } from "sonner";
import StepOne from "./Componentes/StepOne";
import ParentCard from "../../../components/shared/ParentCard";

const SharePropertyForm = () => {
  const [formData, setFormData] = useState({
    tipoAnuncio: "",
    valorVenda: "",
    valorAluguel: "",
    comissao: "2",
    caucao: "1",
    parcelas: "1",
  });
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [corretores, setCorretores] = useState([]);
  const [filteredCorretores, setFilteredCorretores] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadProperty, setLoadProperty] = useState(false);
  const [property, setProperty] = useState(null);
  const [advertiser, setAdvertiser] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  async function loadPropertyData() {
    setLoadProperty(true);
    try {
      const response = await getData(`properties/${id}`);
      if (response.status === 200 || response.status === 201) {
        setProperty(response.userInfo);
        setAdvertiser(response.userInfo.seller);
        setFormData({
          ...formData,
          tipoAnuncio:
            response.userInfo.announcementType === "sell"
              ? "venda"
              : response.userInfo.announcementType === "rent"
              ? "aluguel"
              : "ambos",
          valorVenda: response.userInfo.prices.sellPrice || "",
          valorAluguel: response.userInfo.prices.rentPrice || "",
          comissao: response.userInfo.commission,
        });
      } else {
        toast.error(`Erro ao carregar dados da propriedade: ${response.message}`);
      }
    } catch (error) {
      toast.error(`Erro ao carregar dados da propriedade: ${error.message}`);
    } finally {
      setLoadProperty(false);
    }
  }

  useEffect(() => {
    loadPropertyData();
  }, []);

  const steps = [
    "Termos do Compartilhamento",
    "Corretores Disponíveis",
    "Compartilhar",
  ];

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <StepOne
            formData={formData}
            setFormData={setFormData}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            setCorretores={setCorretores}
            setFilteredCorretores={setFilteredCorretores}
            setActiveStep={setActiveStep}
          />
        );
      case 1:
        return (
          <Realtors
            isLoading={isLoading}
            corretores={corretores}
            setSearchQuery={setSearchQuery}
            setFilteredCorretores={setFilteredCorretores}
            searchQuery={searchQuery}
            filteredCorretores={filteredCorretores}
          />
        );
      case 2:
        return <div>Compartilhar conteúdo aqui</div>; // Substitua por seu componente final
      default:
        return null;
    }
  };

  return (
    <PageContainer title="Imóveis para venda ou locação" description="Space iMóveis">
      {loadProperty || !property ? (
        <Box sx={{ textAlign: "center", marginTop: 4, height: "100vh" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>

            <Main property={property} advertiser={advertiser} />
            <ParentCard title = "Compartilhar Imóvel">

            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{ pt: 3, pb: 4, }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box>{renderStepContent(activeStep)}</Box>
          </ParentCard>
        </>
      )}
    </PageContainer>
  );
};

export default SharePropertyForm;
