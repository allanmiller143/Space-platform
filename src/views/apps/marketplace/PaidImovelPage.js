/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getData, postData } from "../../../Services/Api";
import { openNewChat } from "../../../components/apps/chats/ChatService/Api";
import { toast } from "sonner";
import Spinner from "../../spinner/Spinner";
import PageContainer from 'src/components/container/PageContainer';
import Header from '../../../layouts/full/horizontal/header/Header';
import { Button, Grid, Box } from "@mui/material";
import FloatingMiniPlayer from "../../../components/apps/FloatingMiniPlayer/FloatingMiniPlayer";
import ChatContent from "../../../components/apps/chats/ChatContent";
import PropertyGallery from "./Componentes/Gallery";
import Agendar from "../../../Services/GoogleCalendar/Agendar";
import DadosGerais from "./Componentes/DadosGerais";
import AdvertiserCard from "./Componentes/AdvertiserCard";
import Map from "./Componentes/Map";
import ChatContext from '../../../components/apps/chats/ChatContext/ChatContext';
import Gallery from './Componentes/Gallery'
import CarrosselHome from "../../../components/frontend-pages/homepage/carrossel/CarrosselHome";
import NotificationContext from "../../../Services/Notification/NotificationContext/NotificationContext";
import socket from "../../../Services/socket";

const PaidImovelPage = () => {
    const [loading, setLoading] = useState(false);
    const [property, setProperty] = useState(null);
    const [advertiser, setAdvertiser] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const cuString = localStorage.getItem('currentUser');
    const currentUserls = JSON.parse(cuString); // Parse para obter o objeto
    const token = localStorage.getItem('token');
    const { setFilteredChats, setUserChats,setActiveChat,setSelectedUser, setMessages } = useContext(ChatContext);

    async function loadPropertyData() {
        setLoading(true);
        try {
            const response = await getData(`properties/${id}`);
            if (response.status === 200 || response.status === 201) {
                setProperty(response.userInfo);
                setAdvertiser(response.userInfo.seller);
            } else {
                navigate('/error');
            }
        } catch (error) {
          navigate('/error');
        } finally {
            setLoading(false);
        }
    }

    const click = async () => {
      try{
        const clickResponse = await postData(`properties/times-seen/${id}`,{});
        if (clickResponse.status === 200 || clickResponse.status === 201) {
          console.log(clickResponse);
        } else {
          navigate('/error');
        }
      }catch(e){
        navigate('/error');
      }
    };

    const seePhone = async () => {
        if (currentUserls) {
          setLoading(true);
          setSelectedUser(null);
          setMessages([]);
          try {
            await openNewChat(socket, advertiser.email);
          } catch (err) {
            console.log('Error loading messages:', err);
          }
      
          try {
            const response = await getData('chat', token);
            if (response.status === 200 || response.status === 201) {
              setUserChats(response.userInfo);
              setFilteredChats(response.userInfo);  // Iniciar com todos os chats disponíveis
              if(response.userInfo.length > 0){
                const selectedChat = response.userInfo.find(chat => chat.user1.email === advertiser.email || chat.user2.email === advertiser.email);
                const user = selectedChat.user1.email === currentUserls.email ? selectedChat.user2 : selectedChat.user1;
                console.log(user);
                setActiveChat(selectedChat.id);
                setSelectedUser(user);
                navigate(`/apps/chats`);
                
              }else{
                navigate('/error');
              }
            } else {
              navigate('/error');
            }
          } catch (e) {
            navigate('/error');
          }finally{
            setLoading(false);
          }    
        } else {
          navigate('/auth/login');
          toast.success('Faça um cadastro para enviar uma mensagem');
        }
    };

    const setActiveChatFunction = async () => {
        if (currentUserls) {
          setLoadPlayer(true);
          setPlayerOpen(true)
          setSelectedUser(null);
          setMessages([]);
          try {
            await openNewChat(socket, advertiser.email);
          } catch (err) {
            navigate('/error');
          }
      
          try {
            const response = await getData('chat', token);
            if (response.status === 200 || response.status === 201) {
              setUserChats(response.userInfo);
              setFilteredChats(response.userInfo);  // Iniciar com todos os chats disponíveis
              if(response.userInfo.length > 0){
                const selectedChat = response.userInfo.find(chat => chat.user1.email === advertiser.email || chat.user2.email === advertiser.email);
                const user = selectedChat.user1.email === currentUserls.email ? selectedChat.user2 : selectedChat.user1;
                console.log(user);
                setActiveChat(selectedChat.id);
                setSelectedUser(user);                
              }else{
                navigate('/error');
              }
            } else {
              navigate('/error');
            }
          } catch (e) {
            navigate('/error');
          }finally{
            setLoadPlayer(false);
          }    
        } else {
          navigate('/auth/login');
          toast.success('Faça um cadastro para enviar uma mensagem');
        }
    };
    
    useEffect(() => {
        loadPropertyData();
        click();
    }, []);

    const [isPlayerOpen, setPlayerOpen] = useState(false);
    const [loadPlayer, setLoadPlayer] = useState(false);

    if (loading) {
        return <Spinner />;
    }

    return (
      <PageContainer title="Imóveis para venda ou locação" description="Space iMóveis">
          <Header />
          <Box maxWidth="lg" margin='0 auto' py = {5} px = {2} >

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Grid container sx={{ height: '100%' }}>
                  <Grid
                      item
                      xs={12}
                  >
                      <Gallery property={property} advertiser={advertiser} />
  
                      <Box sx={{ display: 'flex' , alignItems : { md : 'center', xs : 'start'} , flexDirection: {md: 'row', xs : 'column'},justifyContent : "space-between", gap: 3 }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Agendar advertiser={advertiser} property={property} />
                          
                          <div>
                            <Button 
                              variant="outlined" 
                              color="primary" 
                              onClick={seePhone} 
                              sx={{ display: { xs: 'flex', md: 'none' } }}  // Exibe apenas em telas menores
                            >
                              Entre em contato
                            </Button>
                          </div>
                          {/* Botão para desktops */}
                          <div>
                            <Button 
                              variant="outlined" 
                              onClick={setActiveChatFunction} 
                              sx={{ display: { xs: 'none', md: 'flex' } }}  // Exibe apenas em telas maiores
                            >
                              Entre em contato
                          </Button>
                          </div>
                        </Box>
                        <AdvertiserCard property={property} advertiser={advertiser} />
                      </Box>
                      <DadosGerais property={property} advertiser={advertiser} />
                  </Grid>
  
              </Grid>
          </Box>
          </Box>
          <CarrosselHome/>
          
  
          {isPlayerOpen && (
              <FloatingMiniPlayer
                  content={
                      loadPlayer ? <Spinner height="100%" /> : <ChatContent socket={socket} />
                  }
                  onClose={() => setPlayerOpen(false)}
              />
          )}
      </PageContainer>
  );
};

export default PaidImovelPage;
