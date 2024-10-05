/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box } from '@mui/system';
import React, { useContext,} from 'react';

const TextMessage = ({ message }) => {
    return (
        <Box mb={1}sx={{ p: 1, backgroundColor: 'primary.light', ml: 'auto', maxWidth: '320px',}}>
            {message.text}
        </Box>
    );
  };
export default TextMessage;
