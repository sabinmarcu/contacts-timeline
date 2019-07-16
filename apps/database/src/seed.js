import { prisma } from './prisma';
import { makeContact } from './generators';

const contactsNumber = 5;
(async () => {
  await Promise.all((new Array(contactsNumber))
    .fill(0)
    .forEach(async () => {
      const contact = makeContact();
      console.log('Making a new contact', contact);
      await prisma.createContact(contact);
      console.log('Contact created');
    }));
})();
