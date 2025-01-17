import React, { useEffect } from 'react';

const PaymentButton = () => {
  useEffect(() => {
    const initializeMercadoPago = async () => {
      if (window.MercadoPago) {
        const mp = new window.MercadoPago('APP_USR-e03e96fc-0a8f-438e-8027-adbea0efc60c', {
          locale: 'pt-BR', // Define o idioma do checkout
        });

        const checkoutButton = document.getElementById('checkout-button');

        checkoutButton.addEventListener('click', async () => {
          try {
            // Faça a chamada ao backend para criar a preferência de pagamento
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

            // Inicia o checkout usando o ID da preferência criada
            mp.checkout({
              preference: {
                id: data.id,
              },
              autoOpen: true, // Abre o checkout automaticamente
            });
          } catch (error) {
            console.error('Erro ao iniciar pagamento:', error);
          }
        });
      } else {
        console.error('MercadoPago SDK não está disponível.');
      }
    };

    initializeMercadoPago();
  }, []);

  return <button id="checkout-button">Pagar</button>;
};

export default PaymentButton;

