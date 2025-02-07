import React from 'react';
import { Box, Stack, Typography, Grid, Divider } from '@mui/material';
import { motion } from 'framer-motion';

import IconList from 'src/assets/images/svgs/icon-briefcase.svg';
import FeatureApp from 'src/assets/images/frontend-pages/homepage/feature-apps.png';
import IconChat from 'src/assets/images/svgs/icon-speech-bubble.svg';
import IconFav from 'src/assets/images/svgs/icon-favorites.svg';

const highlights = [
  {
    icon: IconList,
    title: "Cadastro de Imóveis Fácil",
    description: "Anuncie imóveis para venda ou aluguel de maneira simples e rápida.",
    bgColor: "warning.light",
  },
  {
    icon: FeatureApp,
    title: "Aplicativo Completo",
    description: "Gerencie seus anúncios e acompanhe os interessados pelo celular.",
    bgColor: "secondary.light",
    image: true,
  },
  {
    icon: IconChat,
    title: "Chat Direto com Clientes",
    description: "Converse em tempo real com compradores e inquilinos interessados.",
    bgColor: "success.light",
  },
  {
    icon: IconFav,
    title: "Favoritos e Alertas",
    description: "Salve imóveis e receba notificações de novas ofertas.",
    bgColor: "error.light",
  },
];

const Process = () => {
  return (
    <Box py={5}>
      <Grid container spacing={3} mt={3}>
        {highlights.map((item, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            {/* Animação de subida com opacidade */}
            <motion.div
              initial={{ opacity: 0, y: 50 }} // Começa invisível e mais abaixo
              animate={{ opacity: 1, y: 0 }} // Anima para posição normal
              transition={{ duration: 0.6, delay: index * 0.2 }} // Delay progressivo para cada item
            >
              <Box
                textAlign="center"
                mb={3}
                bgcolor={item.bgColor}
                borderRadius="24px"
                overflow="hidden"
              >
                <Box px="20px" py={item.image ? "26px" : "32px"}>
                  <Stack direction="column" spacing={2} textAlign="center">
                    {!item.image && (
                      <Box textAlign="center">
                        <img src={item.icon} alt="icon" width={40} height={40} />
                      </Box>
                    )}
                    <Typography variant="h6" fontWeight={700} px={1} lineHeight={1.4}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1">{item.description}</Typography>
                  </Stack>
                </Box>
                {item.image && (
                  <Box height="70px">
                    <img src={item.icon} alt="feature" width={250} height={70} />
                  </Box>
                )}
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Process;
