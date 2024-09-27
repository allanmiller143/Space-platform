/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { Grid, Box, Pagination, Skeleton } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Header from '../../../layouts/full/horizontal/header/Header';
import CardImovel from '../../../components/spaceUI/card-imovel/cardImovel';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import FilterVitrine from 'src/components/marketplace/Filter';
import { putData } from '../../../services/api';
import { toast } from 'sonner';
import MarketplaceMaps from './MarcketPlaceMap';

const Marketplace = () => {
    const [selected, setSelected] = useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage] = React.useState(6); // Definido para exibir 6 itens por página
    const [loading, setLoading] = useState(false);
    const [totalItens, setTotalItens] = useState(8);
    const [properties, setProperties] = useState([]); // Dados retornados da API

    // Crie uma referência para o contêiner de rolagem
    const scrollContainerRef = useRef(null);

    const filter = async () => {
        setLoading(true); // Iniciar o loading
        try {
            const response = await putData(`properties/filter?page=${currentPage}&verified=true`, {});
            if (response.status === 200 || response.status === 201) {
                setProperties(response.data.result); // Defina as propriedades retornadas
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
    }, [currentPage]);

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
                <FilterVitrine />
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
                                ) : (
                                    properties
                                        .map((property, index) => (
                                            <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <CardImovel data={property} />
                                            </Grid>
                                        ))
                                )}
                            </Grid>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, mb: 4 }}>
                                {(totalItens && currentPage && !loading) && (
                                    <Pagination
                                        count={Math.ceil(totalItens / itemsPerPage)}
                                        page={currentPage}
                                        onChange={handleChangePage}
                                    />
                                )}
                            </Box>
                        </Box>
                    </Grid>
                    <MarketplaceMaps properties={properties} />
                </Grid>
            </Box>
        </PageContainer>
    );
};

export default Marketplace;
