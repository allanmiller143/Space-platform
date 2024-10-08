/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Typography } from '@mui/material';
import { formatDistanceToNowStrict } from 'date-fns';
import { ptBR } from 'date-fns/locale';  // Importa o locale para português

const TimeText = ({ name, createdAt }) => {


  return (
    <Typography variant="body2" color="grey.400" mb={1}>
        {name},{' '}
        {formatDistanceToNowStrict(new Date(createdAt), {
            addSuffix: false,
            locale: ptBR,  // Define o locale para português
        })}{' '}
        atrás
    </Typography>
  );
};

export default TimeText;
