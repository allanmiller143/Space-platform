/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {Cancel} from "@mui/icons-material";
import {Dialog,DialogTitle,DialogContent,DialogActions,Typography,Button,Box,IconButton,TextField,MenuItem, Slide} from "@mui/material";
import React, { useState } from "react";
import { toast } from "sonner";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AceitarNegarImovelDialog = ({ open, onClose, imovel, accepted, imoveis, setImoveis,onCloseFist }) => {
    const [motivo, setMotivo] = useState("");
    const [loading, setLoading] = useState(false);
  
    const motivosNegacao = [
      "Imagens inadequadas",
      "Endereço inválido",
      "Descrição inapropriada",
      "Imóvel duplicado",
      "Informações insuficientes",
    ];
  
    if (!imovel) return null;
  
    const handleConfirmar = () => {
        if (!accepted && !motivo) {
          toast.error("Por favor, informe o motivo da recusa.");
          return;
        }
    
        // Simula o tempo de espera
        setLoading(true);
        setTimeout(() => {
          // Remove o imóvel da lista pelo ID
          setImoveis((prevImoveis) => prevImoveis.filter((item) => item.id !== imovel.id));
    
          // Feedback para o usuário
          toast.success(accepted ? "Imóvel publicado com sucesso!" : "Imóvel recusado com sucesso!");
    
          // Fecha o diálogo e encerra o carregamento
          setLoading(false);
          onClose();
          onCloseFist();
        }, 2000); // Simula 2 segundos de espera
      };
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" TransitionComponent={Transition}>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Typography variant="h5" component="span" style={{ flexGrow: 1 }}>
              {accepted ? "Confirmar Publicação" : "Motivo da Recusa"}
            </Typography>
            <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
              <Cancel />
            </IconButton>
          </Box>
        </DialogTitle>
  
        <DialogContent>
          {accepted ? (
            <Typography>
              Tem certeza de que deseja publicar o imóvel? Ele ficará visível para todos os usuários.
            </Typography>
          ) : (
            <>
              <Typography>
                Por favor, informe o motivo da recusa do imóvel. Você pode selecionar uma opção abaixo ou escrever
                um motivo personalizado.
              </Typography>
              <TextField
                select
                label="Motivo da Recusa"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                fullWidth
                margin="normal"
              >
                {motivosNegacao.map((opcao) => (
                  <MenuItem key={opcao} value={opcao}>
                    {opcao}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Motivo Personalizado"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={3}
              />
            </>
          )}
        </DialogContent>
  
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={handleConfirmar} disabled={loading}>
            {accepted ? (loading ? "Publicando..." : "Publicar Imóvel") : ( loading ? "Recusando..." : "Confirmar Recusa")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default AceitarNegarImovelDialog;