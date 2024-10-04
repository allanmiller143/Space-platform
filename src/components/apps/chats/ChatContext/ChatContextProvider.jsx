import React, { useState } from 'react';
import propTypes from 'prop-types';
import ChatContext from './ChatContext';

function ChatContextProvider({children}){
  const [userChats, setUserChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  const [messages, setMessages] = React.useState([]);
  const [currentChat, setCurrentChat] = React.useState({});
  const [chats, setChats] = React.useState('oi');
  const [chatsFilterActivated, setChatsFilterActivated] = React.useState(false);
  const [filterchats, setFilterChats] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [imgList, setImgList] = React.useState([]);
  const value = {
    userChats, setUserChats,
    filteredChats, setFilteredChats,
    activeChat, setActiveChat,
    messages, setMessages,
    currentChat, setCurrentChat,
    chats, setChats,
    chatsFilterActivated, setChatsFilterActivated,
    filterchats, setFilterChats,
    selectedUser, setSelectedUser,
    imgList, setImgList
  };

  return (
    <ChatContext.Provider value = {value}>
      {children}
    </ChatContext.Provider>
  );
}

export default ChatContextProvider;

ChatContextProvider.propTypes = {
  children: propTypes.any,
}.isRequired;
