// src/Dashboard.jsx
import { useState } from 'react';
import { Grid} from '@mui/material';
import { useTheme } from '@emotion/react';
import { styled } from "@mui/material/styles";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { IconMinus, IconPlus } from '@tabler/icons';
import FilteringTable from '../../../../components/apps/TabelaMeusIMoveis/imoveisTabela'
// Dados de exemplo para os gráficos

const Table = () => {
  const theme = useTheme();
  const [expanded2, setExpanded2] = useState(false);
  const handleChange2 = () => {
    setExpanded2(!expanded2);
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
    <Grid item xs={12}>
        <StyledAccordian expanded={expanded2} onChange={handleChange2}>
            <AccordionSummary
                expandIcon={expanded2 ? <IconMinus size="21" stroke="1.5" /> : <IconPlus size="21" stroke="1.5" />}
                aria-controls="panel2-content"
                id="panel2-header"
            >
                Todos os seus imóveis
            </AccordionSummary>
            <AccordionDetails>
                <FilteringTable/>            
            </AccordionDetails>
        </StyledAccordian>
    </Grid>
  );
};

export default Table;
