import * as React from 'react';
import { Box, Typography, Grid, Container, Link } from '@mui/material';

import { styled } from "@mui/material/styles";
import { IconMinus, IconPlus } from '@tabler/icons';
import { useTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useState } from 'react';

const FAQ = () => {
    const theme = useTheme();

    const [expanded, setExpanded] = useState(true);
    const [expanded2, setExpanded2] = useState(false);
    const [expanded3, setExpanded3] = useState(false);
    const [expanded4, setExpanded4] = useState(false);
    const [expanded5, setExpanded5] = useState(false);
    const [expanded6, setExpanded6] = useState(false);

    const handleChange = () => {
        setExpanded(!expanded);
    };

    const handleChange2 = () => {
        setExpanded2(!expanded2);
    };

    const handleChange3 = () => {
        setExpanded3(!expanded3);
    };

    const handleChange4 = () => {
        setExpanded4(!expanded4);
    };

    const handleChange5 = () => {
        setExpanded5(!expanded5);
    };

    const handleChange6 = () => {
        setExpanded6(!expanded6);
    };

    const StyledAccordian = styled(Accordion)(() => ({
        borderRadius: "8px",
        marginBottom: '16px !important',
        boxShadow: theme.palette.mode == 'light' ? '0px 3px 0px rgba(235, 241, 246, 0.25)' : null,
        border: `1px solid ${theme.palette.divider}`,
        '&:before': {
            display: 'none'
        },
        '&.Mui-expanded': {
            margin: '0'
        },
        '& .MuiAccordionSummary-root': {
            padding: '8px 24px',
            minHeight: '60px',
            fontSize: '18px',
            fontWeight: 500
        },
        '& .MuiAccordionDetails-root': {
            padding: '0 24px 24px'
        }
    }));

    return (
        <Container maxWidth="lg" sx={{
            pb: {
                xs: '30px',
                lg: '60px'
            }
        }}>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} lg={8}>
                    <Typography variant='h4' textAlign="center" lineHeight="1.2" sx={{
                        fontSize: {
                            lg: '40px',
                            xs: '35px'
                        }
                    }} fontWeight="700" >Perguntas Frequentes</Typography>
                    <Box mt={7}>
                        <StyledAccordian expanded={expanded} onChange={handleChange}>
                            <AccordionSummary
                                expandIcon={expanded ? <IconMinus size="21" stroke="1.5" /> : <IconPlus size="21" stroke="1.5" />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                Quais são as diferenças entre os planos oferecidos?
                            </AccordionSummary>
                            <AccordionDetails>
                                Oferecemos quatro planos: GRÁTIS, PLANO CORRETOR, PLANO IMOBILIÁRIA e PLANO PRO. Cada plano é projetado para atender diferentes necessidades, desde iniciantes no mercado até grandes imobiliárias. As principais diferenças estão nos recursos oferecidos, como gestão de leads, automação de tarefas e suporte personalizado.
                            </AccordionDetails>
                        </StyledAccordian>
                        <StyledAccordian expanded={expanded2} onChange={handleChange2}>
                            <AccordionSummary
                                expandIcon={expanded2 ? <IconMinus size="21" stroke="1.5" /> : <IconPlus size="21" stroke="1.5" />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                Como funciona o plano GRÁTIS?
                            </AccordionSummary>
                            <AccordionDetails>
                                O plano GRÁTIS é ideal para quem está começando no mercado imobiliário. Ele inclui recursos básicos como anúncios simples de imóveis, busca de propriedades, agendamento manual de visitas, perfil básico de corretor e suporte por e-mail. É uma ótima opção para experimentar nossa plataforma sem custo.
                            </AccordionDetails>
                        </StyledAccordian>
                        <StyledAccordian expanded={expanded3} onChange={handleChange3}>
                            <AccordionSummary
                                expandIcon={expanded3 ? <IconMinus size="21" stroke="1.5" /> : <IconPlus size="21" stroke="1.5" />}
                                aria-controls="panel3-content"
                                id="panel3-header"
                            >
                                Quais são os benefícios do PLANO CORRETOR?
                            </AccordionSummary>
                            <AccordionDetails>
                                O PLANO CORRETOR é perfeito para corretores autônomos que buscam eficiência. Além dos recursos do plano GRÁTIS, ele oferece gestão avançada de leads, agendamento automático de visitas, análise de mercado local, criação de anúncios premium e suporte prioritário. Tudo isso por R$99/mês.
                            </AccordionDetails>
                        </StyledAccordian>
                        <StyledAccordian expanded={expanded4} onChange={handleChange4}>
                            <AccordionSummary
                                expandIcon={expanded4 ? <IconMinus size="21" stroke="1.5" /> : <IconPlus size="21" stroke="1.5" />}
                                aria-controls="panel4-content"
                                id="panel4-header"
                            >
                                O que o PLANO IMOBILIÁRIA oferece?
                            </AccordionSummary>
                            <AccordionDetails>
                                O PLANO IMOBILIÁRIA é ideal para imobiliárias de pequeno e médio porte. Por R$299/mês, você tem acesso a todos os recursos do PLANO CORRETOR, além de gerenciamento de portfólio de imóveis, automação de tarefas administrativas, relatórios de desempenho da imobiliária, integração com sistemas de CRM e treinamento personalizado.
                            </AccordionDetails>
                        </StyledAccordian>
                        <StyledAccordian expanded={expanded5} onChange={handleChange5}>
                            <AccordionSummary
                                expandIcon={expanded5 ? <IconMinus size="21" stroke="1.5" /> : <IconPlus size="21" stroke="1.5" />}
                                aria-controls="panel5-content"
                                id="panel5-header"
                            >
                                Para quem é recomendado o PLANO PRO?
                            </AccordionSummary>
                            <AccordionDetails>
                                O PLANO PRO é uma solução completa para grandes imobiliárias e incorporadoras. Por R$599/mês, oferece todos os recursos dos planos anteriores, além de API para integrações personalizadas, análise avançada de dados do mercado, suporte 24/7, consultoria estratégica mensal e acesso antecipado a novos recursos.
                            </AccordionDetails>
                        </StyledAccordian>
                        <StyledAccordian expanded={expanded6} onChange={handleChange6}>
                            <AccordionSummary
                                expandIcon={expanded6 ? <IconMinus size="21" stroke="1.5" /> : <IconPlus size="21" stroke="1.5" />}
                                aria-controls="panel6-content"
                                id="panel6-header"
                            >
                                Como posso obter suporte após a adesão?
                            </AccordionSummary>
                            <AccordionDetails>
                                O suporte varia de acordo com o plano escolhido. O plano GRÁTIS oferece suporte por e-mail, enquanto os planos pagos têm suporte prioritário. O PLANO PRO inclui suporte 24/7. Além disso, oferecemos treinamento personalizado para os planos IMOBILIÁRIA e PRO.
                            </AccordionDetails>
                        </StyledAccordian>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} lg={5}>
                    <Box mt={5} borderRadius="8px" display="inline-flex" justifyContent="center" gap="4px" alignItems="center" fontWeight={500} sx={{
                        border: `1px dashed ${theme.palette.divider}`, padding: '7px 10px', cursor: 'pointer',
                        '&:hover': {
                            borderColor: 'primary.main'
                        }
                    }}>
                        <Typography>Ainda tem dúvidas?</Typography>
                        <Link href="#" color="inherit" underline="always" sx={{
                            '&:hover': {
                                color: 'primary.main'
                            }
                        }}>Fale conosco</Link>
                        <Typography>ou</Typography>
                        <Link href="#" color="inherit" underline="always" sx={{
                            '&:hover': {
                                color: 'primary.main'
                            }
                        }}>agende uma demonstração</Link>.
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};
export default FAQ;
