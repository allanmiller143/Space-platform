import { Button, Container, Grid, Typography } from "@mui/material";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import Footer from "../../../components/landingpage/footer/Footer";
import PageContainer from "../../../components/container/PageContainer";
import HpHeader from "../../../components/frontend-pages/shared/header/HpHeader";
import AnuncioEditor from "./InserirAnuncio/Anuncios";
export default function Propaganda() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navigate = useNavigate();


    return (
        <PageContainer title={'Anunciar'}>
            <HpHeader />
            <Container  sx = {{ py : 5}}>
                <AnuncioEditor/>
               
            </Container>
            <Footer/>
        </PageContainer>
    );
}
