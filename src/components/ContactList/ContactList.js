import React from "react";
import PropTypes from 'prop-types';
import ContactListItem from '../ContactListItem';
import css from './contactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => {

  const handleDeleteContact = (contactId) => {
    onDeleteContact(contactId);
  };

  return (
    <ul className={css.contactsList}>
      {contacts.map(contact => (
        <ContactListItem
          key={contact.id}
          contact={contact}
          onDeleteContact={handleDeleteContact}
        />
      ))}
    </ul>
  );
}

ContactList.propTypes = {
 contacts: PropTypes.arrayOf(
   PropTypes.shape({
     id: PropTypes.string.isRequired,
     name: PropTypes.string.isRequired,
     number: PropTypes.string.isRequired,
   })).isRequired,
 onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;