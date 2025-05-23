/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useContext } from 'react';
import './AudioRecorder.css';
import ChatContext from '../ChatContext/ChatContext';
import { Button, Input, Space } from 'antd';
import SendIcon from '@mui/icons-material/Send';
import { MicRounded, StopRounded } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

const AudioRecorder = ({ socket, recording, setRecording }) => {
  const mediaRecorderRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);
  const { setMessages } = useContext(ChatContext);
  const cuString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(cuString);
  const chatId = localStorage.getItem('chatId');

  useEffect(() => {
    // Clean up the media stream and recorder
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mediaStream]);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        setMediaStream(stream);
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        let audioChunks = [];
        mediaRecorder.ondataavailable = event => {
          audioChunks.push(event.data);
        };
        mediaRecorder.onstop = () => {
          if (audioChunks.length > 0) {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

            // Convert Blob to base64
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64String = reader.result.split(',')[1]; // Remove the "data:audio/wav;base64," part

              const data = {
                email: currentUser.email,
                chatId: chatId,
                type: 'audio',
                fileName: 'audio.wav',
                file: base64String, // Base64 string
              };

              setMessages(prevMessages => [
                ...prevMessages,
                { ...data, isLoading: true, id: 1, senderEmail: currentUser.email, createdAt: '2024-07-20T00:00:00.394Z' },
              ]);
              console.log(data);

              // Send the base64 string via WebSocket
              socket.emit('upload', data, (error) => {
                if (error) console.error('Error uploading audio:', error);
              });
            };

            reader.readAsDataURL(audioBlob); // Read the Blob as a data URL (base64)
          }
        };

        mediaRecorder.start();
        setRecording(true);
      })
      .catch(err => console.error('Error accessing audio stream:', err));
  };

  const stopRecording = (cancel = false) => {
    if (mediaRecorderRef.current) {
      if (cancel) {
        mediaRecorderRef.current.ondataavailable = null;
        mediaRecorderRef.current.onstop = null;
      }
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleStartStopClick = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleCancelClick = () => {
    stopRecording(true);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {recording && <Typography pl={2}>Gravando...</Typography>}
      {recording && (
        <Button
          type="primary"
          onClick={handleCancelClick}
          style={{
            height: '35px',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            boxShadow: 'none',
          }}
        >
          <StopRounded sx={{ color: 'red', fontSize: '35px' }} />
        </Button>
      )}
      <Button
        type="primary"
        onClick={handleStartStopClick}
        style={{
          height: '35px',
          width: '25px',
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          boxShadow: 'none',
        }}
      >
        {recording ? <SendIcon color="primary" /> : <MicRounded color="primary" />}
      </Button>
    </Box>
  );
};

export default AudioRecorder;
