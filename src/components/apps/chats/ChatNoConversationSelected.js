import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

const NoConversationSelected = () => {
  return (

    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
    >
      <Typography variant="h4">Selecione uma conversa</Typography>

    </Box>
  );
};

export default NoConversationSelected;
