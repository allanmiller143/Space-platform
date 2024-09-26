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

const TabEmbedding = () => {
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
            height: 'auto', borderRadius: '8px'
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
            lineHeight: '40px',
          }}
          fontWeight="700"
          mt={5}
        >
          Maximize o potencial do seu imóvel
        </Typography>
        <Box mt={4}>
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
                Anúncios otimizados
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Crie anúncios atraentes e detalhados do seu imóvel com nossa ferramenta intuitiva. Destaque as melhores características e atraia mais interessados.
              </Typography>
            </AccordionDetails>
          </StyledAccordian>
          <Divider />
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
                Encontre o corretor ideal
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Nossa plataforma conecta você aos melhores corretores da sua região. Compare perfis, avaliações e escolha o profissional mais adequado para vender ou alugar seu imóvel.
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
                Gestão simplificada
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Acompanhe todas as etapas da venda ou aluguel do seu imóvel em um só lugar. Receba atualizações em tempo real sobre visitas, propostas e contratos.
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
export default TabEmbedding;
