import React from 'react';
import { Container, Grid, Typography, TextField, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import Footer from '../../../components/frontend-pages/shared/footer';
import ScrollToTop from '../../../components/frontend-pages/shared/scroll-to-top';
import HpHeader from '../../../components/frontend-pages/shared/header/HpHeader';
import { Card, CardContent } from '@mui/material';

const ContatoPage = () => {
    return (
        <PageContainer title="Contato" description="Entre em contato conosco">
            <HpHeader />
            <Container>
                <Grid container pt={5}>

                    <Grid item xs={12}>
                        <Typography variant="h1" gutterBottom>Contato</Typography>
                        <form>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Nome"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="E-mail"
                                        variant="outlined"
                                        type="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Assunto"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Mensagem"
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                    >
                                        Enviar Mensagem
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>

                    <Grid container spacing={4} my={4}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ height: '100%', backgroundColor: '#E3F2FD', p: 0 }}>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom color="primary">
                                        Contato
                                    </Typography>
                                    <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                                        Telefone:
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" mb={2}>
                                        (11) 5555-1234
                                    </Typography>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        Email:
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        contato@spaceimoveis.com.br
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ height: '100%', backgroundColor: '#FFF3E0', p: 0 }}>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom color="secondary">
                                        Endereço
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        Av. Paulista, 1000 - Bela Vista
                                        São Paulo - SP, 01310-100
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ height: '100%', backgroundColor: '#E8F5E9', p: 0 }}>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom color="success">
                                        Suporte
                                    </Typography>
                                    <Typography variant="subtitle2" fontWeight="bold" mt={1} component="a" href="#" sx={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                                        Central de atendimento ao cliente
                                    </Typography>
                                    <Typography variant="subtitle2" fontWeight="bold" mt={1} component="a" href="#" sx={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                                        Perguntas e respostas
                                    </Typography>
                                    <Typography variant="subtitle2" fontWeight="bold" mt={1} component="a" href="#" sx={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                                        Tickets
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card sx={{ height: '100%', backgroundColor: '#FCE4EC', p: 0 }}>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom color="error">
                                        Vendas
                                    </Typography>
                                    <Typography variant="subtitle2" fontWeight="bold" mt={1}>
                                        Solicitar demonstração
                                    </Typography>
                                    <Typography variant="subtitle2" fontWeight="bold" mt={1}>
                                        Fale com um consultor
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                </Grid>
            </Container>
            <Footer />
            <ScrollToTop />
        </PageContainer>
    );
};

export default ContatoPage;
