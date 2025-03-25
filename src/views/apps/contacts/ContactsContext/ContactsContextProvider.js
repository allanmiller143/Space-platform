import { useState } from 'react';
import propTypes from 'prop-types';
import ContactsContext from './ContactsContext';

function ContactsContextProvider({children}){
  const [list, setList] = useState([]);
  const [acceptedList, setAcceptedList] = useState([]);
  const [test, setTest] = useState(null);
  const [active, setActive] = useState(null);
  const [accepted, setAccepted] = useState(	);
  const [loading , setLoading] = useState(false);
  const [activeList , setActiveList] = useState([]);
  const [afterLoad, setAfterLoad] = useState(null);

  const value = {
    list, setList,
    active, setActive,
    test, setTest,
    accepted, setAccepted,
    loading, setLoading,
    acceptedList, setAcceptedList,
    activeList, setActiveList,
    afterLoad, setAfterLoad
  };

  return (
    <ContactsContext.Provider value = {value}>
      {children}
    </ContactsContext.Provider>
  );
}

export default ContactsContextProvider;

ContactsContextProvider.propTypes = {
  children: propTypes.any,
}.isRequired;
