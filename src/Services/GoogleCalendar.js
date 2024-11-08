import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import { Button } from '@mui/material';

const clientId = "760335256184-rt5r85qubq5v4aq4cee32g0p3dld8kia.apps.googleusercontent.com"; // Substitua pelo ID do cliente gerado

function GoogleCalendar() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "https://www.googleapis.com/auth/calendar.events",
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        setIsSignedIn(authInstance.isSignedIn.get()); // Atualiza o estado se o usuário já estiver autenticado

        // Escuta mudanças de estado de autenticação
        authInstance.isSignedIn.listen(setIsSignedIn);
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const handleLogin = () => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      console.log("Usuário autenticado");
    }).catch(error => console.error("Erro ao autenticar:", error));
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
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Agendar visita
        </Button>
      ) : (
        <>
          <p>Usuário autenticado</p>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </>
      )}
    </div>
  );
}

export default GoogleCalendar;
