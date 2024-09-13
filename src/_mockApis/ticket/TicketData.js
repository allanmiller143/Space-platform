import mock from '../mock';
import user1 from 'src/assets/images/profile/user-1.jpg';
import user2 from 'src/assets/images/profile/user-2.jpg';
import user3 from 'src/assets/images/profile/user-3.jpg';
import user4 from 'src/assets/images/profile/user-4.jpg';
import user5 from 'src/assets/images/profile/user-5.jpg';

const TicketData = [
  {
    Id: 1,
    ticketTitle: 'Problema com a documentação do imóvel',
    ticketDescription:
      'O cliente relatou que a documentação do imóvel está incompleta. É necessário verificar os documentos e entrar em contato com o proprietário.',
    Status: 'Fechado',
    Label: 'erro',
    thumb: user1,
    AgentName: 'Carlos',
    Date: '02-12-2021',
    deleted: false,
  },
  {
    Id: 2,
    ticketTitle: 'Solicitação de visita ao imóvel',
    ticketDescription:
      'O cliente deseja agendar uma visita ao imóvel, mas não obteve resposta. Precisamos entrar em contato para confirmar a visita.',
    Status: 'Pendente',
    Label: 'aviso',
    thumb: user2,
    AgentName: 'Fernanda',
    Date: '02-15-2020',
    deleted: false,
  },
  {
    Id: 3,
    ticketTitle: 'Problemas com a manutenção do imóvel',
    ticketDescription:
      'O inquilino relatou problemas com a manutenção do imóvel. É necessário enviar um técnico para resolver a situação.',
    Status: 'Aberto',
    Label: 'sucesso',
    thumb: user3,
    AgentName: 'Roberto',
    Date: '02-15-2020',
    deleted: false,
  },
  {
    Id: 4,
    ticketTitle: 'Dúvidas sobre o contrato de aluguel',
    ticketDescription:
      'O cliente tem dúvidas sobre as cláusulas do contrato de aluguel. Precisamos esclarecer as informações para evitar mal-entendidos.',
    Status: 'Fechado',
    Label: 'erro',
    thumb: user4,
    AgentName: 'Mariana',
    Date: '02-15-2020',
    deleted: false,
  },
  {
    Id: 5,
    ticketTitle: 'Reclamação sobre o valor do aluguel',
    ticketDescription:
      'O inquilino está insatisfeito com o aumento do valor do aluguel. Precisamos revisar a situação e entrar em contato com o cliente.',
    Status: 'Fechado',
    Label: 'erro',
    thumb: user5,
    AgentName: 'Lucas',
    Date: '02-15-2020',
    deleted: false,
  },
  {
    Id: 6,
    ticketTitle: 'Solicitação de informações sobre o imóvel',
    ticketDescription:
      'O cliente solicitou informações adicionais sobre o imóvel, mas não recebeu retorno. Precisamos responder o mais rápido possível.',
    Status: 'Pendente',
    Label: 'aviso',
    thumb: user1,
    AgentName: 'Ana',
    Date: '02-15-2020',
    deleted: false,
  },
  {
    Id: 7,
    ticketTitle: 'Problemas com o sistema de aquecimento',
    ticketDescription:
      'O inquilino relatou que o sistema de aquecimento não está funcionando. É necessário enviar um técnico para resolver o problema.',
    Status: 'Aberto',
    Label: 'sucesso',
    thumb: user2,
    AgentName: 'Thiago',
    Date: '02-15-2020',
    deleted: false,
  },
  {
    Id: 8,
    ticketTitle: 'Dúvidas sobre a taxa de administração',
    ticketDescription:
      'O cliente tem dúvidas sobre a taxa de administração cobrada. Precisamos esclarecer as informações para evitar confusões.',
    Status: 'Fechado',
    Label: 'erro',
    thumb: user3,
    AgentName: 'Juliana',
    Date: '02-1-2021',
    deleted: false,
  },
];

mock.onGet('/api/data/ticket/TicketData').reply(() => {
  return [200, TicketData];
});
export default TicketData;
