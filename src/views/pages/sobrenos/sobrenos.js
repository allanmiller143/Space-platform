import { Container, Grid, Typography, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import ScrollToTop from '../../../components/frontend-pages/shared/scroll-to-top';
import HpHeader from '../../../components/frontend-pages/shared/header/HpHeader';
import Footer from '../../../components/landingpage/footer/Footer';
import FeatureCard from './Componentes/FeatureCard';
import features from './Componentes/features';

import image from '../../../assets/images/posters/imagem-8.jpg';

const ContatoPage = () => {
    return (
        <PageContainer title="Sobre nós" description="">
            <HpHeader />

            <Box sx={{ backgroundColor: "#ffffff", py: 8}}>
                <Container maxWidth="lg">
                    {/* Nossa Missão */}
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <img
                                src={image}
                                alt="Space Imóveis"
                                style={{ width: "100%", borderRadius: 8 }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h2" gutterBottom color="primary.main">
                                Nossa Missão
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                Na{" "}
                                <Typography
                                    component="span"
                                    sx={{ color: "primary.main", fontWeight: "bold" }}
                                >
                                    Space Imóveis
                                </Typography>
                                , acreditamos que o futuro do mercado imobiliário é colaborativo, digital e acessível. 
                                Nosso objetivo é conectar corretores, imobiliárias e proprietários de imóveis a compradores, simplificando 
                                o processo de compra e venda com tecnologia de ponta.
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Oferecemos ferramentas como chat interno, agendamentos automatizados e uma rede social exclusiva para usuários.
                            </Typography>
                        </Grid>
                    </Grid>

                    {/* Diferenciais */}
                    <Box mt={6} mb={4}>
                        <Typography variant="h2" align="center" gutterBottom color="primary.main" mb={3}>
                            O que nos torna únicos?
                        </Typography>
                        <Grid container spacing={3}>
                            {features.map((feature, index) => (
                                <Grid item xs={12} sm={4} key={index}>
                                    <FeatureCard
                                        icon={feature.icon}
                                        title={feature.title}
                                        description={feature.description}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </Box>
            <Footer />
            <ScrollToTop />
        </PageContainer>
    );
};

export default ContatoPage;
