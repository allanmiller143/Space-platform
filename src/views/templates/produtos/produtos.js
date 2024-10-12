import React from 'react';
import { Container, Grid, Typography, TextField, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import Footer from '../../../components/frontend-pages/shared/footer';
import ScrollToTop from '../../../components/frontend-pages/shared/scroll-to-top';
import HpHeader from '../../../components/frontend-pages/shared/header/HpHeader';
import { Card, CardContent } from '@mui/material';
import Box from '@mui/material/Box';


const ContatoPage = () => {
    return (
        <PageContainer title="Produtos" description="">
            <HpHeader />


            <Container sx={{ mt: '140px' }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <img
                            src="/images/ilustracoes/imobiliaria.jpg"
                            alt="Imobiliárias e Corretores"
                            style={{
                                width: '250px',
                                height: 'auto',
                                borderRadius: '8px',
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h1" gutterBottom>
                            Para Imobiliárias
                        </Typography>

                        <Typography variant="body1" paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography>

                        <Grid container spacing={3}>
                            {[
                                { icon: "icon-dd-lifebuoy.svg", alt: "Suporte", title: "Ferramenta de Suporte e HelpDesk" },
                                { icon: "icon-dd-message-box.svg", alt: "Mensagens", title: "Ferramenta de mensagens" },
                                { icon: "icon-inbox.svg", alt: "Caixa de Entrada", title: "Ferramenta de E-mail" },
                                { icon: "icon-office-bag.svg", alt: "Escritório", title: "Ferramenta de Gestão de Imóveis" },
                                { icon: "icon-office-bag-2.svg", alt: "Escritório 2", title: "CRM Imobiliário" },
                                { icon: "icon-pie.svg", alt: "Gráfico", title: "Gestão de anúncios e leads multiplataforma" },
                                { icon: "icon-tasks.svg", alt: "Tarefas", title: "Ferramenta de Gerenciamento de Tarefas" },
                                { icon: "icon-account.svg", alt: "Conta", title: "Página de perfil público" },
                                { icon: "icon-briefcase.svg", alt: "Portfólio", title: "Ferramenta de Portfólio de imóveis" },
                                { icon: "icon-connect.svg", alt: "Conectar", title: "Rede social integrada" },
                                { icon: "icon-dd-application.svg", alt: "Aplicação", title: "Marketplace de imóveis" },
                                { icon: "icon-dd-chat.svg", alt: "Bate-papo", title: "Ferramenta de Mensagens" },
                                { icon: "icon-dd-date.svg", alt: "Data", title: "Ferramenta de Agendamentos" },
                                { icon: "icon-dd-invoice.svg", alt: "Fatura", title: "Ferramenta de Gestão de Faturas" }
                            ].map((item, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card sx={{ border: '1px solid #e0e0e0', boxShadow: 'none', padding: '0px' }}>
                                        <CardContent sx={{ height: '170px' }}>
                                            <div style={{ marginBottom: '10px', width: '60px', height: '60px', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '8px', border: '1px solid #e1e1e1' }}>
                                                <img
                                                    src={`/images/svgs/${item.icon}`}
                                                    alt={item.alt}
                                                    style={{ width: '40px', height: 'auto' }}
                                                />
                                            </div>
                                            <Typography variant="h5">{item.title}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>


                    </Grid>
                </Grid>


                <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
                    <Grid item>
                        <Button variant="contained" color="primary">
                            Contatar um vendedor
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="primary">
                            Assinar plano
                        </Button>
                    </Grid>
                </Grid>
            </Container>


            <Container sx={{ mt: '140px' }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <img
                            src="/images/ilustracoes/corretor.jpg"
                            alt="Imobiliárias e Corretores"
                            style={{
                                width: '250px',
                                height: 'auto',
                                borderRadius: '8px',
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h1" gutterBottom>
                            Para corretores
                        </Typography>

                        <Typography variant="body1" paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography>

                        <Grid container spacing={3}>
                            {[
                                { icon: "icon-dd-lifebuoy.svg", alt: "Suporte", title: "Ferramenta de Suporte e HelpDesk" },
                                { icon: "icon-dd-message-box.svg", alt: "Mensagens", title: "Ferramenta de mensagens" },
                                { icon: "icon-inbox.svg", alt: "Caixa de Entrada", title: "Ferramenta de E-mail" },
                                { icon: "icon-office-bag.svg", alt: "Escritório", title: "Ferramenta de Gestão de Imóveis" },
                                { icon: "icon-office-bag-2.svg", alt: "Escritório 2", title: "CRM Imobiliário" },
                                { icon: "icon-pie.svg", alt: "Gráfico", title: "Gestão de anúncios e leads multiplataforma" },
                                { icon: "icon-tasks.svg", alt: "Tarefas", title: "Ferramenta de Gerenciamento de Tarefas" },
                                { icon: "icon-account.svg", alt: "Conta", title: "Página de perfil público" },
                                { icon: "icon-briefcase.svg", alt: "Portfólio", title: "Ferramenta de Portfólio de imóveis" },
                                { icon: "icon-connect.svg", alt: "Conectar", title: "Rede social integrada" },
                                { icon: "icon-dd-application.svg", alt: "Aplicação", title: "Marketplace de imóveis" },
                                { icon: "icon-dd-chat.svg", alt: "Bate-papo", title: "Ferramenta de Mensagens" },
                                { icon: "icon-dd-date.svg", alt: "Data", title: "Ferramenta de Agendamentos" },
                                { icon: "icon-dd-invoice.svg", alt: "Fatura", title: "Ferramenta de Gestão de Faturas" }
                            ].map((item, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card sx={{ border: '1px solid #e0e0e0', boxShadow: 'none', padding: '0px' }}>
                                        <CardContent sx={{ height: '170px' }}>
                                            <div style={{ marginBottom: '10px', width: '60px', height: '60px', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '8px', border: '1px solid #e1e1e1' }}>
                                                <img
                                                    src={`/images/svgs/${item.icon}`}
                                                    alt={item.alt}
                                                    style={{ width: '40px', height: 'auto' }}
                                                />
                                            </div>
                                            <Typography variant="h5">{item.title}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>


                    </Grid>
                </Grid>


                <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
                    <Grid item>
                        <Button variant="contained" color="primary">
                            Contatar um vendedor
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="primary">
                            Assinar plano
                        </Button>
                    </Grid>
                </Grid>

            </Container>


            <Container sx={{ mt: '140px' }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <img
                            src="/images/ilustracoes/user.jpg"
                            alt="Para quem quer comprar e vender"
                            style={{
                                width: '250px',
                                height: 'auto',
                                borderRadius: '8px',
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h1" gutterBottom>
                            Para quem quer comprar e vender
                        </Typography>

                        <Typography variant="body1" paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography>

                        <Grid container spacing={3}>
                            {[
                                { icon: "icon-dd-lifebuoy.svg", alt: "Suporte", title: "Ferramenta de Suporte e HelpDesk" },
                                { icon: "icon-dd-message-box.svg", alt: "Mensagens", title: "Ferramenta de mensagens" },
                                { icon: "icon-inbox.svg", alt: "Caixa de Entrada", title: "Ferramenta de E-mail" },
                                { icon: "icon-office-bag.svg", alt: "Escritório", title: "Ferramenta de Gestão de Imóveis" },
                                { icon: "icon-office-bag-2.svg", alt: "Escritório 2", title: "CRM Imobiliário" },
                                { icon: "icon-pie.svg", alt: "Gráfico", title: "Gestão de anúncios e leads multiplataforma" },
                                { icon: "icon-tasks.svg", alt: "Tarefas", title: "Ferramenta de Gerenciamento de Tarefas" },
                                { icon: "icon-account.svg", alt: "Conta", title: "Página de perfil público" },
                                { icon: "icon-briefcase.svg", alt: "Portfólio", title: "Ferramenta de Portfólio de imóveis" },
                                { icon: "icon-connect.svg", alt: "Conectar", title: "Rede social integrada" },
                                { icon: "icon-dd-application.svg", alt: "Aplicação", title: "Marketplace de imóveis" },
                                { icon: "icon-dd-chat.svg", alt: "Bate-papo", title: "Ferramenta de Mensagens" },
                                { icon: "icon-dd-date.svg", alt: "Data", title: "Ferramenta de Agendamentos" },
                                { icon: "icon-dd-invoice.svg", alt: "Fatura", title: "Ferramenta de Gestão de Faturas" }
                            ].map((item, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card sx={{ border: '1px solid #e0e0e0', boxShadow: 'none', padding: '0px' }}>
                                        <CardContent sx={{ height: '170px' }}>
                                            <div style={{ marginBottom: '10px', width: '60px', height: '60px', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '8px', border: '1px solid #e1e1e1' }}>
                                                <img
                                                    src={`/images/svgs/${item.icon}`}
                                                    alt={item.alt}
                                                    style={{ width: '40px', height: 'auto' }}
                                                />
                                            </div>
                                            <Typography variant="h5">{item.title}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>


                    </Grid>
                </Grid>


                <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
                    <Grid item>
                        <Button variant="contained" color="primary">
                            Contatar um vendedor
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="primary">
                            Assinar plano
                        </Button>
                    </Grid>
                </Grid>

            </Container>

            <Box sx={{ 
                backgroundColor: '#f5f5f5', 
                padding: '60px 0', 
                textAlign: 'center',
                marginTop: '60px',
                marginBottom: '60px'
            }}>
                <Container maxWidth="md">
                    <Typography variant="h1" component="h1" sx={{ 
                        fontSize: '3rem', 
                        fontWeight: 'bold', 
                        marginBottom: '20px',
                        color: '#333'
                    }}>
                        Transforme Seu Negócio Imobiliário Hoje!
                    </Typography>
                    <Typography variant="body1" sx={{ 
                        fontSize: '1.2rem', 
                        marginBottom: '30px',
                        color: '#666'
                    }}>
                        Descubra como nossa plataforma pode impulsionar suas vendas, otimizar sua gestão e expandir sua rede de contatos no mercado imobiliário.
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        size="large"
                        sx={{ 
                            padding: '12px 30px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            textTransform: 'none',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            '&:hover': {
                                backgroundColor: '#0056b3'
                            }
                        }}
                    >
                        Comece Agora Gratuitamente
                    </Button>
                </Container>
            </Box>



            <Footer />
            <ScrollToTop />
        </PageContainer>
    );
};

export default ContatoPage;
