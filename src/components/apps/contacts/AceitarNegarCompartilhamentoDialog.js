/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {Cancel} from "@mui/icons-material";
import {Dialog,DialogTitle,DialogContent,DialogActions,Typography,Button,Box,IconButton,TextField,MenuItem, Slide} from "@mui/material";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import ContactsContext from "../../../views/apps/contacts/ContactsContext/ContactsContext";
import { postData } from "../../../Services/Api";
import socket from "../../../Services/socket";
import { seeSharedNotification } from "../../../Services/Utils/Notifications";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AceitarNegarCompartilhamentoDialog = ({ open, onClose }) => {
  const token = localStorage.getItem("token");
  const [motivo, setMotivo] = useState("");
  const [loading, setLoading] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { list, setList, active, setActive, accepted, acticveList, setActiveList } = useContext(ContactsContext);

  const motivosNegacao = [
    "Imagens inadequadas",
    "Endereço inválido",
    "Descrição inapropriada",
    "Imóvel duplicado",
    "Informações insuficientes",
  ];

  const sendNotification = (string) => {
    const data = {
      'sender': currentUser.email,
      'receiver': active.seller.email,
      'title': string,
      'type': 'share_response',
    };
    socket.emit('send_notification', data);
};


  const handleConfirmar = async () => {
    if (!accepted && !motivo) {
      toast.error("Por favor, informe o motivo da recusa.");
      return;
    }

    setLoading(true);

    try {
      if (accepted) {
        await onConfirm();
      } else {
        await onNegar();
      }
      onClose(); // Fecha o dialog após sucesso
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          accepted
            ? "Ocorreu um erro ao aceitar o compartilhamento."
            : "Ocorreu um erro ao negar o compartilhamento."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  async function onConfirm() {
    const response = await postData(`properties/share/confirm/${active.id}`, {}, token);
    if(response.status === 200 || response.status === 201){
      setList(list.filter((item) => item.id !== active.id));
      setActiveList(list.filter((item) => item.id !== active.id));
      sendNotification('Compartilhamento aceito');
      toast.success("Imóvel aceito com sucesso!");
      setActive(null);

    }else{
      toast.error("Ocorreu um erro ao aceitar o compartilhamento.");
    }
  }

  async function onNegar() {
    const response = await postData(
      `properties/share/negate/${active.id}`,
      { reason: motivo },
      token
    );

    if(response.status === 200 || response.status === 201){
      setList(list.filter((item) => item.id !== active.id));
      setActiveList(list.filter((item) => item.id !== active.id));
      sendNotification('Compartilhamento negado');
      setActive(null);

      toast.success("Imóvel negado com sucesso!");
    }else{
      toast.error("Ocorreu um erro ao negar o compartilhamento.");
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" TransitionComponent={Transition}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Typography variant="h5" component="span" style={{ flexGrow: 1 }}>
            {accepted ? "Aceitar Compartilhamento" : "Motivo da Recusa"}
          </Typography>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <Cancel />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {accepted ? (
          <Typography>
            Tem certeza de que deseja aceitar o imóvel? Ele ficará sob seus cuidados para negociação e afins.
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
        <Button variant="outlined" color="secondary" onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={handleConfirmar} disabled={loading}>
          {accepted
            ? loading
              ? "Publicando..."
              : "Aceitar Imóvel"
            : loading
            ? "Recusando..."
            : "Confirmar Recusa"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AceitarNegarCompartilhamentoDialog;
