/* eslint-disable react/prop-types */
import {Box, Button, Typography, Dialog, DialogActions, DialogContent,DialogTitle, IconButton, Divider} from '@mui/material';
import { Cancel, Description } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { postFormData } from '../../../../Services/Api';

const ConfirmationDialog = ({ open, onClose, form, setForm, setAnuncios,setTouched,setSubmitted }) => {

  const token = localStorage.getItem('token');

  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    console.log(form);
  },[])

  const handleSave = async () => {
    setLoading(true);
    setLoading(true);
    const formData = new FormData();

  
    const data = {
      pending: form.adm ? false : true,
      announcerName: form.name,
      announcerEmail: form.email,
      announcerCpf: form.cpf,
      siteUrl: form.link,
      type: form.type,
      description: `Olá, ${form.name}, você está prestes a adquirir um pacote de anúncios da Space Imóveis, de valor de R$ ${form.duration}, com validade de ${form.duration} dias.`,
      ...(form.adm === false && { transactionAmount: form.duration }),
      transactionAmount: form.duration,
      duration : form.duration
    };
    
    formData.append('photo', form.image);
    formData.append('data', JSON.stringify(data));

    try{
      const response = await postFormData('announcement', formData, token,);
      if(response.status === 200 || response.status === 201){
        toast.success('Anuncio enviado com sucesso');
        
        setForm(prev => ({ ...prev,  
          link: '',
          image: '',
          duration: '',
          type: 'big',
          transactionAmount: ''
        } ));
        setAnuncios([]);
        setTouched({});
        setSubmitted(false);
      }else{
        console.log(response);
        toast.error('Anuncio não pode ser inserido');
      }
    }catch(error){
      toast.error('deu ruim no catch');

    }finally{
      setLoading(false);
      onClose();
    }

  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      {/* Cabeçalho do modal */}
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Inserir Anúncio
          </Typography>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <Cancel />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Assim que você clicar em continuar, o seu anúncio será enviado para a equipe da space imovéis e entrará num processo de aprovação.
        </Typography>
      </DialogContent>
      {/* Botões de ação */}
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancelar</Button>
        <Button onClick={handleSave} color="primary" variant="contained" disabled={loading}> {loading ? 'Carregando...' : 'Continuar'} </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
