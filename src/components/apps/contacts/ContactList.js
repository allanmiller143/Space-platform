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

  const {list, active, activeList, setActive, accepted, afterLoad, setAfterLoad} = useContext(ContactsContext);


  const click = (contact) => {
    setActive(contact);
    console.log(contact);
  }

  return (
    <List>
      <Scrollbar sx={{ height: { lg: 'calc(100vh - 300px)', md: '100vh' }, maxHeight: '800px' }}>
        {activeList.map((contact) => (
          <Box key={contact.shared.id}  onClick ={() => click(contact)}>
          <ContactListItem
            imovel= {contact}
            selected={contact.shared.id === active?.shared.id}
          />
          </Box>
        ))}
      </Scrollbar>
    </List>
  );
};

export default ContactList;
