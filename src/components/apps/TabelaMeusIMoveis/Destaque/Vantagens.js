/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Button } from '@mui/material';
import React,{useState} from 'react';
import { CheckCircle } from '@mui/icons-material';
import { toast } from 'sonner';
import { putData, putFormData } from '../../../../Services/Api';
import HighlightLimitAdvice from './HighlightLimitAdvice';
const vantagens = [
  {
    title: "Maior visibilidade",
    description: "Seu imóvel aparecerá em mais abas do site, incluindo a página inicial e seções especiais.",
  },
  {
    title: "Selo de destaque",
    description: "Seu anúncio ganhará um selo de destaque, chamando a atenção de potenciais compradores ou locatários.",
  },
  {
    title: "Notificações e e-mails",
    description: "Enviaremos notificações e e-mails para os usuários do sistema, informando sobre o seu imóvel em destaque.",
  },
  {
    title: "Estatísticas de visualizações",
    description: "Você poderá acompanhar quantas visualizações seu imóvel recebeu, ajudando a medir o interesse dos usuários.",
  },
  {
    title: "Prioridade nas buscas",
    description: "Seu imóvel terá prioridade nos resultados de busca, aparecendo antes dos anúncios comuns.",
  },
];
function Vantagens({ property,  setImovelToSee, setFilteredImoveis, setImoveis }) {

  if (!property) {
    return null;
  }



  const [loading, setLoading] = React.useState(false);
  const currentUserls = JSON.parse(localStorage.getItem('currentUser'));
  const token = localStorage.getItem('token');
  const [openDialog, setOpenDialog] = useState(false);


  const handleHighlight = async () => {
   
    setLoading(true);
    try {
      const response = await putData(`properties/highlight/${property.id}`,{}, token);
      console.log(response);    
      if (response.status === 201 || response.status === 200) {
        toast.success('Anúncio destacado com sucesso!');
        setImovelToSee(prevState => ({
          ...prevState,
          destaque: true
        }));
        setImoveis(prevState => prevState.map(imovel => imovel.id === property.id ? { ...imovel, destaque: true, } : imovel));
        setFilteredImoveis(prevState => prevState.map(imovel => imovel.id === property.id ? { ...imovel, destaque: true } : imovel));
      } else if(response.status === 403) {
        toast.error('Ocorreu um erro ao destacar o anúncio. Tente novamente mais tarde.');
      }else{
        toast.error(response.message);
        setOpenDialog(true);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      
    }
  };

  return (
    <Box  width="100%">
      <Typography variant="body1" gutterBottom>
        Destacar seu anúncio traz várias vantagens para aumentar a visibilidade do seu imóvel. Confira abaixo:
      </Typography>

      <List>
        {vantagens.map((item, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <CheckCircle color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={<strong>{item.title}</strong>} 
              secondary={item.description} 
            />
          </ListItem>
        ))}
      </List>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleHighlight}
      >
        {
          loading ? "Carregando..." : "Destacar"          
        }
      </Button>
      <HighlightLimitAdvice openDialog={openDialog} setOpenDialog={setOpenDialog}/>

    </Box>
  );
}

export default Vantagens;
