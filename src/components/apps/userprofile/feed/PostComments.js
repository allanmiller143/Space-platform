/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react';
import { Stack, Avatar, Box, Typography, Tooltip, Fab } from '@mui/material';
import { IconCircle, IconThumbUp } from '@tabler/icons';
import { ptBR } from 'date-fns/locale';
import { formatDistanceToNowStrict } from 'date-fns';
import { toast } from 'sonner';

// eslint-disable-next-line react/prop-types
const PostComments = ({ comment }) => {
  const [height, setHeight] = useState(0);  // Estado para armazenar a altura do comentário
  const commentRef = useRef(null);  // Referência para o comentário

  useEffect(() => {
    if (commentRef.current) {
      setHeight(commentRef.current.clientHeight);  // Atualiza a altura dinamicamente
    }
  }, [comment]);

  return (
    <Box p={1}>
      <Box p={2} sx={{ position: 'relative' }}>
        {/* SVG ajustado dinamicamente */}
        <svg
          height={height + 60} // Ajusta a altura do SVG com mais 20px de margem
          width="200"  // Largura suficiente para a linha horizontal
          style={{ position: 'absolute', top: '0', left: '15px' }}
        >
          <path
            d={`M 20 40 V ${height } Q 20 ${height + 30} 45 ${height + 30} H 100`} // Aumenta o raio da curva e o comprimento da linha horizontal
            stroke="#e0e0e0"
            strokeWidth="2"
            fill="transparent"
          />
        </svg>

        <Stack direction="row" gap={2} alignItems="flex-start">
          {/* Avatar do usuário */}
          <Avatar
            alt="User profile"
            src={comment.photo !== null ? comment.photo : ''}
            sx={{ width: '40px', height: '40px', zIndex: 1 }} // Aumentando o tamanho para ajuste visual
          />

          {/* Caixa de comentário */}
          <Box sx={{ flexGrow: 1, position: 'relative' }} ref={commentRef}> {/* Adiciona a referência */}
            <Box sx={{ zIndex: 1 }}>
              <Typography variant="h6">{comment.name}</Typography>
              <Typography variant="caption" color="textSecondary">
                <IconCircle size="7" fill="" fillOpacity={'0.1'} strokeOpacity="0.1" />{' '}
                {formatDistanceToNowStrict(new Date(comment.createdAt), {
                  addSuffix: false,
                  locale: ptBR,
                })}
              </Typography>

              <Box py={2}>
                <Typography color="textSecondary">{comment.text}</Typography>
              </Box>

              <Stack direction="row" gap={1} alignItems="center" >
                <Tooltip title="Curtir" placement="top" >
                  <Fab size="small" color="primary" onclick={() => {toast.warning('Ainda em desenvolvimento!');}}>
                    <IconThumbUp size="16" />
                  </Fab>
                </Tooltip>
                <Typography variant="body1" fontWeight={600}>
                  0
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default PostComments;
