import img1 from 'src/assets/images/profile/user-1.jpg';
import img2 from 'src/assets/images/profile/user-2.jpg';
import img3 from 'src/assets/images/profile/user-3.jpg';
import img4 from 'src/assets/images/profile/user-4.jpg';

import icon1 from 'src/assets/images/svgs/icon-account.svg';
import icon3 from 'src/assets/images/svgs/icon-tasks.svg';

import ddIcon1 from 'src/assets/images/svgs/icon-dd-chat.svg';
import ddIcon3 from 'src/assets/images/svgs/icon-dd-invoice.svg';
import ddIcon4 from 'src/assets/images/svgs/icon-dd-date.svg';
import ddIcon5 from 'src/assets/images/svgs/icon-dd-mobile.svg';
import ddIcon6 from 'src/assets/images/svgs/icon-dd-lifebuoy.svg';

//
// Notifications dropdown
//

const currentUser = JSON.parse(localStorage.getItem('currentUser'));

const notifications = [
  {
    avatar: img1,
    title: 'Roman Joined the Team!',
    subtitle: 'Congratulate him',
  },
  {
    avatar: img2,
    title: 'New message received',
    subtitle: 'Salma sent you new message',
  },
  {
    avatar: img3,
    title: 'New Payment received',
    subtitle: 'Check your earnings',
  },
  {
    avatar: img4,
    title: 'Jolly completed tasks',
    subtitle: 'Assign her new tasks',
  },
  {
    avatar: img1,
    title: 'Roman Joined the Team!',
    subtitle: 'Congratulate him',
  },
  {
    avatar: img2,
    title: 'New message received',
    subtitle: 'Salma sent you new message',
  },
  {
    avatar: img3,
    title: 'New Payment received',
    subtitle: 'Check your earnings',
  },
  {
    avatar: img4,
    title: 'Jolly completed tasks',
    subtitle: 'Assign her new tasks',
  },
];

//
// Profile dropdown
//
const profileNoCompleted = [
  {
    href: '/apps/chats',
    title: 'Mensagens',
    subtitle: 'Chat com corretores e clientes',
    icon: ddIcon1,
  },
  {
    href: '/apps/calendar',
    title: 'Calendário',
    subtitle: 'Agendamentos e visitas',
    icon: ddIcon4,
  },
  {
    href: '/apps/meus-anuncios',
    title: 'Anuncios',
    subtitle: 'Agendamentos e visitas',
    icon: ddIcon4,
  },

];

const profile = [
  {
    href: '/user-profile',
    title: 'Meu Perfil',
    subtitle: 'Configurações da Conta',
    icon: icon1,
  },
];

// apps dropdown

const appsLink = [

  ...(currentUser?.type === 'realtor' || currentUser?.type === 'realstate'
    ? [
        {
          href: '/apps/dash',
          title: 'Dashboard',
          subtext: 'Veja dados dos seus imóveis',
          avatar: icon3,
        },
      ]
    : []),
  {
    href: '/apps/imoveis/list',
    title: 'Gestão de Imóveis',
    subtext: 'Gestão de imóveis',
    avatar: ddIcon3,
  },

  {
    href: '/apps/chats',
    title: 'Mensagens',
    subtext: 'Chat com corretores e clientes',
    avatar: ddIcon1,
  },

  {
    href: '/apps/calendar',
    title: 'Calendário',
    subtext: 'Agendamentos e visitas',
    avatar: ddIcon4,
  },
  // Adiciona o item de "Contacts" apenas se a condição for verdadeira
  ...(currentUser?.type === 'realtor' || currentUser?.type === 'realstate'
    ? [
        {
          href: '/apps/contacts',
          title: 'Compartilhamento',
          subtext: 'Veja pedidos de compartilhamento pendentes',
          avatar: ddIcon5,
        },
      ]
    : []),
];

const pageLinks = [
  {
    href: '/pricing',
    title: 'Planos e Preços',
  },
  {
    href: '/auth/login',
    title: 'Login',
  },
  {
    href: '/auth/register',
    title: 'Cadastre-se',
  },
  {
    href: '/404',
    title: '404 Error Page',
  },
  {
    href: '/user-profile',
    title: 'Perfil',
  },
  {
    href: '/apps/blog/posts',
    title: 'Blog',
  },
  {
    href: '/apps/ecommerce/eco-checkout',
    title: 'Shopping Cart',
  },
];

export { notifications, profile, pageLinks, appsLink, profileNoCompleted };
