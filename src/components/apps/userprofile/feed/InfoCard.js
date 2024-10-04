/* eslint-disable no-unused-vars */
import { Stack, Typography } from '@mui/material';
import ChildCard from 'src/components/shared/ChildCard';
import { IconBriefcase, IconDeviceDesktop, IconMail, IconMapPin } from '@tabler/icons';

const InfoCard = () => {
  const token = localStorage.getItem('token') || '';
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = cuString ? JSON.parse(cuString) : null;

  const convertType = () => {
    if (currentUserls.type === 'realtor') {
      return 'Corretor';
    } else if (currentUserls.type === 'realstate') {
      return 'Imobiliária';
    } else {
      return 'Vemdedor';
    }
  };

  return (
    <>
      <ChildCard sx={{ mt: 3, position: 'relative'}}>
      <Typography color="gray" fontWeight={600} variant="h6" mb={2}>
          Informações gerais 
        </Typography>
        <Stack direction="row" marginTop={3} gap={2} alignItems="center" mb={3}>
          <IconBriefcase size="21" />
          <Typography> {convertType()} de Imóveis</Typography>
        </Stack>
        <Stack direction="row" gap={2} alignItems="center" mb={3}>
          <IconMail size="21" />
          <Typography >{currentUserls.info.email}</Typography>
        </Stack>
        <Stack direction="row" gap={2} alignItems="center" mb={1}>
          <IconMapPin size="21" />
          <Typography> {currentUserls.address.city} - {currentUserls.address.state} - Brasil</Typography>
        </Stack>
      </ChildCard>
    </> 
  );
}



export default InfoCard;
