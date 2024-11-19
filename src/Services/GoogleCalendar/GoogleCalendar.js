/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import { Button } from '@mui/material';
import Agendar from './Agendar';
import Agendamentos from './Agendamentos';
import { Box } from '@mui/system';
import { toast } from 'sonner';

const clientId = "760335256184-rt5r85qubq5v4aq4cee32g0p3dld8kia.apps.googleusercontent.com";

function GoogleCalendar({advertiser,property}) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [openListing, setOpenListing] = useState(false);
  const [events, setEvents] = useState([]);
  const cuString = localStorage.getItem('currentUser'); 
  const currentUserls = JSON.parse(cuString); 


  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "https://www.googleapis.com/auth/calendar.events",
      }).then(() => {
        return gapi.client.load('calendar', 'v3');
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        setIsSignedIn(authInstance.isSignedIn.get());
        authInstance.isSignedIn.listen(setIsSignedIn);
      }).catch(error => console.error("Erro ao inicializar o gapi.client:", error));
    };
    gapi.load("client:auth2", start);
  }, []);

  const handleLogin = () => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      const profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
      const email = profile.getEmail();
      if(email !== currentUserls.email){
        toast.error('Para marcar um agendamento, voce precisa usar o mesmo email logado: ' + currentUserls.email);
        handleLogout();
      }else{
        setIsSignedIn(true);
      }
    }).catch(error => console.error("Erro ao autenticar:", error));
  };
  

  const VerififyLogin = () => {
    if(!currentUserls){
      toast.error('Para agendar uma visita, voce precisa estar logado.');
    }else{
      handleLogin();
    }
  };

  const handleLogout = () => {
    gapi.auth2.getAuthInstance().signOut().then(() => {
      console.log("Usuário desconectado");
      setIsSignedIn(false);
    });
  };


  return (
    <div>
      {!isSignedIn ? (
        <Button variant="contained" color="primary" onClick={VerififyLogin}>
          Agendar visita
        </Button>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center',gap:2 }}>
          <Agendar open = {open} setOpen = {setOpen} setEvents = {setEvents} advertiser = {advertiser} property = {property}/>
          <Agendamentos setIsSignedIn = {setIsSignedIn} setOpenListing={setOpenListing} openListing={openListing} events={events} setEvents={setEvents} />
          {/* <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button> */}
        </Box>
      )}
    </div>
  );
}

export default GoogleCalendar;
