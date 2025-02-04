import React, { useEffect, useState } from 'react';
import { Avatar, Box,Divider, CardContent, Grid, IconButton, Typography, Tooltip, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import BlankCard from '../../shared/BlankCard';
import { Cancel, SetMealTwoTone } from '@mui/icons-material';
import { toast } from 'sonner';
import { deleteData } from '../../../Services/Api';
import { useNavigate } from 'react-router-dom';
import TrocarSenha from './Segurança/TrocarSenha';
import ApagarConta from './Segurança/ApagarConta';


const NotificationTab = () => {
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
      <Grid container spacing={3} justifyContent="center">
        <TrocarSenha/>
        <ApagarConta/>
        

      </Grid>
    </>
  );
};

export default NotificationTab;
