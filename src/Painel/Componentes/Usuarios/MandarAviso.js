/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Cancel, Block, Notifications, ManageAccounts } from "@mui/icons-material";
import {Dialog,DialogTitle,DialogContent,DialogActions,Typography,Slide,Box,IconButton,Select,MenuItem,Button,TextField,List,ListItem,ListItemIcon,ListItemText,
Divider,Grid,} from "@mui/material";
import React, { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AdminActions = ({ open, onClose, user }) => {
  const [selectedAction, setSelectedAction] = useState("notify"); // Default action: Notify
  const [selectedAlert, setSelectedAlert] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [suspensionReason, setSuspensionReason] = useState("");

  const predefinedAlerts = [
    "Seu perfil foi atualizado com sucesso.",
    "Uma nova funcionalidade está disponível.",
    "Sua conta será suspensa se não regularizar a situação.",
    "Parabéns! Você está entre os 10% mais ativos.",
    "Seu acesso foi temporariamente bloqueado.",
  ];

  const handleSendNotification = () => {
    const messageToSend = customMessage || selectedAlert;
    if (!messageToSend) {
      alert("Selecione ou escreva uma mensagem para enviar.");
      return;
    }
    console.log(`Notificação enviada para ${user.name}: ${messageToSend}`);
    onClose();
  };

  const handleSuspendAccount = () => {
    if (!suspensionReason) {
      alert("Por favor, insira um motivo para a suspensão.");
      return;
    }
    console.log(`Conta de ${user.name} suspensa por: ${suspensionReason}`);
    onClose();
  };

  const renderActionContent = () => {
    switch (selectedAction) {
      case "notify":
        return (
          <>
            <Typography variant="subtitle1" gutterBottom>
              Escolha uma mensagem ou escreva a sua:
            </Typography>
            <Select
              fullWidth
              value={selectedAlert}
              onChange={(e) => setSelectedAlert(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Selecione uma mensagem
              </MenuItem>
              {predefinedAlerts.map((alert, index) => (
                <MenuItem key={index} value={alert}>
                  {alert}
                </MenuItem>
              ))}
            </Select>
            <Typography variant="subtitle2" gutterBottom style={{ marginTop: "1rem" }}>
              Ou escreva sua própria mensagem:
            </Typography>
            <TextField
              fullWidth
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Escreva sua mensagem aqui..."
              multiline
              rows={3}
            />
          </>
        );
      case "suspend":
        return (
          <>
            <Typography variant="subtitle1" gutterBottom>
              Motivo para suspender a conta:
            </Typography>
            <TextField
              fullWidth
              value={suspensionReason}
              onChange={(e) => setSuspensionReason(e.target.value)}
              placeholder="Escreva o motivo aqui..."
              multiline
              rows={3}
            />
          </>
        );
      case "manage":
        return (
          <>
            <Typography variant="subtitle1" gutterBottom>
              Gerenciamento avançado em breve!
            </Typography>
          </>
        );
      default:
        return null;
    }
  };

  if (!user) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      TransitionComponent={Transition}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Typography variant="h5" component="span" style={{ flexGrow: 1 }}>
            Ações do Administrador
          </Typography>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <Cancel />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          {/* Sidebar Menu */}
          <Grid item xs={3}>
            <List component="nav">
              <ListItem
                button
                selected={selectedAction === "notify"}
                onClick={() => setSelectedAction("notify")}
              >
                <ListItemIcon>
                  <Notifications />
                </ListItemIcon>
                <ListItemText primary="Mandar Notificação" />
              </ListItem>
              <Divider />
              <ListItem
                button
                selected={selectedAction === "suspend"}
                onClick={() => setSelectedAction("suspend")}
              >
                <ListItemIcon>
                  <Block />
                </ListItemIcon>
                <ListItemText primary="Suspender Conta" />
              </ListItem>
              <Divider />
              <ListItem
                button
                selected={selectedAction === "manage"}
                onClick={() => setSelectedAction("manage")}
              >
                <ListItemIcon>
                  <ManageAccounts />
                </ListItemIcon>
                <ListItemText primary="Gerenciamento Avançado" />
              </ListItem>
            </List>
          </Grid>

          {/* Main Content */}
          <Grid item xs={9}>
            {renderActionContent()}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        {selectedAction === "notify" && (
          <Button onClick={handleSendNotification} color="primary" variant="contained">
            Enviar Notificação
          </Button>
        )}
        {selectedAction === "suspend" && (
          <Button onClick={handleSuspendAccount} color="primary" variant="contained">
            Suspender Conta
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AdminActions;
