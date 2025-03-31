import { useContext, useEffect } from "react";
import ContractContext from "./ContractContext/ContractContext";
import Breadcrumb from "../../../layouts/full/shared/breadcrumb/Breadcrumb";
import { useNavigate, useParams } from "react-router";
import Spinner from "../../spinner/Spinner";
import { loadPropertyData } from "./Utils/Functions";
import HorizontalStepper from "./Componentes/HorizontalStepper";

const ContractsPage = () => {
    const { currentStep, setCurrentStep, property, loading, setLoading, setProperty } = useContext(ContractContext);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        loadPropertyData(setLoading, setProperty, navigate, id);
    }, [id, navigate, setLoading, setProperty]);

    if (loading || !property) {
        return <Spinner />;
    }

    return (
        <>
            <Breadcrumb title={"Contratos"} subtitle={"Contratos"} />
            <HorizontalStepper />
        </>
    );
};

export default ContractsPage;
