/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {Avatar,ListItemText,ListItemAvatar, Box, Badge, ListItemButton,Typography} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { last } from 'lodash';
import { formatDistanceToNowStrict } from 'date-fns';
import { SelectChat } from '../../../../store/apps/chat/ChatSlice';

const ChatConversationButtomItem = ({chat}) => {
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString); // Parse para obter o objeto
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const activeChat = useSelector((state) => state.chatReducer.chatContent);

  const lastActivity = (chat) => last(chat.messages)?.createdAt;

//   const getDetails = (conversation) => {
//     let displayText = '';
//     const lastMessage = conversation.messages[conversation.messages.length - 1];
//     if (lastMessage) {
//       const sender = lastMessage.senderId === conversation.id ? 'Você: ' : '';
//       const message = lastMessage.type === 'image' ? 'Enviou uma foto' : lastMessage.msg;
//       displayText = `${sender}${message}`;
//     }

//     return displayText;
//   };

  const user = chat.user1.email === currentUserls.email ? chat.user2 : chat.user1;


  return (
    <ListItemButton
        // onClick={() => dispatch(SelectChat(chat.id))}
        sx={{py: 1,px: 3,alignItems: 'center',}}
        // selected={activeChat === chat.id}
        >
        <ListItemAvatar sx={{ mr: 0.5 }}>
            <Badge color={ 'success' } variant="dot"  anchorOrigin={{vertical: 'bottom',horizontal: 'right',}} overlap="circular" >
                <Avatar alt={user.type !== 'realstate' ? user.name : user.company_name} src={user.profile && user.profile.url !== '' && user.profile.url !== null ? user.profile.url : ''} sx={{ width: 45, height: 45 }} />
            </Badge>
        </ListItemAvatar>
        <ListItemText
            primary={
            <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
                {user.name}
            </Typography>
            }
            secondary = {`Envie uma mensagem para ${user.name}`}
            secondaryTypographyProps={{
            noWrap: true,
            }}
            sx={{ my: 0 }}
        />
        {/* <Box sx={{ flexShrink: '0' }} mt={0.5}>
            <Typography variant="body2">
            {formatDistanceToNowStrict(new Date(lastActivity(chat)), {
                addSuffix: false,
            })}
            </Typography>
        </Box> */}
        </ListItemButton>
    );
};

export default ChatConversationButtomItem;
