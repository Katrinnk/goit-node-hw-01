const fs = require("node:fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(
  __dirname,
  "db",
  "contacts.json"
);

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(id) {
  const contacts = await listContacts();
  return (
    contacts.find((contact) => contact.id === id) || null
  );
}

async function removeContact(id) {
  const contacts = await listContacts();

  const index = contacts.findIndex(
    (contact) => contact.id === id
  );

  if (index !== -1) {
    const removedContact = contacts.splice(index, 1);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2)
    );
    return removedContact;
  } else return null;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };

  contacts.push(newContact);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2)
  );

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
