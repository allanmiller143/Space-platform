import * as React from 'react';
import { Box, Divider, Typography, Grid, Button } from '@mui/material';

import { styled } from '@mui/material/styles';
import { IconMinus, IconPlus } from '@tabler/icons';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useState } from 'react';

import IconAcc from 'src/assets/images/frontend-pages/homepage/accordian1.jpg';

const StyledAccordian = styled(Accordion)(() => ({
  boxShadow: 'none',
  marginBottom: '0 !important',
  '&.Mui-expanded': {
    margin: '0',
  },
  '& .MuiAccordionSummary-root': {
    padding: 0,
    minHeight: '60px',
  },
  '& .MuiAccordionDetails-root': {
    padding: '0 0 20px',
  },
}));

const TabPayments = () => {
  const [expanded, setExpanded] = useState(true);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);

  const handleChange2 = () => {
    setExpanded(!expanded);
  };

  const handleChange3 = () => {
    setExpanded2(!expanded2);
  };

  const handleChange4 = () => {
    setExpanded3(!expanded3);
  };

  return (
    <Grid container spacing={{ xs: 3, lg: 8 }}>
      <Grid item xs={12} lg={6}>
        <img
          src={IconAcc}
          width={500}
          height={500}
          style={{
            width: '100%',
            height: 'auto',  borderRadius: '8px'
          }}
          alt="img"
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography
          variant="h4"
          sx={{
            fontSize: {
              lg: '40px',
              xs: '35px',
            },
          }}
          fontWeight="700"
          mt={5}
        >
          Gestão Imobiliária Eficiente
        </Typography>
        <Box mt={4}>
          <StyledAccordian expanded={expanded} onChange={handleChange2} component={Box}>
            <AccordionSummary
              expandIcon={
                expanded ? (
                  <IconMinus size="21" stroke="1.5" />
                ) : (
                  <IconPlus size="21" stroke="1.5" />
                )
              }
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography fontSize="17px" fontWeight="600">
                Controle de Portfólio
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Gerencie facilmente todos os imóveis do seu portfólio. Acompanhe status, valores, documentação e histórico de cada propriedade em um só lugar.
              </Typography>
            </AccordionDetails>
          </StyledAccordian>
          <Divider />
          <StyledAccordian expanded={expanded2} onChange={handleChange3}>
            <AccordionSummary
              expandIcon={
                expanded2 ? (
                  <IconMinus size="21" stroke="1.5" />
                ) : (
                  <IconPlus size="21" stroke="1.5" />
                )
              }
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography fontSize="17px" fontWeight="600">
                Automação de Processos
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Automatize tarefas repetitivas como geração de contratos, cobranças e relatórios. Economize tempo e reduza erros com nossos fluxos de trabalho inteligentes.
              </Typography>
            </AccordionDetails>
          </StyledAccordian>
          <Divider />
          <StyledAccordian expanded={expanded3} onChange={handleChange4}>
            <AccordionSummary
              expandIcon={
                expanded3 ? (
                  <IconMinus size="21" stroke="1.5" />
                ) : (
                  <IconPlus size="21" stroke="1.5" />
                )
              }
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography fontSize="17px" fontWeight="600">
                Análise de Desempenho
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Obtenha insights valiosos sobre o desempenho da sua imobiliária. Acompanhe métricas-chave, analise tendências de mercado e tome decisões baseadas em dados.
              </Typography>
            </AccordionDetails>
          </StyledAccordian>
          <Divider />
          <Box mt={3}>
            <Button variant="contained" color="primary" size="large">
              Saiba Mais
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default TabPayments;
