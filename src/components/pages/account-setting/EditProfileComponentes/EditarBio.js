import { Grid, Typography, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { CardContent } from '@mui/material';
import BlankCard from '../../../shared/BlankCard';
import { Box } from '@mui/system';
import Loading from '../../../Loading/Loading';
import { getData, putFormData } from '../../../../Services/Api';
import { toast } from 'sonner';

const EditarBio = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState('');
  const cuString = localStorage.getItem('currentUser');
  const token = localStorage.getItem('token');
  const currentUserls = JSON.parse(cuString);

  // Set initial bio state when the component mounts
  useState(() => {
    setBio(currentUserls.info.bio || ''); // Set initial value for bio
  }, [currentUserls]);

  const handleBioChange = (event) => {
    setBio(event.target.value); 
  };

  const handleBioSubmit = async () => {
    const formData = new FormData();
    const formJson = {
      bio: bio
    };

    // Use JSON.stringify to convert formJson to a string
    formData.append('data', JSON.stringify(formJson));

    try {
      setLoading(true);
      const response = await putFormData(`${currentUserls.type}/${currentUserls.email}`, formData, token);
      if (response.status === 200 || response.status === 201) {
        const responseUserData = await getData(`find/${currentUserls.email}`);
        if (responseUserData.status === 200) {
          const user = responseUserData.userInfo;
          localStorage.setItem('currentUser', JSON.stringify(user));
          setBio(user.info.bio); 
          toast.success('Bio atualizada com sucesso');  // Corrected toast message
        } else {
          toast.error(`Erro ao obter dados do usuário:\n ${responseUserData.message}`);
        }
      }
    } catch (error) {
      toast.error(`Erro ao atualizar bio:\n ${error.message}`); // Corrected error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Grid item lg={8} xs={12} sm={12}>
        {loading && <Loading data={{ open: loading }} />}
        <BlankCard>
          <CardContent>
            <Typography variant="h5" mb={2}>
              Alterar Bio
            </Typography>
            <Typography color="textSecondary" mb={3}>
              Altere sua Bio do perfil aqui
            </Typography>
            <Box textAlign="center" display="flex" alignItems="center" flexDirection={'column'} justifyContent="center">
              <TextField
                fullWidth
                variant="outlined"
                label="Bio"
                value={bio}
                onChange={handleBioChange}
                placeholder="Escreva algo sobre você..."
                multiline
                sx={{ mb: 2 }}                 
                rows={5}
              />
              <Button variant="contained" color="primary" size="large" onClick={handleBioSubmit}>
                Atualizar Bio
              </Button>
            </Box>
          </CardContent>
        </BlankCard>
      </Grid>
    </>
  );
};

export default EditarBio;
