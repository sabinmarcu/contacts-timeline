import {
  name,
  internet,
  phone,
  lorem,
} from 'faker';

export const makeContact = () => ({
  name: `${name.firstName()} ${name.lastName()}`,
  username: internet.userName(),
  phone: phone.phoneNumber(),
});

export const makeMessage = () => ({
  text: lorem.text(),
  date: Date.now(),
});
