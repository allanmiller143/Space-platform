import React, { useState, useContext } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ContractContext from '../../ContractContext/ContractContext';
import WaitingForOwnerStepDialog from './Componentes/Dialog';
import ChatContext from '../../../../../components/apps/chats/ChatContext/ChatContext';
import { openNewChat } from '../../../../../components/apps/chats/ChatService/Api';
import socket from '../../../../../Services/socket';
import { useNavigate } from "react-router";
import { toast } from 'sonner';
import FloatingMiniPlayer from '../../../../../components/apps/FloatingMiniPlayer/FloatingMiniPlayer';
import Spinner from '../../../../spinner/Spinner';
import ChatContent from '../../../../../components/apps/chats/ChatContent';
import { getData } from '../../../../../Services/Api';
import ContractDetails from './Componentes/ContractDetails';

const Step4 = () => {
  const { property } = useContext(ContractContext);
;

  return (
    <Box sx={{ mt: 6 }}>
        <ContractDetails/>
    </Box>
  );
};

export default Step4;
