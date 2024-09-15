import React from 'react';
import { Stack, Typography } from '@mui/material';

import ChildCard from 'src/components/shared/ChildCard';
import { IconBriefcase, IconDeviceDesktop, IconMail, IconMapPin } from '@tabler/icons';

const IntroCard = () => (
  <>
    <ChildCard sx={{ mt: 3, position: 'relative'}}>
      <Stack direction="row" marginTop={3} gap={2} alignItems="center" mb={3}>
        <IconBriefcase size="21" />
        <Typography variant="h6">Corretor de Imóveis Autônomo</Typography>
      </Stack>
      <Stack direction="row" gap={2} alignItems="center" mb={3}>
        <IconMail size="21" />
        <Typography variant="h6">fernandodias@email.com</Typography>
      </Stack>
      <Stack direction="row" gap={2} alignItems="center" mb={3}>
        <IconDeviceDesktop size="21" />
        <Typography variant="h6">www.fernandodias.com.br</Typography>
      </Stack>
      <Stack direction="row" gap={2} alignItems="center" mb={1}>
        <IconMapPin size="21" />
        <Typography variant="h6">São Paulo, Brasil - 01000-000</Typography>
      </Stack>
    </ChildCard>
  </>
);

export default IntroCard;
