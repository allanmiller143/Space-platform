/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react';
import { Stack, Avatar, Box, Typography, Tooltip, Fab, Divider } from '@mui/material';
import { IconCircle, IconThumbUp } from '@tabler/icons';
import { ptBR } from 'date-fns/locale';
import { formatDistanceToNowStrict } from 'date-fns';

// eslint-disable-next-line react/prop-types
const PostComments = ({ comment, isLast }) => {
  const commentRef = useRef(null);
  return (
    <Box py={2} px = {2}>
      <Box  sx={{ position: 'relative' }}>
        <Stack direction="row" gap={2} alignItems="flex-start">
          <Avatar
            alt="User profile"
            src={comment.photo !== null ? comment.photo : ''}
            sx={{ width: { xs : '35px',sm : '40px' }, height: { xs : '35px',sm : '40px' }, zIndex: 1 }}
          />
          <Box sx={{ flexGrow: 1, position: 'relative' }} ref={commentRef}>
            <Box sx={{ zIndex: 1 }}>
              <Box display="flex" alignItems="center" gap={1}> 
                <Typography variant="h6">{comment.name}</Typography>
                <Typography variant="caption" color="textSecondary">
                  <IconCircle size="7" fill="" fillOpacity={'0.1'} strokeOpacity="0.1" />{' '}
                  {formatDistanceToNowStrict(new Date(comment.createdAt), {
                    addSuffix: false,
                    locale: ptBR,
                  })}
                </Typography>

              </Box>

              <Box py={1} pb = {2}>
                <Typography color="textSecondary">{comment.text}</Typography>
              </Box>
              {/* <Stack direction="row" gap={1} alignItems="center">
                <Tooltip title="Curtir" placement="top">
                  <Fab size="small" color="primary" onClick={() => toast.warning('Ainda em desenvolvimento!')}>
                    <IconThumbUp size="16" />
                  </Fab>
                </Tooltip>
                <Typography variant="body1" fontWeight={600}>
                  0
                </Typography>
              </Stack> */}
            </Box>
          </Box>
        </Stack>
      </Box>
      {!isLast && <Divider  pt = {1}/>} {/* Renderiza o Divider apenas se não for o último */}
    </Box>
  );
};

export default PostComments;
