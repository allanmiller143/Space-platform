import { Box, Divider, Typography, Grid } from '@mui/material';

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

const TabTeamScheduling = () => {
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
          Potencialize suas vendas
        </Typography>
        <Box mt={4}>
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
              Gestão de imóveis
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Cadastre seus imóveis e faça a gestão dos seus anúncios. Criando sua carteira de imóveis na space, você receberá ofertas de clientes interessados em comprar ou alugar os imóveis cadastrados.              </Typography>
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
              Agendamentos
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              Crie sua agenda de visitas e fique atento nas solicitações dos usuários para visitar os seus imóveis. Em breve, os agendamentos poderão ocorrer de forma mais automatizada em um chatbot personalizado para você.              </Typography>
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
                Análise de dados
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              Você tem acesso a um dashboard para analisar a interação dos usuários com os seis anúncios, quantas visualizações, curtidas e agendamentos, com isso garantimos uma melhor experiência para voce e seus clientes.              </Typography>
            </AccordionDetails>
          </StyledAccordian>
        </Box>
      </Grid>
    </Grid>
  );
};
export default TabTeamScheduling;
