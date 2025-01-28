import { useDispatch, useSelector } from 'react-redux';
import {
  ListItemText,
  ListItemButton,
  List,
  Divider,
  ListItemIcon,
  Typography,
} from '@mui/material';
import { setVisibilityFilter } from '../../../store/apps/contacts/ContactSlice';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import { IconMail, IconSend } from '@tabler/icons';
import { useContext } from 'react';
import ContactsContext from '../../../views/apps/contacts/ContactsContext/ContactsContext';

const ContactFilter = () => {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.contactsReducer.currentFilter);
  const customizer = useSelector((state) => state.customizer);
  const br = `${customizer.borderRadius}px`;
  const {
    list,
    setList,
    acceptedList,
    setActiveList,
    setActive
  } = useContext(ContactsContext);

  const filterData = [
    {
      id: 1,
      name: 'Pendentes',
      sort: 'show_all',
      icon: IconSend,
    },
    {
      id: 2,
      name: 'Aceitos',
      sort: 'frequent_contact',
      icon: IconMail ,
    },
  ];

  return (
    <>
      <List>
        <Scrollbar
          sx={{
            height: { lg: 'calc(100vh - 300px)', md: '100vh' },
            maxHeight: '800px',
            mt: 1,
          }}
        >
          {filterData.map((filter) => {
            if (filter.filterbyTitle) {
              return (
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  pl={5.1}
                  mt={1}
                  pb={2}
                  key={filter.id}
                >
                  {filter.filterbyTitle}
                </Typography>
              );
            } else if (filter.devider) {
              return <Divider key={filter.id} sx={{ mb: 3 }} />;
            }

            return (
              <ListItemButton
                sx={{ mb: 1, mx: 3, borderRadius: br }}
                selected={active === `${filter.sort}`}
                onClick={() => {
                  // Atualiza o filtro ativo no Redux
                  dispatch(setVisibilityFilter(`${filter.sort}`));

                  // Atualiza a lista ativa com base no filtro selecionado
                  if (filter.sort === 'show_all') {
                    setActiveList(list); // Lista normal
                    setActive(null);
                  } else if (filter.sort === 'frequent_contact') {
                    setActiveList(acceptedList); // Lista de aceitos
                    setActive(null);
                  }
                }}
                key={filter.id}
              >
                <ListItemIcon sx={{ minWidth: '30px', color: filter.color }}>
                  <filter.icon stroke="1.5" size={19} />
                </ListItemIcon>
                <ListItemText>{filter.name}</ListItemText>
              </ListItemButton>
            );
          })}
        </Scrollbar>
      </List>
    </>
  );
};

export default ContactFilter;
