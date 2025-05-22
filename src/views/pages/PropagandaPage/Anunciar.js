import { Button, Container, Grid, Typography,Card, Chip,Box } from "@mui/material";
import { ApartmentOutlined, ArrowForward, House, Landslide, NetworkCell } from "@mui/icons-material";
import Image from '../../../assets/images/posters/imagem-18.jpg'
import Process from "./Componentes/process";
import CardInfo from "./Componentes/CardInfo/CardInfo";
import { useState } from "react";
import PageContainer from "../../../components/container/PageContainer";
import HpHeader from "../../../components/frontend-pages/shared/header/HpHeader";
import Footer from "../../../components/landingpage/footer/Footer";
import { useNavigate } from 'react-router-dom';
import AdPreview from "./Componentes/AdPreview";
import SmallAddPreview from "./Componentes/SmallAddPreview";
export default function PropagandaPage() {
    const [open, setOpen] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navigate = useNavigate();
    const handleClick = () => {
        if(currentUser === null){
            setOpen(true);
            return;
        }else{
            navigate('/inserirPropaganda');
        }
    };

    return (
        <PageContainer title={'Propaganda'}>
            <HpHeader />
            <Container  sx = {{ pb :5}}>
            <Box sx={{ position: "relative", overflow: "hidden", py: 8,mb:5 }}>
                {/* Fundo com forma geométrica */}
                <Box sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "60%",
                    height: "100%",
                    bgcolor: "#F5F0FF",
                    clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)",
                    zIndex: -1
                }} />
                
                <Container>
                    <Grid container spacing={0} alignItems="center">
                    {/* Texto à esquerda (ocupando mais espaço) */}
                    <Grid item xs={12} md={7}>
                        <Box sx={{ pr: { md: 6 } }}>
                        <Typography variant="h1" sx={{ 
                            fontSize: { xs: "2.5rem", md: "3.5rem" },
                            lineHeight: 1.1,
                            mb: 3,
                            fontWeight: 800
                        }}>
                            <Box component="span" sx={{ color: "#6E35B7" }}>Destaque-se</Box> onde os clientes procuram
                        </Typography>
                        
                        <Typography variant="body1" sx={{ 
                            fontSize: "1.1rem",
                            mb: 4,
                            color: "text.secondary"
                        }}>
                            Sua loja ou negócio <strong>diretamente no caminho</strong> de quem busca imóveis. 
                            Anuncie na Space Imóveis e apareça <strong>exatamente quando importa</strong>.
                        </Typography>
                        
                        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
                            {["Sites", "Lojas físicas", "Serviços"].map((item) => (
                            <Chip 
                                key={item}
                                label={item}
                                sx={{ 
                                px: 2,
                                bgcolor: "background.paper",
                                border: "1px solid #ddd",
                                fontWeight: 500
                                }} 
                            />
                            ))}
                        </Box>
                        
                        <Button 
                            variant="contained" 
                            onClick={handleClick}
                            size="large"
                            endIcon={<ArrowForward />}
                            sx={{ 
                            px: 5,
                            py: 1.5,
                            borderRadius: 1,
                            fontWeight: 600,
                            }}
                        >
                            Reserve seu espaço
                        </Button>
                        </Box>
                    </Grid>
                    
                    {/* Imagem à direita (sobrepondo o fundo) */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{
                        mt: { xs: 4, md: 0 },
                        position: "relative",
                        "&:before": {
                            content: '""',
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            top: 20,
                            left: 20,
                            border: "2px solid #6E35B7",
                            borderRadius: 2,
                            zIndex: -1
                        }
                        }}>
                        <img 
                            src={Image} 
                            alt="Anuncie na Space Imóveis"
                            style={{ 
                            width: "100%",
                            borderRadius: 2,
                            boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                            }} 
                        />
                        </Box>
                    </Grid>
                    </Grid>
                </Container>
            </Box>
            <AdPreview/>    
            <SmallAddPreview/>
            {open ?  <CardInfo open = {open} onClose={() => setOpen(false)}/> : null}
            </Container>
            <Footer/>
        </PageContainer>
    );
}
