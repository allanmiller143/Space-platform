/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, useContext } from 'react';
import { Grid, Box, Pagination, Skeleton, Typography, Button, Drawer } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Header from '../../../layouts/full/horizontal/header/Header';
import MarketplaceMaps from './MarcketPlaceMap';
import FilterVitrine from 'src/components/marketplace/Filter';
import { putData } from '../../../Services/Api';
import marketplaceContext from './MarketplaceContext/MarketplaceContext';
import BlogPost from '../../../components/apps/blog/BlogCard';
// import nodata from "../../"
const Marketplace = () => {
    const {    
        currentPage, setCurrentPage,itemsPerPage,
        loading, setLoading,
        totalItens, setTotalItens,
        properties, setProperties,
        drawerOpen, setDrawerOpen,
        navigate, formData, setFormData,
    } = useContext(marketplaceContext);


    const scrollContainerRef = useRef(null);
    const filter = async () => {
        setLoading(true); // Iniciar o loading

        // Cria um novo objeto apenas com as opções que forem true
        const opcoesRapidasTrue = Object.keys(formData.opcoesRapidas)
            .filter(key => formData.opcoesRapidas[key] === true)
            .reduce((obj, key) => {
                obj[key] = true;
                return obj;
            }, {});
        
        // Crie o objeto para enviar, mesclando o formData com as opções filtradas
        const formDataToSend = {
            propertyType: formData.propertyType,
            city: formData.city,
            state: formData.state,
            ...opcoesRapidasTrue // Adicione apenas as opções verdadeiras
        };

        if (formData.announcementType === 'rent' || formData.announcementType === 'sell') {
            formDataToSend.announcementType = formData.announcementType;
        }
    
        // Sempre arredondar os valores de minPrice e maxPrice antes de enviar
        if (parseInt(formData.minPrice) > 1) {
            formDataToSend.minPrice = Math.round(parseFloat(formData.minPrice)); // Arredondar minPrice
        }
        if (formData.minPrice <= formData.maxPrice && parseInt(formData.maxPrice) > 1 && formData.minPrice > 1) {
            formDataToSend.maxPrice = Math.round(parseFloat(formData.maxPrice)); // Arredondar maxPrice
        }
            
        try {
            const response = await putData(`properties/filter?page=${currentPage}&limit=40&verified=true`, formDataToSend);
            if (response.status === 200 || response.status === 201) {
                setTotalItens(response.data.pagination.total);
                setProperties(response.data.result); // Defina as propriedades retornadas
                console.log(response.data.result);
            } else {
                navigate('/error');
            }
        } catch (error) {
            navigate('/error');
        } finally {
            setLoading(false); // Parar o loading
        }
    };
    
    
    
    useEffect(() => {
        filter();
    }, [currentPage, formData]);

    const handleChangePage = (event, newPage) => { // PAGINAÇÃO
        setCurrentPage(newPage);
        // Role o contêiner para o topo ao mudar de página
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
                top: 0,
                behavior: 'smooth', // Rolagem suave
            });
        }
    };

    return (
        <PageContainer title="Imóveis para venda ou locação" description="Space iMóveis">
            <Header />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Button variant="text" color="primary" onClick={() => setDrawerOpen(true)} sx={{ borderRadius: 0 }}>
                    {`Exibindo ${properties.length} resultados - ${Object.keys(formData).filter(key => formData[key]).length - 1} Filtros aplicados - Ver filtros`}
                </Button>
                <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                    <Box sx={{ width: { xs: 340, md: 600}, p: 4, flexGrow: 0 }}>
                        <Typography variant="h3" gutterBottom>
                            Filtros
                        </Typography>
                        <FilterVitrine {...{ formData, setFormData }} />
                    </Box>
                </Drawer>
                <Grid container sx={{ height: 'calc(100vh - 107px )', overflow: 'hidden' }}>
                    <Grid item xs={12} pt="0px !important">
                        {/* Adicione a referência ao Box */}
                        <Box 
                            ref={scrollContainerRef} 
                            sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 107px)', overflow: 'auto' }} // Altere 'scroll' para 'auto'
                        >
                            <Grid container spacing={0.5} sx={{ p: 3, display: 'flex', alignItems: 'start',}}>
                                {/* Render Skeletons when loading */}
                                {loading ? (
                                    Array.from(new Array(itemsPerPage)).map((_, index) => (
                                        <Grid item xs={12} sm={6} md={3} key={index}>
                                            <Skeleton animation="wave"variant="square"width="100%"height={440}sx={{ borderRadius: (theme) => theme.shape.borderRadius / 5 }}></Skeleton>           
                                        </Grid>
                                    ))
                                ) : properties.length === 0 ? ( // Verifique se não há propriedades
                                    <Grid item xs={12} sx = {{height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
                                        <Typography variant="h6" align="center">
                                            Ops, não foram encontrados imóveis!
                                        </Typography>
                                    </Grid>
                                ) : (
                                    properties.map((property, index) => (
                                        <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <BlogPost post={property} />
                                        </Grid>
                                    ))
                                )}
                            </Grid>
                            {
                              properties.length > 0 ? <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, mb: 4 }}>
                                {(totalItens && currentPage && !loading) && (
                                    <Pagination
                                        count={Math.ceil(totalItens / itemsPerPage)}
                                        page={currentPage}
                                        onChange={handleChangePage}
                                    />
                                )}
                            </Box> : 
                            null
                            }
                        </Box>
                    </Grid>
                    {/* <MarketplaceMaps properties={properties} formData={formData} /> */}
                </Grid>
            </Box>
        </PageContainer>
    );
};

export default Marketplace;
