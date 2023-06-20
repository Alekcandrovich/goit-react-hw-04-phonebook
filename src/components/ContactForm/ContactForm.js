import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './contactForm.module.css';

const ContactForm = ({ contacts, onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleNumberChange = event => {
    setNumber(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newContact = { id: nanoid(), name, number, };
    const isContactExists = contacts.some(contact =>
      contact.name.toLowerCase() === newContact.name.toLowerCase(),);
    if (isContactExists) {
      alert(`${newContact.name} is already in contacts`);
      return;
    } onAddContact(newContact); reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label} htmlFor="nameInput">
        Name
      </label>
      <input
      className={css.input}
      id="nameInput"
      type="text"
      name="name"
      value={name}
      onChange={handleNameChange}
      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Name may contain only letters, apostrophe, dash and spaces.
             For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      required
      />
      <label className={css.label} htmlFor="numberInput">
        Number
      </label>
      <input
      className={css.input}
      id="numberInput"
      type="tel"
      name="number"
      value={number}
      onChange={handleNumberChange}
      pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
      title="Phone number must be digits and can contain spaces,
             dashes, parentheses and can start with +"
      required
      />
      <button className={css.button} type="submit">
      Add contact
      </button>
    </form>
  );
} 

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })).isRequired,
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;