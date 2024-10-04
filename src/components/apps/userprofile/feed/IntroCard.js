/* eslint-disable no-unused-vars */
import { Typography } from '@mui/material';
import ChildCard from 'src/components/shared/ChildCard';
const IntroCard = () => {

  const cuString = localStorage.getItem('currentUser');
  const currentUserls = cuString ? JSON.parse(cuString) : null;

  return ( 
    <>
      <ChildCard sx={{ mb: 3 }}>
        <Typography color="gray" fontWeight={600} variant="h6" mb={2}>
          Bio 
        </Typography>
        <Typography color="textSecondary" variant="subtitle2" mb={2}>
          {currentUserls.info.bio}
        </Typography>
      </ChildCard>
    </> 
  );
}


export default IntroCard;
