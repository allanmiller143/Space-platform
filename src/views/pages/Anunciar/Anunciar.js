import { Button, Container, Grid, Typography } from "@mui/material";
import { ApartmentOutlined, House, Landslide } from "@mui/icons-material";
import Image from '../../../assets/images/posters/imagem-4.jpg'
import Process from "./Componentes/process";
import ReviewCarousel from "./Componentes/reviews/ReviewCarousel";
import CardInfo from "./Componentes/CardInfo/CardInfo";
import { useState } from "react";
import PageContainer from "../../../components/container/PageContainer";
import HpHeader from "../../../components/frontend-pages/shared/header/HpHeader";

export default function Anunciar() {
    const [open, setOpen] = useState(false);

    return (
        <PageContainer title={'Anunciar'}>
            <HpHeader />
            <Container  sx = {{ pb :5}}>
                <Grid container spacing={4} mt = {6} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <img src={Image} alt="Space Imóveis" style={{ width: "100%", borderRadius: 8 }} />
                    </Grid>                 
                    <Grid item xs={12} md={6}>
                        <Typography variant="h1" gutterBottom>
                            <span style={{ color: "#6E35B7" }}>Anuncie</span> seus imóveis e alcance milhões de interessados.
                        </Typography>
                        <Typography variant="subtitle1" mb = {3} sx = {{fontSize: "1.2rem", lineHeight: 1.2, color: "gray"}} gutterBottom>
                            Bem-vindo à Space Imóveis, a plataforma ideal para anunciar imóveis.
                        </Typography>
                        
                        <Grid container spacing={2} mb={3}>
                            <Grid item>
                                <Button  startIcon={<House />}>Casas</Button>
                            </Grid>
                            <Grid item>
                                <Button startIcon={<ApartmentOutlined />}>Apartamentos</Button>
                            </Grid>
                            <Grid item>
                                <Button startIcon={<Landslide />}>Terrenos</Button>
                            </Grid>
                        </Grid>

                        <Button variant="contained" color="primary" onClick={() => setOpen(true)} >
                            Quero anunciar
                        </Button>
                    </Grid>
                </Grid>
                
                <Process />
                {
                    open ?  <CardInfo open = {open} onClose={() => setOpen(false)}/> : null
                }
                

                <ReviewCarousel/>   

            </Container>
        </PageContainer>
    );
}
