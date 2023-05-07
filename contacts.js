const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");
const { nanoid } = require("nanoid");

const contactPath = path.resolve("./db/contacts.json");

async function getContacts() {
  const data = await fs.readFile(contactPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactPath, "utf-8");
  const contacts = JSON.parse(data);
  const contact = contacts.filter(
    (contact) => contact.id === contactId.toString()
  );
  return contact;
}
let contact = "";

async function removeContact(contactId) {
  const contacts = await getContacts().then((contacts) =>
    contacts.filter((contact) => contact.id !== contactId)
  );
  await fs.writeFile(contactPath, JSON.stringify(contacts));
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await getContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return newContact;
};


module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
};
