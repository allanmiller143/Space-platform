/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import ContractContext from "./ContractContext/ContractContext";
import { useNavigate, useParams } from "react-router";
import { loadPropertyData } from "./Utils/Functions";
import { Typography } from "@mui/material";
import Breadcrumb from "../../../layouts/full/shared/breadcrumb/Breadcrumb";
import Spinner from "../../spinner/Spinner";

const ContractsPage = () => {
    const { currentStep, setCurrentStep, property, loading, setLoading, setProperty } = useContext(ContractContext);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        loadPropertyData(setLoading,setProperty,navigate,id);
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <Breadcrumb title={"Contratos"} subtitle={"Contratos"} />
            <Typography variant="h5" gutterBottom>
                Contratos
            </Typography>
        </>
    );
};

export default ContractsPage;
