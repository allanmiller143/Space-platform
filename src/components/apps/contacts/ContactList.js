import React, { useContext, useEffect } from 'react';
import { List } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  SelectContact,
} from '../../../store/apps/contacts/ContactSlice';

import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import ContactListItem from './ContactListItem';
import ContactsContext from '../../../views/apps/contacts/ContactsContext/ContactsContext';
import { Box } from '@mui/system';

const ContactList = () => {

  const {list, active,activeList, setActive,accepted} = useContext(ContactsContext);


  return (
    <List>
      <Scrollbar sx={{ height: { lg: 'calc(100vh - 300px)', md: '100vh' }, maxHeight: '800px' }}>
        {activeList.map((contact) => (
          <Box key={contact.id}  onClick ={() => {setActive(contact);}}>
          <ContactListItem
            imovel= {contact}
            selected={contact.id === active?.id}
          />
          </Box>
        ))}
      </Scrollbar>
    </List>
  );
};

export default ContactList;
