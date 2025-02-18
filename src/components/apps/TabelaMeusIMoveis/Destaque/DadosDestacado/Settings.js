import React, { useState } from "react";
import { Button, Typography, Box, Divider, CardContent } from "@mui/material";
import BlankCard from "../../../../shared/BlankCard";
import { Stack } from "@mui/system";
import { toast } from "sonner";
import { putData } from "../../../../../Services/Api";

const Settings = ({property, setImovelToSee, setFilteredImoveis, setImoveis}) => {
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);

  async function cancelarDestaque() {
    setLoading
    try{
      const response = await putData(`properties/publish/${property.fullImovel.id}`,{}, token);
      if(response.status === 201 || response.status === 200){
        toast.success('Destaque cancelado com sucesso!');
        setImovelToSee(prevState => ( {...prevState, destaque: false,} ));
        setImoveis(prevState => prevState.map(imovel => imovel.id === property.id ? { ...imovel, destaque: false, } : imovel));
        setFilteredImoveis(prevState => prevState.map(imovel => imovel.id === property.id ? { ...imovel, destaque: false } : imovel));
      }else{
        toast.error('Ocorreu um erro ao cancelar o destaque. Tente novamente mais tarde.');
      }
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }


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
                <Button size="large" variant="text" color="error" onClick={cancelarDestaque} disabled={loading} >
                  {loading ? 'Cancelando...' : 'Cancelar Destaque'}
                </Button>
              </Stack>
            </CardContent>

      </BlankCard>
    </Box>
  );
};

export default Settings;
