import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Skeleton, Button, MenuItem, Select, FormControl, InputLabel, CircularProgress } from '@mui/material';

// Dados sintéticos por período
const dataByMonth = [
  { month: 'Janeiro', value: 150 },
  { month: 'Fevereiro', value: 200 },
  { month: 'Março', value: 250 },
  { month: 'Abril', value: 300 },
  { month: 'Maio', value: 400 },
  { month: 'Junho', value: 350 },
  { month: 'Julho', value: 1500 },
  { month: 'Agosto', value: 450 },
  { month: 'Setembro', value: 300 },
  { month: 'Outubro', value: 250 },
  { month: 'Novembro', value: 200 },
  { month: 'Dezembro', value: 150 },
];

const dataByWeek = {
  'Janeiro': [
    { week: 'Semana 1', value: 50 },
    { week: 'Semana 2', value: 80 },
    { week: 'Semana 3', value: 120 },
    { week: 'Semana 4', value: 200 },
  ],
  'Fevereiro': [
    { week: 'Semana 1', value: 60 },
    { week: 'Semana 2', value: 90 },
    { week: 'Semana 3', value: 130 },
    { week: 'Semana 4', value: 210 },
  ],
  // Adicione mais dados para outros meses
};

const otherSetting = {
  height: 300,
  yAxis: [{ label: 'Total' }],
  grid: { horizontal: true },
};

const valueFormatter = (value) => `${value}`;

// Formata o nome dos meses para abreviações
const monthFormatter = (month) => {
  const monthMap = {
    Janeiro: 'Jan',
    Fevereiro: 'Fev',
    Março: 'Mar',
    Abril: 'Abr',
    Maio: 'Mai',
    Junho: 'Jun',
    Julho: 'Jul',
    Agosto: 'Ago',
    Setembro: 'Set',
    Outubro: 'Out',
    Novembro: 'Nov',
    Dezembro: 'Dez',
  };
  return monthMap[month] || month; // Retorna o valor original caso não seja um mês
};

export default function DashBoardSeenGraphic() {
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      if (selectedMonth) {
        setData(dataByWeek[selectedMonth] || []); // Exibe as semanas para o mês selecionado
      } else {
        setData(dataByMonth); // Exibe todos os meses do ano
      }
      setLoading(false);
    }, 1500); // Simula carregamento de 1.5s
    return () => clearTimeout(timer);
  }, [selectedMonth]);

  return (
    <Box
      sx={{
        padding: 2,
        border: '1px solid #ddd',
        borderRadius: 2,
        backgroundColor: 'white',
        boxShadow: 1,
      }}
    >
      <Typography variant="h5" fontWeight="bold" color="primary">
        Usuários cadastrados
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: selectedMonth ? 'space-between' : 'end', alignItems: 'center', width: '100%' }}>
        {selectedMonth && (
          <Button
            variant="outlined"
            sx={{ marginBottom: 2 }}
            onClick={() => setSelectedMonth(null)}
          >
            Voltar para o Ano
          </Button>
        )}
        <Box sx={{ marginBottom: 2, display: 'flex', justifySelf: 'end' }}>
          <FormControl sx={{ width: '220px' }}>
            <InputLabel id="select-month-label">Escolha o Mês</InputLabel>
            <Select
              labelId="select-month-label"
              value={selectedMonth || ''}
              onChange={(e) => setSelectedMonth(e.target.value)}
              label="Escolha o Mês"
            >
              {dataByMonth.map((monthData) => (
                <MenuItem key={monthData.month} value={monthData.month}>
                  {monthData.month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Gráfico ou Skeleton */}
      <div style={{ width: '100%', height: '300px' }}>
        {loading ? (
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <Skeleton variant="rectangular" width="100%" height="100%" />
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <CircularProgress mb={2} />
              <Typography variant="body2">
                Carregando...
              </Typography>
            </Box>
          </Box>
        ) : (
          <BarChart
            dataset={data}
            sx={{
              width: '100%',
              height: '100%',
              color: '#092f46',
              borderRadius: '10px',
            }}
            xAxis={[
              {
                scaleType: 'band',
                dataKey: selectedMonth ? 'week' : 'month', // Exibe mês ou semana conforme a seleção
                valueFormatter: (key) => (selectedMonth ? key : monthFormatter(key)), // Formata mês ou exibe semana
              },
            ]}
            series={[
              {
                dataKey: 'value',
                valueFormatter,
                color: '#763EBD',
                barSx: {
                  borderRadius: '10px 10px 0 0', // Bordas arredondadas no topo
                },
              },
            ]}
            {...otherSetting}
          />
        )}
      </div>
    </Box>
  );
}
