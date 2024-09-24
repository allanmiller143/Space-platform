/* eslint-disable no-undef */
import { Grid, Typography, Button, Stack, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useState, useRef } from 'react';
import { CardContent } from '@mui/material';
import BlankCard from '../../../shared/BlankCard';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/system';
import Loading from '../../../Loading/Loading';
import { getData, putFormData } from '../../../../Services/Api'; // Certifique-se de que a função updateBio esteja definida na sua API
import { toast } from 'sonner';

const EditarFoto = () => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const cuString = localStorage.getItem('currentUser');
  const token = localStorage.getItem('token');
  const currentUserls = JSON.parse(cuString); // Parse para obter o objeto
  const fileInputRefSingle = useRef(null);

  const handleSingleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setPreviewImage(null);
  };

  const insertProfilePic = async (file) => {
    const formData = new FormData();
    formData.append('photo', file);
    let route = '';
    if (currentUserls.type === 'realtor') {
      route = 'realtors';
    } else if (currentUserls.type === 'realstate') {
      route = 'realstate';
    } else {
      route = 'owners';
    }
    try {
      setLoading(true);
      const response = await putFormData(`${route}/${currentUserls.email}`, formData, token);
      if (response.status === 200 || response.status === 201) {
        const userData = await getData(`${route}/${currentUserls.email}`);
        if (userData.status === 200) {
          const user = userData.userInfo;
          localStorage.setItem('currentUser', JSON.stringify(user));
          toast.success('Imagem inserida com sucesso');
        } else {
          toast.error(`Erro ao obter dados do usuário:\n ${userData.message}`);
        }
      } else {
        toast.error(`Erro ao inserir imagem:\n ${response.message}`);
      }
    } catch (error) {
      toast.error(`Erro ao inserir imagem:\n ${error.message}`);
    } finally {
      fileInputRefSingle.current.value = null;
      setLoading(false);
      handleCloseDialog(); // Fechar o dialog após o envio
    }
  };

  const handleSubmit = () => {
    const file = fileInputRefSingle.current.files[0];
    if (file) {
      insertProfilePic(file);
    }
  };





  return (
    <>
      <Grid item xs={12} lg={6}>
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={1}>
              Alterar Perfil
            </Typography>
            <Typography color="textSecondary" mb={3}>
              Altere sua foto de perfil aqui
            </Typography>
            <Box textAlign="center" display="flex" justifyContent="center">
              <Box width={'100%'}>
                <Avatar
                  src={currentUserls.profile?.url || '/images/default-avatar.png'} // Defina um avatar padrão
                  alt='Foto de usuario'
                  sx={{ width: 130, height: 130, margin: '0 auto' }}
                />
                <Stack direction="row" justifyContent="center" spacing={2} my={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    component="label"
                    size="large"
                  >
                    Selecionar foto
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={handleSingleFileInputChange}
                      style={{ display: 'none' }}
                      ref={fileInputRefSingle}
                    />
                  </Button>
                </Stack>
              </Box>
            </Box>
          </CardContent>
        </BlankCard>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        {loading && <Loading data={{ open: loading }} />}
        <DialogContent>
          {previewImage && <img src={previewImage} alt="Preview" style={{ width: '100%', height: 'auto' }} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditarFoto;
