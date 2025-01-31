/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../../components/container/PageContainer";
import Breadcrumb from "../../layouts/full/shared/breadcrumb/Breadcrumb";
import { Box } from "@mui/system";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { GetUserProperties } from "./Data";
import { useNavigate } from 'react-router-dom';
import BlogCard from "../../components/apps/blog/BlogCard";
import Filter from "./Componetes/Filter";
import { Menu } from "@mui/icons-material";


const TelaDeTest = () => {
    const [loading, setLoading] = React.useState(false);
    const [properties, setProperties] = React.useState([]);
    const [filteredProperties, setFilteredProperties] = React.useState([]);
    const  [openDrawer, setOpenDrawer] = React.useState(false);
    const { id} = useParams();
    const [propertyTypes, setPropertyTypes] = React.useState({
        apartment: false,
        house: false,
        land: false,
        farm: false,
      });
    
      const [announcementType, setAnnouncementType] = React.useState("");
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await GetUserProperties(navigate, setLoading,id); 
            setProperties(data); 
            setFilteredProperties(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const isPropertyTypeFilterActive = Object.values(propertyTypes).some((value) => value === true);
        const filtered = properties.filter((property) => {
            const propertyTypeMatches = isPropertyTypeFilterActive
                ? propertyTypes[property.propertyType] || propertyTypes.both
                : true; 
    
            const announcementTypeMatches =
                announcementType === "" || 
                property.announcementType === announcementType || 
                (announcementType === "sell" && property.announcementType === "both") ||
                (announcementType === "rent" && property.announcementType === "both"); 
    
            return propertyTypeMatches && announcementTypeMatches;
        });
        setFilteredProperties(filtered);
    }, [propertyTypes, announcementType]);


    if (loading && properties.length === 0) {
        return (
            <Box sx={{ width: '100%', height: 'calc(100vh - 250px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!loading && properties.length === 0) {
        return (
            <Box sx={{ width: '100%', height: 'calc(100vh - 250px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h4">Opss, parece que nenhuma propriedade foi encontrada</Typography>
            </Box>
        );
    }

    return (
        <PageContainer title="imóveis" description="this is Test page">
            <Filter openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} propertyTypes={propertyTypes} setPropertyTypes={setPropertyTypes} announcementType={announcementType} setAnnouncementType={setAnnouncementType} />
            {
                <Box sx = {{ display : {md : 'flex', xs : 'none'}}}> 
                    <Breadcrumb title="Todos os imoveis" subtitle={"Nesse componente estou implementando uma tela que vai retornar os imoveis de um usuario especifico"} />
                </Box>
            }
            <Box sx={{ width: '100%',display: 'flex',flexDirection: 'column', mt: { md: -2, xs: 1} }}>
                <Grid container spacing={1} >
                    <Grid item xs={12} sx = {{cursor: 'pointer'}} onClick={() => setOpenDrawer(true)}>
                        <Box width="100%" height={'50px'} backgroundColor={'primary.light'} display={'flex'} alignItems={'center'} justifyContent={'start'} cursor ={'pointer'}>
                            < Menu color="primary" sx = {{ ml: 2}}/>
                            <Typography variant="h6" color="primary" sx={{ml: 1}} > Abrir Filtros</Typography>
                        </Box> 
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={1} sx = {{display: 'flex',flexDirection: 'row', alignItems: 'start', justifyContent: 'center'}}>
                            {filteredProperties.map((property, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <BlogCard post={property} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
};

export default TelaDeTest;