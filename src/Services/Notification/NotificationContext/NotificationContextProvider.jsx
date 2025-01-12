import propTypes from 'prop-types';
import NotificationContext from './NotificationContext';
import { io } from 'socket.io-client';
import { useState } from 'react';

function NotificationContextProvider({children}){
  const notificationSocket = io('https://spaceimoveis-api-83y4.onrender.com/');
  const socket = io('https://spaceimoveis-api-83y4.onrender.com/');
  const [notifications, setNotifications] = useState([]);
  const [called,setCalled] = useState(false)

  const value = {
    notificationSocket,
    notifications,
    setNotifications,
    called,
    setCalled,
    socket
  };

  return (
    <NotificationContext.Provider value = {value}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContextProvider;

NotificationContextProvider.propTypes = {
  children: propTypes.any,
}.isRequired;
