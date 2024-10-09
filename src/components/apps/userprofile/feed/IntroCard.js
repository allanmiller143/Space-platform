/* eslint-disable react/prop-types */
import  { useState, } from 'react';
import { Typography, Button, Box, TextField, IconButton } from '@mui/material';
import ChildCard from 'src/components/shared/ChildCard';
import EditIcon from '@mui/icons-material/Edit';
import Loading from '../../../Loading/Loading';
import { toast } from 'sonner';
import { getData, putFormData } from '../../../../Services/Api';

const IntroCard = ({userData}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState( userData.info.bio || 'Adicionar breve descrição...');
  const [loading, setLoading] = useState(false);
  const cuString = localStorage.getItem('currentUser');
  const token = localStorage.getItem('token');
  const currentUserls = JSON.parse(cuString);



  const handleBioSubmit = async () => {
    setIsEditing(false);
    const formData = new FormData();
    const formJson = {
      bio: bio
    };

    // Use JSON.stringify to convert formJson to a string
    formData.append('data', JSON.stringify(formJson));

    try {
      setLoading(true);
      const response = await putFormData(`${userData.type}/${userData.email}`, formData, token);
      if (response.status === 200 || response.status === 201) {
        const responseUserData = await getData(`find/${userData.email}`);
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
    <Box position={'relative'} >
      {loading && <Loading data={{ open: loading, absolute: true }} />}
      <ChildCard sx={{ mb: 3, position: 'relative' }} position="relative" >
        {
          currentUserls.email === userData.email ?   
          <IconButton 
            onClick={() => setIsEditing(true)} 
            size="small" 
            sx={{  float: 'right'}}
          >
            <EditIcon />
          </IconButton> : null
        }
      
        <Typography color="gray" fontWeight={600} variant="h6" mb={2}>
          Bio
        </Typography>
        {isEditing ? (
          <Box>
            <TextField
              fullWidth
              multiline
              minRows={3}
              variant="outlined"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button onClick={() => setIsEditing(false)}>Cancelar</Button>
            <Button onClick={handleBioSubmit} color="primary" sx={{ ml: 1 }}>
              Salvar
            </Button>
          </Box>
        ) : (
          <Typography color="textSecondary" variant="subtitle2" mb={2}>
            {bio}
          </Typography>
        )}
      </ChildCard>
    </Box>
  );
};

export default IntroCard;
