/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar, ListItemText, ListItemAvatar, Box, Badge, ListItemButton, Typography } from '@mui/material';
import { useContext } from 'react';
import ChatContext from '../ChatContext/ChatContext';

const ChatConversationButtomItem = ({ chat }) => {
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString); // Parse para obter o objeto
  const { activeChat, setActiveChat, setSelectedUser,setMessages } = useContext(ChatContext);

  const user = chat.user1.email === currentUserls.email ? chat.user2 : chat.user1;
  // Verifica se o chat atual está ativo
  const isSelected = activeChat === chat.id;

  return (
    <ListItemButton
      onClick={() => {    
        setMessages([]);
        setActiveChat(chat.id);
        setSelectedUser(user);
      }} // Define o chat como ativo ao clicar
      sx={{
        py: 1,
        px: 3,
        alignItems: 'center',
        backgroundColor: isSelected ? 'rgba(0, 123, 255, 0.1)' : 'transparent', // Altera a cor de fundo do chat ativo
        '&:hover': {
          backgroundColor: 'rgba(0, 123, 255, 0.2)', // Cor ao passar o mouse
        },
      }}
      selected={isSelected} // Define o estado visual do item
    >
      <ListItemAvatar sx={{ mr: 0.5 }}>
        <Badge
          color={'success'}
          variant="dot"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          overlap="circular"
        >
          <Avatar
            alt={user.type !== 'realstate' ? user.name : user.company_name}
            src={user.profile && user.profile.url !== '' && user.profile.url !== null ? user.profile.url : ''}
            sx={{ width: 45, height: 45 }}
          />
        </Badge>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
            {user.name}
          </Typography>
        }
        secondary={`Envie uma mensagem para ${user.name}`}
        secondaryTypographyProps={{
          noWrap: true,
        }}
        sx={{ my: 0 }}
      />
    </ListItemButton>
  );
};

export default ChatConversationButtomItem;
