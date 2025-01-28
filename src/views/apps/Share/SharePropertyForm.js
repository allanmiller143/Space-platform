import { useEffect, useState } from "react";
import {Box,CircularProgress,Step,StepLabel,Stepper,} from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import StepTwo from "./Componentes/StepTwo";
import { useParams } from "react-router";
import { getData } from "../../../Services/Api";
import { toast } from "sonner";
import StepOne from "./Componentes/StepOne";
import ParentCard from "../../../components/shared/ParentCard";
import Stepthree from "./Componentes/Stepthree";
import Breadcrumb from "../../../layouts/full/shared/breadcrumb/Breadcrumb";

const SharePropertyForm = () => {
  const [formData, setFormData] = useState({
    tipoAnuncio: "",
    valorVenda: "",
    valorAluguel: "",
    comissao: "",
    selectedUser: null,
    property: null,
  });
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [corretores, setCorretores] = useState([]);
  const [filteredCorretores, setFilteredCorretores] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadProperty, setLoadProperty] = useState(false);
  const [property, setProperty] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  async function loadPropertyData() {
    setLoadProperty(true);
    try {
      const response = await getData(`properties/${id}`);
      if (response.status === 200 || response.status === 201) {
        setProperty(response.userInfo);
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
          comissao: "",
          property: response.userInfo,
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
            corretores={corretores}

          />
        );
      case 1:
        return (
          <StepTwo
            isLoading={isLoading}
            corretores={corretores}
            setSearchQuery={setSearchQuery}
            setFilteredCorretores={setFilteredCorretores}
            searchQuery={searchQuery}
            filteredCorretores={filteredCorretores}
            setActiveStep={setActiveStep}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 2:
        return (      
          <Stepthree
            isLoading={isLoading}
            corretores={corretores}
            setSearchQuery={setSearchQuery}
            setFilteredCorretores={setFilteredCorretores}
            searchQuery={searchQuery}
            filteredCorretores={filteredCorretores}
            setActiveStep={setActiveStep}
            formData={formData}
            setFormData={setFormData}
            property={property}
          />
      );

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
      <Breadcrumb title="Comparilhar Imovel" description="this is Form Wizard page" />
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
