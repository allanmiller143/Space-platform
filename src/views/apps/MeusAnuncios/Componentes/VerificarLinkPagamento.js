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

const VerificarLinkPagamento = ({ open, onClose, anuncio, setAnuncios, anuncios }) => {
  
  if(!anuncio){
    return null;
  }  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" maxHeight="500px" TransitionComponent={Transition}>
        <DialogTitle>
            <Box display="flex" alignItems="center">
            <Typography variant="h5" component="span" style={{ flexGrow: 1 }}>
               Informação
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
                O link do para pagamento do anuncio foi mandado para o seu email. 
            </Typography>
        </DialogContent>

    </Dialog>
  );
};

export default VerificarLinkPagamento;

