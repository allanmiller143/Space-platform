/* eslint-disable react/prop-types */
import { Box, Divider, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconMinus, IconPlus } from '@tabler/icons';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';

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

const Main = ( { property }) => {
  const [expanded, setExpanded] = useState(false);
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

  useEffect(() => {
    console.log(property);
  }, []);

  

  return (
    <Grid container spacing={{ xs: 3, lg: 8 }} mb = {3}>
      <Grid item xs={12} lg={6}>
        <PropertyCard property={property} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography
          variant="h5"
          sx={{
            fontSize: {
              lg: '40px',
              xs: '35px',
            },
            lineHeight: {
              lg: '40px',
              xs: '30px',
            },
          }}
          fontWeight="700"
          mt={5}
        >
          Vantagens de 
          <span style={{ color: '#763EBD' }}> Compartilhar </span>
          seu imóvel
        </Typography>
        <Typography variant="subtitle1" mt={2} mb={3} color={'primary'}>
          Compartilhe seu imóvel com mais pessoas e aumente a chance de venda.
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
                Mais visibilidade
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Aumente sua visibilidade e alcance mais clientes potenciais. Compartilhe seu imóvel com mais pessoas, aumentando a chance de venda.
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
                Agendamento de visitas
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Com seu imóvel compartilhado, o corretor pode agendar visitas online, aumentando a probabilidade de venda.
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
                 Maior chance de venda                   
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Com um de nossos corretores tomando conta dos eu imóvel, 
              </Typography>
            </AccordionDetails>
          </StyledAccordian>

        </Box>
      </Grid>
    </Grid>
  );
};
export default Main;
