import { Grid, Typography, Button, Stack, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { CardContent } from '@mui/material';
import BlankCard from '../../../shared/BlankCard';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/system';
import Loading from '../../../Loading/Loading';
import { getData, putFormData } from '../../../../Services/Api';
import { toast } from 'sonner';

const EditarFoto = () => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(null); // Estado para a URL da imagem do perfil
  const cuString = localStorage.getItem('currentUser');
  const token = localStorage.getItem('token');
  const currentUserls = JSON.parse(cuString); // Parse para obter o objeto
  const fileInputRefSingle = useRef(null);

  // Atualizar o avatar do usuário a partir do localStorage na montagem do componente
  useEffect(() => {
    setProfileImageUrl(currentUserls.profile?.url || '/images/default-avatar.png');
  }, [currentUserls]);

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
    formData.append('profile', file);

    try {
      setLoading(true);
      const response = await putFormData(`${currentUserls.type}/${currentUserls.email}`, formData, token);
      if (response.status === 200 || response.status === 201) {
        const responseUserData = await getData(`find/${currentUserls.email}`);
        if (responseUserData.status === 200) {
          const user = responseUserData.userInfo;
          localStorage.setItem('currentUser', JSON.stringify(user));
          setProfileImageUrl(user.profile?.url); // Atualiza a URL da imagem de perfil
          toast.success('Imagem inserida com sucesso');
        } else {
          toast.error(`Erro ao obter dados do usuário:\n ${responseUserData.message}`);
        }
      }else{
        toast.error(console.log(response));
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
      <Grid item xs={12} lg={4}>
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
                  src={profileImageUrl} // Agora usando o estado para a imagem de perfil
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
