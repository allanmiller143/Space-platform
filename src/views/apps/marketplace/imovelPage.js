/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Grid, Box, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Header from '../../../layouts/full/horizontal/header/Header';
import "leaflet/dist/leaflet.css";
import { toast } from 'sonner';
import { getData, postData } from '../../../Services/Api';
import { useParams } from 'react-router';
import Spinner from '../../spinner/Spinner';
import PropertyGallery from './Componentes/Gallery';
import DadosGerais from './Componentes/DadosGerais';
import Map from './Componentes/Map';
import AdvertiserCard from './Componentes/AdvertiserCard';
import { useNavigate } from 'react-router';
import ChatContext from '../../../components/apps/chats/ChatContext/ChatContext';
import { openNewChat } from '../../../components/apps/chats/ChatService/Api';
import GoogleCalendar from '../../../Services/GoogleCalendar/GoogleCalendar';

const ImovelPage = ({socket}) => {
    const [loading, setLoading] = useState(false);
    const [property, setProperty] = useState(null);
    const [advertiser, setAdvertiser] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const cuString = localStorage.getItem('currentUser');
    const currentUserls = JSON.parse(cuString); // Parse para obter o objeto
    const token = localStorage.getItem('token');
    const { activeChat,setFilteredChats, setUserChats,setActiveChat, setChats, selectedUser, setSelectedUser,messages, setMessages } = React.useContext(ChatContext);

    async function loadPropertyData() {
        setLoading(true);
        try {
            const response = await getData(`properties/${id}`);
            if (response.status === 200 || response.status === 201) {
                setProperty(response.userInfo);
                setAdvertiser(response.userInfo.seller);
            } else {
                toast.error(`Erro ao carregar dados da propriedade: ${response.message}`);
            }
        } catch (error) {
            toast.error(`Erro ao carregar dados da propriedade: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }



    const click = async () => {
        const clickResponse = await postData(`properties/times-seen/${id}`,{});
        if (clickResponse.status === 200 || clickResponse.status === 201) {
          toast.success('Propriedade visualizada com sucesso!');
        } else {
          toast.error(`Erro ao visualizar propriedade: ${clickResponse.message}`);
          console.log(clickResponse);
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
                console.log('sem chats');
              }
            } else {
              console.log(response);
            }
          } catch (e) {
            console.log(e);
          }finally{
            setLoading(false);
          }    
        } else {
          navigate('/google-form');
          toast.success('Faça um cadastro para enviar uma mensagem');
        }
      };
    


    useEffect(() => {
        loadPropertyData();
        click();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <PageContainer title="Imóveis para venda ou locação" description="Space iMóveis">
            <Header />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Grid container sx={{ height: 'calc(100vh)', overflow: 'hidden' }}>
                    <Grid
                        item
                        xs={12}
                        md={8}
                        sx={{
                            borderRight: '1px solid #d4d4d4',
                            padding: {md : '50px !important', xs: '10px !important'},
                            overflowY: 'scroll',
                            height: '100%',
                            boxShadow: '1px 0px 4px #2121211f',
                            zIndex: 9,
                            width: '100%',
                        }}
                    >
                        
                        <PropertyGallery property={property} />
                        <Box sx = {{display: {sm : 'block', md: 'none'}}} >
                            <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
                                {/* <GoogleCalendar advertiser={advertiser} property={property}/> */}
                                <Button variant="outlined" color="primary">
                                    Fazer proposta
                                </Button>
                                <Button variant="outlined" color="primary" onClick={seePhone}>
                                  Entre em contato
                              </Button>   
                            </Box>
                        </Box>
                        <DadosGerais property={property} />
                    </Grid>
                    <Grid
                      item
                      md={4}
                      xs={12}
                      sx={{
                          padding: 5,
                          backgroundColor: '#fafafa',
                          overflowY: 'auto', // Permite o scroll vertical
                          height: 'calc(100vh - 100px)', // Altura ajustável para manter o scroll funcional
                      }}
                  >
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, my: 4 }}>
                          {/* <GoogleCalendar advertiser={advertiser} property={property}/>  */}
                          <Box sx={{ display: 'flex', gap: 1 }}>
                              <Button variant="outlined" color="primary">
                                  Fazer proposta
                              </Button>
                              <Button variant="outlined" color="primary" onClick={seePhone}>
                                  Entre em contato
                              </Button>
                          </Box>
                      </Box>
                      <Box sx={{ display: { sm: 'none', md: 'block' } }}>
                          <Map property={property} />
                          <AdvertiserCard property={property} advertiser={advertiser} />
                      </Box>
                  </Grid>

                </Grid>
            </Box>
        </PageContainer>
    );
};

export default ImovelPage;
