import React from 'react';
import { Stack, Typography } from '@mui/material';

import ChildCard from 'src/components/shared/ChildCard';
import { IconBriefcase, IconDeviceDesktop, IconMail, IconMapPin } from '@tabler/icons';

const IntroCard = () => (
  <>
    <ChildCard sx={{ mb: 3 }}>
      <Typography color="gray" fontWeight={600} variant="h6" mb={2}>
        Bio 
      </Typography>
      <Typography color="textSecondary" variant="subtitle2" mb={2}>
        Olá, eu sou Fernando Dias. Eu amo trabalhar com imóveis e ajudar pessoas a encontrarem o lar dos seus sonhos. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.
      </Typography>
    </ChildCard>
  </>
);

export default IntroCard;
