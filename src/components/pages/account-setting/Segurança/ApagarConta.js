/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Avatar, Box,Divider, CardContent, Grid, IconButton, Typography, Tooltip, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { deleteData } from '../../../../Services/Api';
import BlankCard from '../../../shared/BlankCard';
import { Cancel } from '@mui/icons-material';


const ApagarConta = () => {
  const [open, setOpen] = useState(false);
  const [active,setActive] = useState(true);
  const [text,setText] = useState('');
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const token = localStorage.getItem('token');
  
  function handleClose () {
    setOpen(false)
  }


  async function handleDelete () {
    setLoading(true);
    try{
      const response = await deleteData(`${currentUser.type}/${currentUser.email}`,token);
      if(response.status === 200){
        toast.success('Conta apagada com sucesso');
        localStorage.clear();
        Navigate('/')
      }else{
        toast.error('ocorreu um erro ao tentar apagar a conta, por favor tente novamente mais tarde')
      }
    }catch(error){
      Navigate('/error');
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    if(text === 'Apagar'){
      setActive(false);
    }else{
      setActive(true);
    }
  }, [text])

  return (
    <>
        <Grid item xs={12} md={5}>
          <BlankCard>
            <CardContent>
              <Typography variant="h4" mb={2} color={'#FA896B'}> Zona de perigo </Typography>
              <Divider/>
              <Typography variant= 'body1' mt = {1}> 
                Para apagar sua conta, clique no botão abaixo. Lembre-se: ao apagar sua conta, todos os seus dados serão automaticamente removidos e você não poderá recuperá-los.            
              </Typography>
              <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }} mt={3}>
                <Button size="large" variant="text" color="error" onClick={()=>{ setOpen(true)}}>
                  Apagar conta
                </Button>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>

        <Dialog open={open} onClose={handleClose} fullWidth >
            <DialogTitle>
            <Box display="flex" alignItems="center">
                <Typography variant="h6" fontSize={'14px'} component="span" color={'error'} style={{ flexGrow: 1 }}>
                Apagar conta
                </Typography>
                <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
                <Cancel />
                </IconButton>
            </Box>
            </DialogTitle> 
            <Divider/>  
            <DialogContent>
            <Typography variant='h6' mb = {2}> Para apagar sua conta digite: Apagar </Typography>
                <TextField fullWidth variant="outlined" value={text} onChange={(e) => setText(e.target.value)}>
            </TextField>
            {
                !active ? 
                <Box mt = {1}>
                <Typography variant='h6' color={'error'} mb = {1}> Obs: </Typography>
                <Typography variant= 'body2'> 
                    Lembre-se: ao apagar sua conta, todos os seus dados serão automaticamente removidos e você não poderá recuperá-los.            
                    </Typography>
                </Box> : null
            }

            </DialogContent>
            <DialogActions> 
            <Button onClick={handleDelete} disabled = {active} > 
                Apagar
            </Button>
            </DialogActions>

        </Dialog>
    </>
  );
};

export default ApagarConta;
