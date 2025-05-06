/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {Cancel,} from "@mui/icons-material";
import {Dialog,DialogTitle,DialogContent,Typography,Box,IconButton,Grid, Slide, DialogActions, Button, Divider, Avatar,} from "@mui/material";
import React from "react";
import { deleteData } from "../../../../Services/Api";
import { toast } from "sonner";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ApagarAnuncios = ({ open, onClose, anuncio, setAnuncios, anuncios }) => {
  
  const token = localStorage.getItem('token');  
  const [loading, setLoading] = React.useState(false);

  if(!anuncio){
    return null;
  }  

  const handleDelete = async () => {
    setLoading(true)
    try{
        const reponse = await deleteData(`announcement/${anuncio.id}`, token);
        console.log(reponse);
        if(reponse.status === 200){
            toast.success('Anuncio apagado com sucesso');
            setAnuncios(anuncios.filter((item) => item.id !== anuncio.id));         
        }else{
            toast.error('Infelizmente não foi possível apagar o anúncio nesse momento, por favor tente novamente mais tarde.');
        }
    }catch(error){
        toast.error('Infelizmente não foi possível apagar o anúncio nesse momento, por favor tente novamente mais tarde.');
    }finally{
        setLoading(false);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" maxHeight="500px" TransitionComponent={Transition}>
        <DialogTitle>
            <Box display="flex" alignItems="center">
            <Typography variant="h5" component="span" style={{ flexGrow: 1 }}>
                Apagar anúncio
            </Typography>
            <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
                <Cancel />
            </IconButton>
            </Box>
        </DialogTitle>
        <Divider/>

        <DialogContent>
            <Box display={'flex'} flexDirection={'column'}>
                <Avatar sx={{ width: '100%', height: 200, mb: 1, borderRadius: 1 }} src={anuncio.photoUrl} />
                <Typography variant="body2" mb={1} sx={{alignSelf: 'end'}}>{anuncio.siteUrl}</Typography>
                <Divider/>
            </Box>
            <Typography variant ="body1" pt ={2} >
                Tem certeza de que quer apagar o anúncio?
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={handleDelete} color="error" disabled={loading} > { loading ? 'Apagando...' : 'Apagar'}</Button>
        </DialogActions>

    </Dialog>
  );
};

export default ApagarAnuncios;

