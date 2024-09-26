import React from 'react';
import { Box, Stack, Typography, Link, AvatarGroup, Container, Avatar } from '@mui/material';

import user1 from 'src/assets/images/profile/user-1.jpg';
import user2 from 'src/assets/images/profile/user-2.jpg';

const Contact = () => {
  return (
    <Box
      bgcolor="primary.main"
      borderRadius={0}
      textAlign="center"
      py="14px"
      position="relative"
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing="16px"
          justifyContent="center"
          alignItems="center"
        >
          <AvatarGroup>
            <Avatar alt="Remy Sharp" src={user1} sx={{ width: 44, height: 44 }} />
            <Avatar alt="Travis Howard" src={user2} sx={{ width: 44, height: 44 }} />
          </AvatarGroup>
          <Typography variant="body1" color="white" fontSize="16px">
            Converse com um especialista Space agora e aumente seus negócios.
          </Typography>
          <Link
            href="/"
            underline="always"
            sx={{
              textDecorationColor: 'white',
            }}
          >
            <Typography component="span" fontWeight={600} color="white" fontSize="16px">
              Contate-nos agora
            </Typography>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};

export default Contact;
