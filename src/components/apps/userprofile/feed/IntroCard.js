import  { useState, useEffect } from 'react';
import { Typography, Button, Box, TextField, IconButton } from '@mui/material';
import ChildCard from 'src/components/shared/ChildCard';
import EditIcon from '@mui/icons-material/Edit';

const IntroCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('Adicionar breve descrição...');

  useEffect(() => {
    const cuString = localStorage.getItem('currentUser');
    const currentUserls = cuString ? JSON.parse(cuString) : null;
    if (currentUserls?.info?.bio) {
      setBio(currentUserls.info.bio);
    }
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    // Aqui você pode adicionar lógica para salvar a bio no localStorage ou em um backend
  };

  return (
    <ChildCard sx={{ mb: 3, position: 'relative' }}>
      <IconButton 
        onClick={() => setIsEditing(true)} 
        size="small" 
        sx={{  float: 'right'}}
      >
        <EditIcon />
      </IconButton>
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
          <Button onClick={handleSave} color="primary" sx={{ ml: 1 }}>
            Salvar
          </Button>
        </Box>
      ) : (
        <Typography color="textSecondary" variant="subtitle2" mb={2}>
          {bio}
        </Typography>
      )}
    </ChildCard>
  );
};

export default IntroCard;
