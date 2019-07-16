import { prisma, type Contact } from './prisma';
import { makeContact, makeMessage } from './generators';

const contactsNumber = 5;
const messagesNumber = 5;
const maxConversations = 3;
(async () => {
  const contacts = await Promise.all((new Array(contactsNumber))
    .fill(0)
    .map(() => prisma.createContact(makeContact())));

  await contacts.forEach(async (
    contact: Contact,
    index: number,
  ) => {
    if (index === 0) {
      return [];
    }

    const messages = await Promise.all(
      (new Array(contactsNumber))
        .fill(0)
        .map(async (_: any, contactIndex: number) => (new Array(
          Math.min(parseInt(Math.random() * (maxConversations - 1) + 1, 10), index),
        ))
          .fill(0)
          .map(async () => Promise.all(
            (new Array(messagesNumber))
              .fill(0)
              .map(async () => prisma.createMessage({
                ...makeMessage(),
                from: {
                  connect: {
                    id: contacts[contactIndex].id,
                  },
                },
                to: {
                  connect: {
                    id: contacts[parseInt(Math.random() * (contactIndex - 1), 10)].id,
                  },
                },
              })),
          )))
        .reduce((prev, it) => [...prev, it], []),
    );

    return messages;
  });
})();


// contactA: {
//   connect: contact,
//           },
// contactB: {
//   connect: contacts[parseInt(Math.random() * index, 10)],
//           },
