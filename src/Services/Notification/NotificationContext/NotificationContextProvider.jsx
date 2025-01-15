import propTypes from 'prop-types';
import NotificationContext from './NotificationContext';
import { useState } from 'react';

function NotificationContextProvider({children}){
  //const socket = io('https://spaceimoveis-api-83y4.onrender.com/'); // real

  
  const [notifications, setNotifications] = useState([]);
  const [called,setCalled] = useState(false)

  const value = {
    notifications,
    setNotifications,
    called,
    setCalled,
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
