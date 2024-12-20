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

const Main = () => {
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
                Gestão de leads inteligente
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Organize e priorize seus leads automaticamente, garantindo que você nunca perca uma oportunidade de venda. Nossa ferramenta de gestão de leads ajuda você a manter o foco nos clientes mais promissores.
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
                Agendamento automático de visitas
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Simplifique o processo de agendamento de visitas aos imóveis. Nossa ferramenta sincroniza automaticamente sua agenda com a disponibilidade dos proprietários, economizando seu tempo e melhorando a experiência do cliente.
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
                Análise de mercado em tempo real
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Tenha acesso a dados atualizados do mercado imobiliário local. Nossa ferramenta de análise fornece insights valiosos sobre tendências de preços, demanda por bairros e tipos de imóveis, ajudando você a tomar decisões informadas e estratégicas.
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
export default Main;
