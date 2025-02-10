import React, { useState } from "react";
import { Button, Typography, Box, Divider, CardContent } from "@mui/material";
import BlankCard from "../../../../shared/BlankCard";
import { Stack } from "@mui/system";

const Settings = () => {


  return (
    <Box sx={{ p: 2 }}>
      <BlankCard>
      <CardContent>
              <Typography variant="h4" mb={2} color={'#FA896B'}> Zona de perigo </Typography>
              <Divider/>
              <Typography variant= 'body1' mt = {1}> 
                Para cancelar o destaque clique no botão abaixo.<br/> <span style={{color: '#FA896B'}}> Lembre-se: </span> ao cancelar o destaque você não terá mais acesso a essa aba, sendo necessário solicitar um novo destaque para ver as informações.         
              </Typography>
              <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }} mt={3}>
                <Button size="large" variant="text" color="error" >
                  Cancelar destaque
                </Button>
              </Stack>
            </CardContent>

      </BlankCard>
    </Box>
  );
};

export default Settings;
