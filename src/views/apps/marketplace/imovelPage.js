/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Grid, Box, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Header from '../../../layouts/full/horizontal/header/Header';
import "leaflet/dist/leaflet.css";
import { toast } from 'sonner';
import { getData } from '../../../Services/Api';
import { useParams } from 'react-router';
import Spinner from '../../spinner/Spinner';
import PropertyGallery from './Componentes/Gallery';
import DadosGerais from './Componentes/DadosGerais';
import Map from './Componentes/Map';
import AdvertiserCard from './Componentes/advertiserCard';


const ImovelPage = () => {
    const [loading,setLoading] = useState(false);
    const [property,setProperty] = useState(null);
    const [advertiser,setAdvertiser] = useState(null);
    const { id } = useParams();

    async function loadPropertyData() {
        setLoading(true);
        console.log(id)
        try {
            const response = await getData(`properties/${id}`);
            console.log(response)
            if (response.status === 200 || response.status === 201) {
                setProperty(response.userInfo);
                setAdvertiser(response.userInfo.seller);
            } else {
                toast.error(`Erro ao carregar dados da propriedade: ${response.message}`);
            }
        } catch (error) {
            toast.error(`Erro ao carregar dados da propriedade: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPropertyData();
    }, []);

   // Exibe o componente de Loading enquanto carrega os dados do usuário
   if (loading) {
    return <Spinner/>
   }
    return (

        <PageContainer title="Imóveis para venda ou locação" description="Space iMóveis">
            <Header />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Grid container sx={{ height: 'calc(100vh)', overflow: 'hidden' }}>
                    <Grid
                        item
                        xs={12}
                        md={8}
                        sx={{
                        borderRight: '1px solid #d4d4d4',
                        padding: '50px !important',
                        overflowY: 'scroll', // Only vertical scroll if necessary
                        height: '100%',
                        boxShadow: '1px 0px 4px #2121211f',
                        zIndex: 9,
                        width: '100%', // Make sure it doesn't overflow
                        }}
                    >
                        <PropertyGallery property={property} />
                        <DadosGerais property={property} />
                    </Grid>
                    <Grid
                        item
                        md={4}
                        sx={{
                        padding: 5,
                        backgroundColor: '#fafafa',
                        overflow: 'auto', // Use auto if you want scroll when content exceeds container
                        }}
                    >
                        <Box sx={{ display: 'flex', gap: 3, my: 4 }}>
                        <Button variant="contained" color="primary">
                            Agendar visita
                        </Button>
                        <Button variant="outlined" color="primary">
                            Fazer proposta
                        </Button>
                        </Box>
                        <Map property={property} />
                        <AdvertiserCard property={property} advertiser={advertiser} />
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
};

export default ImovelPage;
