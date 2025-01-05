/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import PageContainer from '../../../components/container/PageContainer';
import { Button, Typography, Box } from '@mui/material';
import petError from './PetError.png'; // Importando a imagem da mesma pasta

const CatchError = ({ socket }) => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleRetry = () => {
    window.history.back(); // Volta uma página no histórico de navegação
  };

  return (
    <PageContainer title="Estamos com problemas no momento" description="">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh',
          textAlign: 'center',
          padding: 3,
        }}
      >
        <Typography variant="h2" gutterBottom>
          Algo deu errado! 😔
        </Typography>

        <img
          src={petError}
          alt="Mascote triste indicando erro"
          style={{
            width: '250px', // Ajuste o tamanho da imagem conforme necessário
            height: 'auto',
            marginBottom: '16px',
          }}
        />
        <Typography variant="h6" gutterBottom>
          Pode ser um problema de conexão ou um erro desconhecido.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRetry}
          sx={{
            marginTop: 2,
            paddingX: 4,
            paddingY: 1,
          }}
        >
          Voltar
        </Button>
      </Box>
    </PageContainer>
  );
};

export default CatchError;
