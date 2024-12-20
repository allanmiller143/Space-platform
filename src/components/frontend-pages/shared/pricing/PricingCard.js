import React from 'react';
import { Box, Grid, Typography, Chip, CardContent, Divider, Stack, Button } from '@mui/material';
import BlankCard from '../../../shared/BlankCard';

import IconCheck from 'src/assets/images/frontend-pages/icons/icon-check.svg';

const Planos = [
  {
    id: 1,
    tipo: 'GRÁTIS',
    isPopular: false,
    descricao: 'Ideal para quem está começando no mercado imobiliário.',
    preco: '0',
    recursos: [
      'Anúncios básicos de imóveis',
      'Busca simples de propriedades',
      'Agendamento de visitas manual',
      'Perfil básico de corretor',
      'Suporte por e-mail'
    ]
  },
  {
    id: 2,
    tipo: 'PLANO CORRETOR',
    isPopular: true,
    descricao: 'Perfeito para corretores autônomos que buscam eficiência.',
    preco: '99',
    recursos: [
      'Todos os recursos do plano GRÁTIS',
      'Gestão avançada de leads',
      'Agendamento automático de visitas',
      'Análise de mercado local',
      'Criação de anúncios premium',
      'Suporte prioritário'
    ]
  },
  {
    id: 3,
    tipo: 'PLANO IMOBILIÁRIA',
    isPopular: false,
    descricao: 'Ideal para imobiliárias de pequeno e médio porte.',
    preco: '299',
    recursos: [
      'Todos os recursos do PLANO CORRETOR',
      'Gerenciamento de portfólio de imóveis',
      'Automação de tarefas administrativas',
      'Relatórios de desempenho da imobiliária',
      'Integração com sistemas de CRM',
      'Treinamento personalizado'
    ]
  },
  {
    id: 4,
    tipo: 'PLANO PRO',
    isPopular: false,
    descricao: 'Solução completa para grandes imobiliárias e incorporadoras.',
    preco: '599',
    recursos: [
      'Todos os recursos do PLANO IMOBILIÁRIA',
      'API para integrações personalizadas',
      'Análise avançada de dados do mercado',
      'Suporte 24/7',
      'Consultoria estratégica mensal',
      'Acesso antecipado a novos recursos'
    ]
  },
];

const PricingCard = () => {
  return (
    <>
      <Grid container spacing={3}>
        {Planos.map((plano, i) => (
          <Grid item xs={12} lg={3} sm={6} key={i}>
            <BlankCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ p: '32px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="h4" fontSize="20px" fontWeight={600}>
                    {plano.tipo}
                  </Typography>
                  {plano.isPopular ? (
                    <Chip
                      label="Popular"
                      size="small"
                      sx={{
                        ml: '6px',
                        borderRadius: '8px',
                        color: 'primary.main',
                        backgroundColor: 'rgba(93, 135, 255, 0.15)',
                      }}
                    />
                  ) : null}
                </Box>

                <Typography fontSize="13px" mb={4}>
                  {plano.descricao}
                </Typography>
                <Divider />
                <Stack mt={4} direction="row" gap="8px" alignItems="end">
                  <Typography variant="h4" fontSize="40px" fontWeight={700}>
                    R${plano.preco}
                  </Typography>
                  <Typography variant="body2" fontSize="14px">
                    / mês
                  </Typography>
                </Stack>
                <Stack my={4} gap="12px" sx={{ flexGrow: 1 }}>
                  {plano.recursos.map((recurso, index) => (
                    <Box key={index} display="flex" alignItems="center" gap="8px">
                      <img src={IconCheck} alt="check" width={20} height={20} />
                      <Typography fontSize="14px" fontWeight={500}>
                        {recurso}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
                <Button fullWidth variant="contained" size="large">
                  Assinar Agora
                </Button>
              </CardContent>
            </BlankCard>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PricingCard;
