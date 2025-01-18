import { Button } from '@mui/material';
import { postData } from '../Api';
import { useState } from 'react';

const PaymentButton = () => {
  const [loading, setLoading] = useState(false);
  const [ticketUrl, setTicketUrl] = useState(false);
  const data = {
    items: [
      {
        title: 'Produto Teste',
        unit_price: 1,
        quantity: 1,
      },
    ],
  };

  const handlePost = async () => {
    setLoading(true);
    try {
      const response = await postData('criar-preferencia', data);
      if (response.status === 200 || response.status === 201) {
        console.log('Operação concluída com sucesso.');
        setTicketUrl(response.data.point_of_interaction.transaction_data.ticketUrl)
      } else {
        console.log('Erro na operação do else, status:', response.status);
      }
    } catch (e) {
      console.log(`Erro ao realizar a operação: ${e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handlePost} disabled={loading}>
      {loading ? 'Gerando PIX...' : 'Pagar'}
    </Button>

    
  );
};

export default PaymentButton;
