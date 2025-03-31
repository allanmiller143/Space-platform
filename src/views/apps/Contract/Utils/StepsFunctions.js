import Step1 from "../Componentes/Step1/Step1";
import ClientInfoStep from "../Componentes/Step2/Step2";
import WaitingForOwnerStep from "../Componentes/Step3/Step3";
import Step4 from "../Componentes/Step4/Step4";

export function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return <Step1 />;
        case 1:
            return <ClientInfoStep/>;
        case 2: 
            return <WaitingForOwnerStep />;
        case 3:
            return <Step4/>;
        default:
            return null;
    }
}


                    
    // Função para voltar para o passo anterior
    export const handleBack = (currentStep, setCurrentStep) => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };


    export const sendOffer = (proposalType, setError, setHistory, paymentDay, contractDuration,property,setCurrentStep) => {
        if (!proposalType) {
            setError("Selecione um tipo de proposta antes de enviar.");
            return false;
        }

        if (property.announcementType === "rent" && proposalType !== "rent") {
            setError("Este anúncio é apenas para aluguel.");
            return false;
        }
        if (property.announcementType === "sell" && proposalType !== "buy") {
            setError("Este anúncio é apenas para venda.");
            return false;
        }

        // Validações específicas para aluguel
        if (proposalType === "rent") {
            if (!paymentDay) {
            setError("Informe o dia do pagamento.");
            return false;
            }
            if (!contractDuration) {
            setError("Informe a duração do contrato.");
            return false;
            }
        }

        const newOffer = {
            id: 1,
            property : property,
            advertiser: property.seller,
            client : {},
            negociation: {
            seller: "rejected",
            buyer: "pending",
            },
            paymentDay: proposalType === "rent" ? paymentDay : null,
            contractDuration: proposalType === "rent" ? contractDuration : null,
            proposalType: proposalType,
        };

        setHistory(newOffer);
                
        setError(null);
        setCurrentStep(1);
        return true;
    };
  
                                                        