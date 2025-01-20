/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent, IconButton, Typography, Button } from '@mui/material';
import houseImage from 'src/assets/images/ilustracoes/house.png';
import { Box } from '@mui/system';
import { Cancel } from '@mui/icons-material';
import { getData } from '../../../../Services/Api';

const ConfimarCadastroDialog = ({ open, setOpenAdviceDialog }) => {
  const [isEmptyList, setIsEmptyList] = useState(false);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const token = localStorage.getItem('token');

  const handleClose = ()=> {
    setOpenAdviceDialog(false);
    navigate('/apps/imoveis/list');
  }

  const loadPreInfo = async () => {
    try {
      const response = await getData(`realtor/availability/${currentUser.email}`, token);
      if (response.status === 200 || response.status === 201) {
        if (!response.userInfo || response.userInfo.length === 0) {
          setIsEmptyList(true);
        }else{
          handleClose();
        }
      } else {
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    } 
  };

  const handleCloseDialog = async () => {
    await loadPreInfo();
  };

  const redirectToAgenda = () => {
    navigate('/apps/agenda'); // Redireciona para a rota de agenda
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleCloseDialog}
      PaperProps={{
        style: {
          borderRadius: '30px', // Bordas arredondadas
          padding: '20px', // Padding adicional
        },
      }}
    >
      {!isEmptyList ? (
        <>
          <DialogTitle>
            <Box display="flex" alignItems="center">
              <Typography variant="h4" component="span" style={{ flexGrow: 1 }}>
                Obrigado por registrar seu imóvel!
              </Typography>
              <IconButton edge="end" color="inherit" onClick={handleCloseDialog} aria-label="close">
                <Cancel />
              </IconButton>
            </Box>
          </DialogTitle>

          <DialogContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                mt: 2,
              }}
            >
              {/* Imagem da casa */}
              <Box
                component="img"
                src={houseImage}
                alt="Imagem da casa"
                sx={{
                  maxWidth: '130px',
                  height: 'auto',
                  mb: 3, // Margem inferior
                }}
              />

              {/* Texto de agradecimento */}
              <Typography variant="h5" color={'text.primary'}>
                Seu anúncio foi inserido com sucesso. Estamos revisando as informações e em breve, ele estará disponível.
              </Typography>
            </Box>
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle>
            <Box display="flex" alignItems="center">
              <Typography variant="h4" component="span" style={{ flexGrow: 1 }}>
                Atenção
              </Typography>
              <IconButton edge="end" color="inherit" onClick={handleCloseDialog} aria-label="close">
                <Cancel />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                mt: 2,
              }}
            >
              {/* Texto de aviso */}
              <Typography variant="h6" color={'text.primary'} sx={{ mb: 3 }}>
                Parece que você ainda não cadastrou os horários de disponibilidade. Por favor, faça isso agora.
              </Typography>

              {/* Botão para redirecionar */}
              <Button variant="contained" color="primary" onClick={redirectToAgenda}>
                Cadastrar Horários
              </Button>
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default ConfimarCadastroDialog;
