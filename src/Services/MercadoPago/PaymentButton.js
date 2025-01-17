import React, { useEffect } from 'react';

const PaymentButton = () => {
  useEffect(() => {
    const initializeMercadoPago = async () => {
      if (window.MercadoPago) {
        console.log('MercadoPago SDK carregado com sucesso.');
        const mp = new window.MercadoPago('APP_USR-e03e96fc-0a8f-438e-8027-adbea0efc60c', {
          locale: 'pt-BR', // Define o idioma do checkout
        });

        const checkoutButton = document.getElementById('checkout-button');

        // Verifique se o botão está disponível
        if (checkoutButton) {
          checkoutButton.addEventListener('click', async () => {
            console.log('Botão de pagamento clicado');
            try {
              const response = await fetch('https://advanced-mosquito-usually.ngrok-free.app/criar-preferencia', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  items: [
                    {
                      title: 'Produto Teste',
                      unit_price: 1,
                      quantity: 1,
                    },
                  ],
                }),
              });

              const data = await response.json();
              console.log('Dados da preferência:', data);

              mp.checkout({
                preference: {
                  id: data.id,
                },
                autoOpen: true,
              });
            } catch (error) {
              console.error('Erro ao iniciar pagamento:', error);
            }
          });
        } else {
          console.error('Botão de pagamento não encontrado.');
        }
      } else {
        console.error('MercadoPago SDK não está disponível.');
      }
    };

    // Aguarda o carregamento completo da janela
    window.addEventListener('load', initializeMercadoPago);

    // Limpa o evento ao desmontar o componente
    return () => {
      window.removeEventListener('load', initializeMercadoPago);
    };
  }, []);

  return (
    <>
      <button id="checkout-button">Pagar</button>
      {console.log('Botão renderizado')}
    </>
  );
};

export default PaymentButton;
