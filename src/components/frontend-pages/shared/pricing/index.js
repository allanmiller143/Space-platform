import React from 'react';
import { Box, Grid, Typography, Container } from '@mui/material';
import PricingCard from './PricingCard';
import PaymentMethods from './PaymentMethods';

const Pricing = () => {
    return (
        <>
            <Box
                sx={{
                    py: {
                        xs: 5,
                        lg: 11,
                    },
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={3} alignItems="center" justifyContent="center">
                        <Grid item xs={12} lg={7}>
                            <Typography textAlign="center"
                                variant="h4" lineHeight={1.4}
                                mb={6} fontWeight={700}
                                sx={{
                                    fontSize: {
                                        lg: '40px',
                                        xs: '35px',
                                    },
                                }}
                            >
                                Escolha o plano ideal para impulsionar seu negócio imobiliário
                            </Typography>
                        </Grid>
                    </Grid>

                    <PricingCard 
                        plans={[
                            {
                                name: "GRÁTIS",
                                features: [
                                    "Anúncios básicos de imóveis",
                                    "Busca simples de propriedades",
                                    "Agendamento de visitas manual"
                                ]
                            },
                            {
                                name: "PLANO CORRETOR",
                                features: [
                                    "Gestão avançada de leads",
                                    "Agendamento automático de visitas",
                                    "Análise de mercado local"
                                ]
                            },
                            {
                                name: "PLANO IMOBILIÁRIA",
                                features: [
                                    "Gerenciamento de portfólio de imóveis",
                                    "Automação de tarefas administrativas",
                                    "Relatórios de desempenho da imobiliária"
                                ]
                            },
                            {
                                name: "PLANO PRO",
                                features: [
                                    "Todas as funcionalidades dos planos anteriores",
                                    "Integrações personalizadas",
                                    "Suporte prioritário 24/7"
                                ]
                            }
                        ]}
                    />

                    <PaymentMethods />
                </Container>
            </Box>
        </>
    );
};

export default Pricing;
