import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = newContact => {
    const isContactExists = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase(),
    );
    if (isContactExists) {
      alert(`${newContact.name} is already in contacts`);
      return false;
    }
    const newContacts = [...contacts, { ...newContact, id: newContact.name }];

    setContacts(newContacts);

    return true;
  };

  const handleFilterChange = value => {
    setFilter(value);
  };

  const onDeleteContact = contactId => {
    const newContacts = contacts.filter(contact => contact.id !== contactId);
    setContacts(newContacts);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div className="container">
      <h1 className="heading">Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <h2 className="contacts_title">Contacts</h2>
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      {filteredContacts.length > 0 ? (
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={onDeleteContact}
        />
      ) : (
        <p className="contacts_not">No contacts found</p>
      )}
    </div>
  );
};

export default App;