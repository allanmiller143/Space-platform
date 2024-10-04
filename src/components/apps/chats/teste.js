/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Loading from "../../Loading/Loading";
import { toast } from "sonner";
import { openNewChat } from "./ChatService/Api";
import { getData } from "../../../Services/Api";


const Teste = ({socket}) => {
    const cuString = localStorage.getItem('currentUser');
    const currentUserls = JSON.parse(cuString); // Parse para obter o objeto
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);

    const seePhone = async () => {
        console.log(socket);
        if (currentUserls) {
          setLoading(true);
          try {
            await openNewChat(socket, 'miller@gmail.com');
          } catch (err) {
            console.log('Error loading messages:', err);
          }
      
          try {
            const response = await getData('chat', token);
            if (response.status === 200 || response.status === 201) {
                console.log(response.userInfo);
            }else{
                console.log(response);
            }
             
          } catch (e) {
            console.log(e);
          }finally{
            setLoading(false);
          }    
        } else {
          toast.success('Faça um cadastro para enviar uma mensagem');
        }
    };
  return (
    <Box>
        {loading && <Loading data = {{open:loading}}/>}

        <Button onClick={seePhone}>
            abrirchat 
        </Button>
    </Box>
  );
};

export default Teste;
