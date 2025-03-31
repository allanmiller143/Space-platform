import React, { useState, useContext } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ContractContext from '../../ContractContext/ContractContext';
import ChatContext from '../../../../../components/apps/chats/ChatContext/ChatContext';
import { openNewChat } from '../../../../../components/apps/chats/ChatService/Api';
import socket from '../../../../../Services/socket';
import { useNavigate } from "react-router";
import { toast } from 'sonner';
import FloatingMiniPlayer from '../../../../../components/apps/FloatingMiniPlayer/FloatingMiniPlayer';
import Spinner from '../../../../spinner/Spinner';
import ChatContent from '../../../../../components/apps/chats/ChatContent';
import { getData } from '../../../../../Services/Api';

const WaitingForOwnerStep = () => {
  const { property } = useContext(ContractContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [loadPlayer, setLoadPlayer] = useState(false);
  const { setFilteredChats, setUserChats,selectedUser,setActiveChat,setSelectedUser,setMessages } = useContext(ChatContext);
  const [isPlayerOpen, setPlayerOpen] = useState(false);
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString); // Parse para obter o objeto
  const navigate = useNavigate();
  const token = localStorage.getItem('token');


    const setActiveChatFunction = async () => {
        if (currentUserls && !selectedUser  ) {
          setLoadPlayer(true)
          setPlayerOpen(true);
          setSelectedUser({});
          setMessages([]);
          try {
            await openNewChat(socket, 'teste3@gmail.com');
          } catch (err) {
            navigate('/error');
          }
      
          try {
            const response = await getData('chat', token);
            if (response.status === 200 || response.status === 201) {
              setUserChats(response.userInfo);
              setFilteredChats(response.userInfo);  // Iniciar com todos os chats disponíveis
              if(response.userInfo.length > 0){
                const selectedChat = response.userInfo.find(chat => chat.user1.email === 'teste3@gmail.com' || chat.user2.email === 'teste3@gmail.com');
                const user = selectedChat.user1.email === currentUserls.email ? selectedChat.user2 : selectedChat.user1;
                setActiveChat(selectedChat.id);
                setSelectedUser(user);                
              }else{
                console.log('Nenhum chat disponível');
                navigate('/error');
              }
            } else {
                console.log(response);

              navigate('/error');
            }
          } catch (e) {
            console.log(e);
            navigate('/error');
          }finally{
            setLoadPlayer(false);
          }    
        }else if((currentUserls && selectedUser)){
          setPlayerOpen(true);
        } 
        else {
          navigate('/auth/login');
          toast.success('Faça um cadastro para enviar uma mensagem');
        }
    };









  return (
    <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h6" color="primary">
            O dono do imóvel recebeu sua proposta e está analisando.
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
            Aguarde a resposta. Enquanto isso, você pode mandar mensagens para o dono do imóvel.
        </Typography>

        {/* Botões para ações */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
            {/* <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
            Ver Contrato
            </Button> */}
            <Button 
                variant="outlined" 
                onClick={setActiveChatFunction} 
                sx={{ display: { xs: 'none', md: 'flex' } }}  // Exibe apenas em telas maiores
            >
                Entre em contato
            </Button>
        </Box>
        {isPlayerOpen && (
            <FloatingMiniPlayer
                content={
                    loadPlayer ? <Spinner height="100%" /> : <ChatContent socket={socket} />
                }
                onClose={() => setPlayerOpen(false)}
            />
        )}

    </Box>
  );
};

export default WaitingForOwnerStep;
