import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(savedContacts);
    localStorage.setItem('contacts', JSON.stringify(savedContacts));
  }, []);

  const handleAddContact = newContact => {
    const isContactExists = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase(),
    );
    if (isContactExists) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    const newContacts = [...contacts, { ...newContact, id: newContact.name }];
    setContacts(newContacts);
    localStorage.setItem('contacts', JSON.stringify(newContacts));
  };

  const handleFilterChange = value => {
    setFilter(value);
  };

  const onDeleteContact = contactId => {
    const newContacts = contacts.filter(contact => contact.id !== contactId);
    setContacts(newContacts);
    localStorage.setItem('contacts', JSON.stringify(newContacts));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const isContactExists = name =>
    contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );

  return (
    <div className="container">
      <h1 className="heading">Phonebook</h1>
      <ContactForm
        onAddContact={handleAddContact}
        isContactExists={isContactExists}
      />
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