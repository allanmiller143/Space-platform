import { Grid, Typography, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { CardContent } from '@mui/material';
import BlankCard from '../../../shared/BlankCard';
import { Box } from '@mui/system';
import Loading from '../../../Loading/Loading';
import { getData, putData } from '../../../../Services/Api'; // Ensure you have the updateBio function defined in your API
import { toast } from 'sonner';

const EditarBio = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState('');
  const cuString = localStorage.getItem('currentUser');
  const token = localStorage.getItem('token');
  const currentUserls = JSON.parse(cuString); // Parse to obtain the object

  // Set initial bio state when the component mounts
  useState(() => {
    setBio(currentUserls.info.bio || ''); // Set initial value for bio
  }, [currentUserls]);

  const handleBioChange = (event) => {
    setBio(event.target.value); 
  };

  const handleBioSubmit = async () => {
    try {
      setLoading(true);
      const response = await putData(currentUserls.email, { bio }, token); // Assuming you have this function in your API
      if (response.status === 200) {
        toast.success('Bio atualizada com sucesso');
        const userData = await getData(`/${currentUserls.email}`);
        if (userData.status === 200) {
          const user = userData.userInfo;
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      } else {
        toast.error(`Erro ao atualizar bio:\n ${response.message}`);
      }
    } catch (error) {
      toast.error(`Erro ao atualizar bio:\n ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Grid item lg={6} xs={12} sm={12}>
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
