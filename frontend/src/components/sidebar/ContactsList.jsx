// File: src/components/sidebar/ContactsList.jsx
import React from 'react';
import ContactItem from './ContactItem';

const ContactsList = ({ contacts, selectedContact, onSelectContact, darkMode }) => {
  return (
    <div className="overflow-y-auto h-[calc(100%-120px)]">
      {contacts.map(contact => (
        <ContactItem
          key={contact.id}
          contact={contact}
          isSelected={selectedContact?.id === contact.id}
          onClick={() => onSelectContact(contact)}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
};

export default ContactsList;
