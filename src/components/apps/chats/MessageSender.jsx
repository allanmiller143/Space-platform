/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { Button, Input, Space, Typography } from 'antd';
import SendIcon from '@mui/icons-material/Send';
import styled from 'styled-components';
import PlaygroundSpeedDial from './ChatFIleOptions';
import AudioRecorder from './AudioMessage/AudioRecorder';
import ChatContext from './ChatContext/ChatContext';
import { Box } from '@mui/material';


const { TextArea } = Input;

const StyledTextArea = styled(TextArea)`
  &:hover {
    border-color: initial;
    box-shadow: none;
  }

  &:focus {
    border-color: initial;
    box-shadow: none;
  }
`;

const MessageSender = ({ socket }) => {
  const [message, setMessage] = useState('');
  const chatId = localStorage.getItem('chatId');
  const cuString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(cuString);
  const [recording, setRecording] = useState(false);
  const { userChats, setUserChats, filteredChats, setFilteredChats,activeChat, setActiveChat, messages, setMessages,selectedUser, setSelectedUser  } = useContext(ChatContext);


  const sendMessage = () => {
    if (message.trim() !== '') {
      const data = {
        'email': currentUser.email,
        'chatId': chatId,
        'message': message,
        'receiver' : selectedUser.email
      };
      socket.emit('message', data);
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey && message.trim() !== '') {
      event.preventDefault();
      sendMessage();
      setMessage('');
    }
  };

  const handleSendClick = () => {
    if (message.trim() !== '') {
      sendMessage();
      setMessage('');
    }
  };

  return (
    <Box  sx = {{ px : {lg: "10px", xs: "5px" } ,py : "10px" , display:  'flex', alignItems: 'end', position: 'relative', width: '100%',justifyContent: 'center'}} >
      <PlaygroundSpeedDial socket={socket} />
      <div style={{ flexGrow: 1, display: 'flex', paddingLeft: 50,paddingBottom: 8, alignItems: 'end', paddingRight: 10 }}>
        <StyledTextArea
          placeholder="Digite uma mensagem"
          value={message}
          onChange={handleMessageChange}
          onPressEnter={handleKeyDown}
          autoSize={{ minRows: 1, maxRows: 2 }}
          style={{ flex: 1, paddingLeft: 10, marginTop: 5, resize: 'none' }}
        />
        {
          !recording &&
          <Button type="primary" onClick={handleSendClick} style={{ height: '35px',width: '35px', backgroundColor: 'transparent',  display: 'flex', alignItems: 'center',boxShadow: 'none',marginLeft: 15,marginRight: 5 }}><SendIcon color='primary'/></Button>  
        }
        <AudioRecorder socket={socket} recording={recording} setRecording={setRecording}/>
        
      </div>        

    </Box>
  );
};

export default MessageSender;
