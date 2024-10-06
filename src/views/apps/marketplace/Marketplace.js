/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { Grid, Box, Pagination, Skeleton, Typography, Button, Drawer } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Header from '../../../layouts/full/horizontal/header/Header';
import CardImovel from '../../../components/spaceUI/card-imovel/cardImovel';
import { toast } from 'sonner';
import MarketplaceMaps from './MarcketPlaceMap';
import FilterVitrine from 'src/components/marketplace/Filter';
import { putData } from '../../../Services/Api';

const Marketplace = () => {
    const [selected, setSelected] = useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage] = React.useState(6); // Definido para exibir 6 itens por página
    const [loading, setLoading] = useState(false);
    const [totalItens, setTotalItens] = useState(0);
    const [properties, setProperties] = useState([]); // Dados retornados da API
    const [drawerOpen, setDrawerOpen] = useState(false); // Estado para controlar a abertura do Drawer

    const [formData, setFormData] = useState({
        propertyType : "",
        city : "",
        state : "",
        opcoesRapidas: {
            pool: false,
            grill: false,
            airConditioning: false,
            playground: false,
            eventArea: false,
            gym: false,
            porch: false,
            solarEnergy: false,
            concierge: false,
            yard: false,
            gourmetArea: false,
            balcony: false,
            slab: false,
            gatedCommunity: false,
            garden: false
        },
        minPrice : '',
        maxPrice : '',
        announcementType : '',
    });
    // Crie uma referência para o contêiner de rolagem
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
    
        console.log(formDataToSend);
        
        try {
            const response = await putData(`properties/filter?page=${currentPage}&verified=true`, formDataToSend);
            if (response.status === 200 || response.status === 201) {
                setTotalItens(response.data.pagination.total);
                setProperties(response.data.result); // Defina as propriedades retornadas
                console.log(response.data.result);
            } else {
                toast.error(`Erro ao buscar as propriedades:\n ${response.message}`);
            }
        } catch (error) {
            toast.error(`Erro ao buscar as propriedades:\n ${error.message}`);
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
                    Abrir Filtros
                </Button>
                <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                    <Box sx={{ width: 300, p: 2 }}>
                        <FilterVitrine {...{ formData, setFormData }} />
                    </Box>
                </Drawer>
                <Grid container sx={{ height: 'calc(100vh - 147px)', overflow: 'hidden' }}>
                    <Grid item xs={12} md={7} pt="0px !important">
                        {/* Adicione a referência ao Box */}
                        <Box 
                            ref={scrollContainerRef} 
                            sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 147px)', overflow: 'auto' }} // Altere 'scroll' para 'auto'
                        >
                            <Grid container spacing={3} sx={{ p: 3 }}>
                                {/* Render Skeletons when loading */}
                                {loading ? (
                                    Array.from(new Array(itemsPerPage)).map((_, index) => (
                                        <Grid item xs={12} sm={6} md={4} key={index}>
                                            <Skeleton variant="rectangular" height={200} />
                                            <Skeleton height={50} sx={{ mt: 1 }} />
                                            <Skeleton height={30} width="60%" />
                                            <Skeleton width="40%" />
                                            <Skeleton width="80%" />
                                            <Skeleton width="50%" />
                                            <Skeleton width="99%" height={60} sx={{ mt: 1, margin: 'auto' }} />
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
                                        <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <CardImovel data={property} />
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
                    <MarketplaceMaps properties={properties} />
                </Grid>
            </Box>
        </PageContainer>
    );
};

export default Marketplace;
