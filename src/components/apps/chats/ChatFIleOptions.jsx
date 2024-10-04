/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ImageIcon from '@mui/icons-material/Image';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ChatContext from './ChatContext/ChatContext';

const StyledSpeedDial = styled(SpeedDial)(() => ({
  position: 'absolute',
  bottom: 16, // ajusta a posição vertical
  left: 8, // ajusta a posição horizontal
  zIndex: 1000, // garante que fique sobreposto a outros elementos
}));

const actions = [
  { icon: <ImageIcon />, name: 'Imagem' },  // Ícone de imagem
  { icon: <InsertDriveFileIcon />, name: 'Arquivo' },  // Ícone de arquivo
];

export default function PlaygroundSpeedDial({ socket }) {
  const fileInputRefMultiple = React.useRef(null); // Ref para o input de seleção de múltiplas imagens
  const fileInputRefDocument = React.useRef(null); // Ref para o input de seleção de documentos
  const { setImgList, setMessages } = React.useContext(ChatContext);
  const cuString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(cuString);
  const chatId = localStorage.getItem('chatId');

  const handleMultipleFileInputChange = (event) => {
    const files = event.target.files;
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
  
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];  
        const data = {
          'email': currentUser.email,
          'chatId': chatId,
          'file': base64String,
          'text': 'teste',
          'type': 'image',
          'fileName': file.name,
          'contentType': file.type
        };
  
        setMessages(prevMessages => [
          ...prevMessages,
          { ...data, isLoading: true, id: 1, sender: currentUser.email, createdAt: '2024-07-20T00:00:00.394Z' },
        ]);
  
        socket.emit('upload', data, (error) => {
          console.log(error);
        });
      };
  
      reader.readAsDataURL(file); // Converte o arquivo em Base64
    }
  };
  

  const handleDocumentInputChange = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const data = {
        'email': currentUser.email,
        'chatId': chatId,
        'file': files[i],
        'text': 'teste',
        'type': 'file',
        'fileName': files[i].name,
        'contentType': files[i].type
      };
  
      setMessages(prevMessages => [
        ...prevMessages,
        { ...data, isLoading: true, id: 1, sender: currentUser.email, createdAt: Date.now() },
      ]);
      socket.emit('upload', data);
    }
  
  };

  const handleImageClick = () => {
    fileInputRefMultiple.current.click();
  };

  const handleDocumentClick = () => {
    fileInputRefDocument.current.click();
  };

  return (
    <div>
      <StyledSpeedDial
        ariaLabel="SpeedDial playground example"
        icon={<SpeedDialIcon />}
        color='secondary'
        sx={{
          '& .MuiSpeedDial-fab': {
            width: '35px',
            height: '35px',
          },
        }}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipPlacement="right"
            tooltipOpen
            onClick={action.name === 'Imagem' ? handleImageClick : handleDocumentClick}
          />
        ))}
      </StyledSpeedDial>

      <input
        type="file"
        accept="image/jpeg,image/png"
        multiple
        onChange={handleMultipleFileInputChange}
        style={{ display: 'none' }}
        ref={fileInputRefMultiple}
      />
      <input
        type="file"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
        onChange={handleDocumentInputChange}
        style={{ display: 'none' }}
        ref={fileInputRefDocument}
      />
    </div>
  );
}
